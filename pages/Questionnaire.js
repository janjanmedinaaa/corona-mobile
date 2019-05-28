import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, SafeAreaView } from 'react-native';
import { TouchableOpacity, Text, Alert, Platform } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';

import Menu from '../components/Menu';
import Question from '../components/Question';
import SurveyIntro from '../components/SurveyIntro';
import SurveyOutro from '../components/SurveyOutro';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import { saveOfflineData, saveUserData, saveDataIsLoggedIn } from '../assets/utils/Storage';
import Tools from '../assets/utils/Tools';

import * as Indicator from 'react-native-indicators';

var moment = require('moment');

export default class Module extends Component {
    constructor() {
        super();
        this.state = {
            pages: [],
            survey: {},

            index: 0,

            user_id: 0,
            username: '',
            api_key: '',
            offdata: null,
            savedUserData: null,

            pre: false,
            post: false,
            
            survey_id: 0,
            survey_short: '',
            module: null,

            submitload: false,

            colors: [],

            random: 'asdf'
        }

        this.answers = []
        this._quesRefs = []
    }

    componentDidMount() {
        this.getContent();
        this.getUserData();
        this.getOffData();
    }

    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let parseData = JSON.parse(data);

            let user_id = parseData.id;
            let username = parseData.patientID;
            let api_key = parseData.api_key;

