import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Platform, SafeAreaView } from 'react-native';
import { Animated, TouchableOpacity, Text, BackHandler } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';

import Menu from '../components/Menu';
import Pages from '../components/Pages';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import { saveCoursesCP, saveOfflineData } from '../assets/utils/Storage';
import Tools from '../assets/utils/Tools';
import Available from '../assets/utils/Available';

import * as Indicator from 'react-native-indicators';

var moment = require('moment');

export default class Module extends Component {
    constructor() {
        super()

        this.state = {
            timer: null,
            
            post: false,
            survey: 1,
            api_key: '',
            user_id: 0,
            module: null,

            index: 0,
            cpid: 0,
            checkpoints: [],
            offdata: [],
            pages: [],
            starting: 0,
            isCourse: false,

            loading: true,

            icon: 'loader',

            onStart: true,
        }

        this.bottom = new Animated.Value(0)
        this.scrollviewSizes = []
    }
    
    componentDidMount() {
        let module = this.props.navigation.state.params.module;

        let isCourse = module.type == 'Course' ? true : false;

        this.setState({ module, isCourse }, () => {
            if(isCourse)
                this.getCoursesCP();
        })
        
        this.getOffData();
        this.getUserData();

        let timer = setInterval(this.actions, 2000);
        this.setState({ timer });

        setTimeout(() => this.display(), 2000);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        clearInterval(this.state.timer);
    }

    handleBackPress = () => {
        let { isCourse } = this.state;

        if(isCourse) 
            this.props.navigation.navigate('Home');
        else    
            this.props.navigation.goBack();

        return true;
    } 

    actions = () => {
        this.getPostSurveys();
    }

    display = () => {
        let { module, checkpoints, cpid } = this.state;

        let holder = Tools.htmlFormat(module.html);
        let pages = [];

        for(var a = 0; a < holder.length; a++) {
            pages.push(
                <Pages 
                    key={a} 
                    type={module.type}
                    html={holder[a]} 
                    currentPage={a}
                    scrollTo={(module.type == 'Course') ? checkpoints[cpid].scroll : 0}
                    checkpointPage={(module.type == 'Course') ? checkpoints[cpid].page : 0}
                    onEnd={this.onEnd.bind(this)}
                    onContentSizeChange={this.contentSizeChange.bind(this, a)}
                    onScrollEndDrag={this.handleScroll.bind(this)} />
            )
        }

        this.setState({ pages, loading: false })
    }

    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let userData = JSON.parse(data);

            let api_key = userData.api_key;
            let user_id = userData.id;

            this.setState({ api_key, user_id }, () => {
                this.getPrePostSurvey();

                var desc = (this.state.module.type == 'Course') ? 
                            'Read ' + this.state.module.type + ' ' + this.state.module.id :
                            'Read Tips about ' + this.state.module.title + ' - ' + this.state.module.category;

                this.logActivity(user_id, api_key, desc);
            });

        } catch(error) {
            console.log(error)
        }
    }

    async getPrePostSurvey() {
        try {
            let data = await AsyncStorage.getItem('CORONA_CONTENTS');
            let contents = JSON.parse(data);

            let surveys = contents.surveys;
            let survey = 1;

            for(var a = 0; a < surveys.length; a++) {
                if(surveys[a].pre_post) 
                    survey = a;
            }

            this.setState({ survey }, () => {
                this.getPostSurveys();
            });

        } catch(error) {
            console.log(error)
        }
    }

    async getOffData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_OFFDATA');
            let offdata = (data != null) ? 
                JSON.parse(data) : [];

            this.setState({ offdata });
        } catch(error) {
            console.log(error)
        }
    }

    async getPostSurveys(module = null) {
        let starting = true;

        if(module == null) {
            module = this.state.module;
            starting = false;
        }

        let post = await Available.survey(module.id, 'Course ' + module.id + ' Post', 'Post');

        if(starting) {
            if(post)
                module.html += '<br /><br /><br />';
            
            this.setState({ loading: false })
        }

        this.setState({ post });
    }

    async getCoursesCP() {
        try {
            let { module } = this.state;
            let data = await AsyncStorage.getItem('CORONA_COURSESCP');
            let checkpoints = JSON.parse(data);

            this.setState({ checkpoints });

            for(var a = 0; a < checkpoints.length; a++) {
                if(module.content_id == checkpoints[a].id) {
                    console.log(module.content_id, checkpoints[a].id)
                    this.setState({ cpid: a })
                }
            }

            let starting = this.state.checkpoints[this.state.cpid].page;

            this.setState({ starting, index: starting });
        } catch(error) {
            console.log(error)
        }
    }

    handleScroll = (e) =>  {
        let { isCourse, index, pages, post } = this.state;
        let event = e.nativeEvent;

        let layout_height = event.layoutMeasurement.height;
        let content_height = event.contentSize.height;
        let y = event.contentOffset.y;

        let checkIfNotScrollable = this.scrollviewSizes[index].height < Screen.height;
        let checkIfEnd = layout_height + y  >= content_height - 60;

        if (checkIfNotScrollable || checkIfEnd) {
            if(index == pages.length-1) {
                this.setState({ icon: (post && isCourse) ? 'clipboard' : 'check' })

                if(post && isCourse)
                    Tools.notify('You are now ready to take the Post Survey!')
            }
            else
                this.setState({ icon: 'arrow-right' })
        }

        if(isCourse) {
            let { checkpoints, cpid } = this.state;

            checkpoints[cpid].scroll = y;
    
            this.setState({ checkpoints });
            saveCoursesCP(JSON.stringify(checkpoints));
        }
    }

    sortByKey = (array, key) => {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    contentSizeChange = (key, width, height) => {
        let { pages, index, starting, onStart } = this.state;

        if(onStart) {
            this.scrollviewSizes.push({ key, width, height });

            if(this.scrollviewSizes.length-1 == pages.length-1) {
                this.scrollviewSizes = this.sortByKey(this.scrollviewSizes, 'key');
                console.log(this.scrollviewSizes, index, starting)
    
                this.setState({ onStart: false })
                this.updatePage(starting);
            }
        }
    }

    updatePage = (index) => {
        let { isCourse, post, pages } = this.state;

        if(this.scrollviewSizes[index].height < Screen.height) {
            if(index == pages.length-1) {
                this.setState({ icon: (post && isCourse) ? 'clipboard' : 'check' })

                if(post && isCourse)
                    Tools.notify('You are now ready to take the Post Survey!')
            }
            else 
                this.setState({ icon: 'arrow-right' })
        } else
            this.setState({ icon: 'arrow-down' })

        if(isCourse) {
            let { checkpoints, cpid } = this.state;

            checkpoints[cpid].page = index;
            checkpoints[cpid].scroll = 0;

            this.setState({ checkpoints })
            saveCoursesCP(JSON.stringify(checkpoints));
        }

        this.setState({ index })
    }

    logActivity = (user_id, api_key, desc) => {
        var data = new FormData();

        var timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        
        data.append('id', user_id);
        data.append('description', desc);
        data.append('api_key', api_key);
        
        var logdata = {
            id: user_id,
            description: desc,
            api_key: api_key,
            timestamp: timestamp
        }

        Tools.fetch(Coronex.APIURL + '/Activities/log', {
            method: 'POST',
            body: data
        })
        .then(responseText => {})
        .catch(function(err) {
            this.saveToOffData(user_id, logdata)
        });
    }

    saveToOffData = (user_id, data) => {
        let { offdata } = this.state;

        let savedata = {
            id: user_id,
            activity: 'Module',
            title: data.description,
            data: data
        }

        offdata.push(savedata);

        saveOfflineData(JSON.stringify(offdata));
    }

    handleButton = () => {
        console.log('HANDLE BUTTON');
        let { icon, pages, index, module, isCourse } = this.state;
        let message = '';

        switch (icon) {
            case 'arrow-right':
                if(index != pages.length-1)
                    this.refs.pagesref.scrollBy(1);
                break;
            case 'arrow-down':
                break;
            case 'clipboard':
                this.answerPost();
                break;
            case 'check':
                if(isCourse)
                    message = (module.id == 0) ? 'Your Post Surveys will start on Course 1!' :
                            'You\'ve already answered the Post Survey for this Course!';
                else 
                    message = 'You have finished the module!';

                Tools.notify(message);
                break;
        }
    }

    answerPost = () => {
        let { survey, module, post } = this.state;

        if(post) {
            this.props.navigation.navigate('Questionnaire', { 
                id: survey, 
                post: true, 
                module: module 
            });
    
            return true;
        } else {
            Tools.notify('Post Survey already answered!');
        }
    }

    onEnd = () => {
        let { index, user_id, api_key } = this.state;
        let desc = 'Finished Page ' + (index+1) + ' Video';
        
        this.logActivity(user_id, api_key, desc);
    }

    render() {
        const addBottom = this.bottom.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })

        return(
            <SafeAreaView style={styles.safe_area_view}>
                <View style={styles.main_container}>

                    <Menu 
                        color="#000" 
                        name="ios-arrow-round-back" 
                        onPress={() => {
                            if(this.state.module.type == 'Course') 
                                this.props.navigation.navigate('Home');
                            else    
                                this.props.navigation.goBack();
                        }}/>

                    {
                        (this.state.loading) ?

                        <Indicator.BarIndicator 
                            style={styles.indicator} 
                            color="#ffcb80" /> : 

                        <Swiper 
                            style={styles.pages}
                            loop={false}
                            onIndexChanged={(index) => this.updatePage(index)}
                            showsPagination={true}
                            index={this.state.starting}
                            activeDotColor="#ffcb80"
                            ref="pagesref">

                            {
                                this.state.pages.map((value, index) => {
                                    return value
                                })
                            }
    
                        </Swiper>
                    }

                    <View style={styles.bottom_button}>
                        <View style={styles.transparent}/>
                        <TouchableOpacity onPress={() => this.handleButton()} style={styles.button_touch} activeOpacity={0.7}>  
                            <Feather name={this.state.icon} color='#fff' size={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1, 
        backgroundColor: '#fff'
    },
    main_container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll_container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Screen.width,
        // height: Screen.height
    },
    pages: {
        backgroundColor: '#fff',
        height: Screen.height,
        width: (Platform.OS == 'android') ? Screen.width : 'auto'
    },
    html: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: Screen.height / 11,
        paddingBottom: 0
    },
    post_button: {
        width: Screen.width / 2.1, 
        height: 40,
        position: 'absolute',
        bottom: -100,
    },
    main_button: {
        width: Screen.width / 2.1, 
    },
    post_view: {
        width: Screen.width / 2.1, 
        height: 40,
        borderRadius: 30,
        borderWidth: .5,
        borderColor: '#d3d3d3', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    transparent: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ffcb80',
        opacity: .6
    },
    post_text: {
        fontFamily: Fonts.Roboto,
        color: '#3D3A40',
    },
    bottom_button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        bottom: 30,
        right: 25
    },
    button_touch: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})