            this.setState({ user_id, username, api_key, savedUserData: parseData })
        } catch(error) {
            console.log(error)
        }
    }

    async getContent() {
        try {
            let params = this.props.navigation.state.params;
            
            let data = await AsyncStorage.getItem('CORONA_CONTENTS');
            let parseData = JSON.parse(data);

            let id = params.id;
            let pre = params.pre == undefined ? false : params.pre;
            let post = params.post == undefined ? false : params.post;
            let module = params.module == undefined ? {} : params.module;

            let survey = parseData.surveys[id];
            let survey_id = parseData.surveys[id].id;
            let survey_short = parseData.surveys[id].short;

            if(survey.answers.type == 'Multiple Choice')
                this.generateColors(survey.questions, survey.answers.choices)

            this.setUnansweredQuestions(survey.questions)
            
            this.setState({ 
                survey, survey_id, 
                pre, post, module, 
                survey_short }, () => {

                this.displayData();
            })

        } catch (error) {
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

    onSelect = (question, answer) => {
        let random = Math.random().toString(36).substring(7);
        
        this.answers[question] = answer;

        if(this.state.survey.answers.type == 'Multiple Choice') {
            this.setState({ colors: this.updateColors(question, answer), random });
            this.displayData();
        }
    }

    inputChange = (question, answer) => {
        this.answers[question] = answer;
    }

    generateColors = (questions, answers) => {
        var colors = [];
        let random = Math.random().toString(36).substring(7);

        for(var a = 0; a < questions.length; a++) {
            this.answers.push('UNANSWERED');
            var holder = [];

            for(var b = 0; b < answers.length; b++) {
                holder.push('#fff');
            }

            colors.push(holder);
        }

        this.setState({ colors, random });
    }

    setUnansweredQuestions = (questions) => {
        for(var a = 0; a < questions.length; a++) {
            this.answers.push('UNANSWERED');
        }
    }

    updateColors = (question, answer) => {
        let { colors, survey } = this.state;
        var holder = [];

        for(var b = 0; b < survey.answers.choices.length; b++) {
            if(answer == b)
                holder.push('#feefdf');
            else 
                holder.push('#fff');
        }

        colors[question] = holder;

        return colors;
    }

    displayData() {
        let { pre, post } = this.state;
        let pages = [];
        var a = 0;

        pages.push(
            <SurveyIntro 
                key={0}
                onPress={() => this.refs.pagesref.scrollBy(1, true)}
                short={this.state.survey.short}
                name={this.state.survey.name + ((pre) ? ' (PRE-SURVEY)' : (post) ? ' (POST-SURVEY)' : '')}
                description={this.state.survey.description} />
        )

        for(a = 0; a < this.state.survey.questions.length; a++) {
            pages.push(
                <Question 
                    key={a+1}
                    number={a+1}
                    short={this.state.survey.short}
                    name={this.state.survey.name} 
                    question={this.state.survey.questions[a]}
                    answers={this.state.survey.answers}
                    totalQuestions={this.state.survey.questions.length}
                    random={this.state.random}
                    colors={this.state.colors[a]}
                    onSelect={(ques, ans) => this.onSelect.bind(this, ques, ans)}
                    inputChange={(ques, ans) => this.inputChange.bind(this, ques, ans)}/>
            )
        }

        pages.push(
            <SurveyOutro 
                key={a+1}
                onPress={() => this.submitSurvey()}
                short={this.state.survey.short}
                name={this.state.survey.name + ((pre) ? ' (PRE-SURVEY)' : (post) ? ' (POST-SURVEY)' : '')}
                description={this.state.survey.description} />
        )

        this.setState({ pages })
    }

    submitSurvey = () => {
        let { user_id, username, module, pre, post, survey_short, survey_id, api_key } = this.state;

        var data = new FormData();
        var timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        var answers = '';
        var desc = 
            (pre) ? 'Answer Pre Survey of Course ' + module.id :
            (post) ? 'Answer Post Survey of Course ' + module.id : 
            'Answer Weekly ' + survey_short + ' Survey';

        var title = 
            (pre) ? 'Pre Survey of Course ' + module.id :
            (post) ? 'Post Survey of Course ' + module.id : 'Weekly';

        this.setState({ submitload: true })

        for(var a = 0; a < this.answers.length; a++) {
            answers += (a == 0) ? this.answers[a] : ';' + this.answers[a]
        }
        
        var surveydata = {
            answer: answers, 
            description: desc, 
            user_id: user_id, 
            title: title,
            username: username, 
            survey_id: survey_id, 
            api_key: api_key,
            timestamp: timestamp
        }

        data.append('answer', answers);
        data.append('description', desc);
        data.append('title', title);
        data.append('user_id', user_id);
        data.append('username', username);
        data.append('survey_id', survey_id);
        data.append('api_key', api_key);

        Tools.fetch(Coronex.APIURL + '/Patients/survey', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(rJson => {
            if(rJson.success)
                this.manageOthers(rJson.others.others);

            this.setState({ submitload: false });

            Tools.notify(rJson.data);

            this.finishQuestionnaire();
        })
        .catch(err => {
            this.setState({ submitload: false })
            
            err += '';

            if(err == 'timeout')
                Tools.notify('Oh no! Request time out. I\'ll try submitting your Survey again later.');
            else
                Tools.notify('Oh no! Something went wrong. I\'ll try submitting your Survey again later.');

            this.saveToOffData(surveydata);
        });
    }

    manageOthers = (others) => {
        let { savedUserData } = this.state;
        let status = others.status;

        if (status == 'Deactivated') {
            Tools.notify('Your account has been deactivated.')

            removeUserData();
            saveDataIsLoggedIn('false');
            
            this.props.navigation.dispatch(logout)
            return true
        }

        let currentNotif = savedUserData.others.notifications;
        let newNotif = others.notifications;

        let checkNotifs = Tools.compare(currentNotif, newNotif);

        others.notifications = checkNotifs.current;

        savedUserData.others = others;
        saveUserData(JSON.stringify(savedUserData));

        Tools.pushNotif(checkNotifs.added)
    }

    saveToOffData = (data) => {
        let { offdata, survey_id, survey_short } = this.state;
        let title = this.offlineDataTitle(survey_short);

        let savedata = {
            id: survey_id,
            title: title,
            short: survey_short,
            activity: 'Survey',
            data: data
        }

        offdata.push(savedata)
        
        saveOfflineData(JSON.stringify(offdata));

        this.finishQuestionnaire();
    }

    offlineDataTitle = (survey_short) => {
        let { module, pre, post } = this.state;

        return (pre) ? 'Course ' + module.id + ' Pre':
            (post) ? 'Course ' + module.id + ' Post': 
            survey_short + ' Weekly';
    }
    
    finishQuestionnaire = () => {
        let { pre, post, module } = this.state;

        if(post)
            this.props.navigation.replace('Home');
        else {
            this.props.navigation.replace(
                pre ? 'Module' : 'Survey', 
                { id: 0, pre: pre, module: module }
            );
        }

        return true;
    }

    goBack = () => {
        Alert.alert(
            'Are you sure you want to cancel your survey?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {   
                    text: 'OK', 
                    onPress: () => this.props.navigation.goBack()
                },
            ],
            { cancelable: true },
        );

        return true
    }

    render() {
        let { index, pages } = this.state;

        return(
            <SafeAreaView style={styles.safe_area_view}>
                <View style={styles.main_container}>
                    {
                        (this.state.submitload) ?
                            <Indicator.BarIndicator 
                                style={styles.indicator} 
                                color="#ffcb80" /> : null
                    }

                    <Menu 
                        color="#000" 
                        name="ios-arrow-round-back" 
                        onPress={() => this.goBack()}/>

                    <Swiper 
                        style={styles.pages}
                        loop={false}
                        onIndexChanged={(index) => this.setState({ index })}
                        showsPagination={false}
                        ref="pagesref">

                        {
                            this.state.pages.map((value, index) => {
                                return value
                            })
                        }

                    </Swiper>
                    <View style={styles.bottom_container}>
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            disabled={!(index > 0 && pages.length-1 != index)}
                            style={[
                                styles.button, 
                                styles.back,
                                {
                                    backgroundColor: (index > 0 && pages.length-1 != index) ? '#ffcb80' : '#fff'
                                }
                            ]}
                            onPress={() => this.refs.pagesref.scrollBy(-1, true)}>
                            <Text style={styles.button_text}>
                                {(index > 0 && pages.length-1 != index) ? 'BACK' : ''}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            activeOpacity={0.7}
                            disabled={!(index > 0 && pages.length-1 != index)}
                            style={[
                                styles.button, 
                                {
                                    backgroundColor: (index > 0 && pages.length-1 != index) ? 
                                                        '#ffcb80' : '#fff'
                                }
                            ]}
                            onPress={() => this.refs.pagesref.scrollBy(1, true)} >
                            <Text style={styles.button_text}>
                                {(index > 0 && pages.length-1 != index) ? 'NEXT' : ''}
                            </Text>
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
    pages: {
        backgroundColor: '#fff',
        height: Screen.height - 48,
        width: (Platform.OS == 'android') ? Screen.width : 'auto'
    },
    indicator: {
        zIndex: 5,
        position: 'absolute',
    },
    bottom_container: {
        width: Screen.width,
        height: Screen.height / 12,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    button: {
        width: (Screen.width / 2) - 3,
        height: Screen.height / 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    button_text: {
        marginHorizontal: 5,
        fontFamily: Fonts.Roboto,
        color: '#fff',
        fontSize: RF(2.5)
    },
    back: {
        marginRight: 6
    },
    transparent: {
        width: Screen.width / 3, 
        height: 50,
        flex: 1,
        borderRadius: 50,
        backgroundColor: '#ffcb80',
        opacity: .9,
        position: 'absolute'
    }, 
})