import React, { Component } from 'react';
import { StyleSheet, View, Animated, BackHandler, Alert, SafeAreaView } from 'react-native';
import { UIManager, Platform, LayoutAnimation, AsyncStorage } from 'react-native';
import Drawer from 'react-native-circle-drawer';
import SplashScreen from 'react-native-splash-screen';
import { StackActions, NavigationActions } from 'react-navigation';

import CircleOverlay from '../components/CircleOverlay';
import Topic from '../components/Topic';
import Menu  from '../components/Menu';
import CourseModule  from '../components/CourseModule';
import TipModule  from '../components/TipModule';
import Title  from '../components/Title';
import { Main, TopRight } from '../components/SideMenu';

import { Screen } from '../assets/utils/Screen';
import { Coronex } from '../assets/utils/Coronex';
import { removeUserData, saveUserData, resetCoursesCP } from '../assets/utils/Storage';
import { removeOfflineData, saveDataIsLoggedIn } from '../assets/utils/Storage';
import Tools from '../assets/utils/Tools';
import Available from '../assets/utils/Available';

const logout = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params: { logout: true } })],
});

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            timer: null,

            justifyContentValue: 'flex-end',

            zIndex: {
                courses: 11,
                tips: 10,
                scrollview: 0,
            },

            menuZIndex: {
                back: 10,
                sideMenu: 11,
            },

            image: '',

            disabled: false,

            starting: true,

            fadeCourses: false,
            fadeTips: false,

            refreshing: false,

            savedUserData: null,

            id: 0,
            api_key: '',
            survey: 1,
            username: '',
            notifBadge: 0,
            isDeactivated: false,

            coursesItems: [], // Display Holders
            tipsItems: [],

            courses: [], // Sources
            tips: [],

            pre: [], // Pre Survey Status

            disabledCourses: [], // Disabled Status
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.fadeInAnim = new Animated.Value(this.state.starting ? 0 : 1) 
        this.fadeOutAnim = new Animated.Value(this.state.starting ? 1 : 0)
        this.moveCourseAnim = new Animated.Value(this.state.starting ? 0 : 1) 
        this.moveTipsAnim = new Animated.Value(this.state.starting ? 0 : 1)
        this.headerHeightAnim = new Animated.Value(this.state.starting ? 0 : 1)
        this.rotateIconAnim = new Animated.Value(this.state.starting ? 0 : 1)
        this.titleHeightAnim = new Animated.Value(this.state.starting ? Screen.width / 1.3 : 0)
    }

    componentDidMount() {
        this.getUserData();
        this.getContent();

        SplashScreen.hide();

        let timer = setInterval(this.actions, 5000);
        this.setState({ timer });

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        clearInterval(this.state.timer);
    }

    actions = () => {
        this.getContent();
        this.onRefresh();
    }

    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let parseData = JSON.parse(data);

            let image = parseData.image;
            let id = parseData.id;
            let username = parseData.patientID;
            let api_key = parseData.api_key;

            console.log('others', parseData.others);

            this.setState({ 
                image, id, 
                username, api_key, 
                savedUserData: parseData }, () => {
                    this.onRefresh();
                })

        } catch(error) {
            console.log(error)
        }
    }

    async getContent() {
        try {
            let data = await AsyncStorage.getItem('CORONA_CONTENTS');
            let newNotif = await AsyncStorage.getItem('CORONA_NEWNOTIFICATIONS');

            let parseData = JSON.parse(data);
            let parseNewNotif = (newNotif != null && newNotif != "") ? JSON.parse(newNotif) : [];

            let courses = parseData.courses;
            let tips = parseData.tips;
            let surveys = parseData.surveys;
            let survey = 1;

            for(var a = 0; a < surveys.length; a++) {
                if(surveys[a].pre_post) 
                    survey = a;
            }

            this.setState({ 
                courses, tips, survey, 
                notifBadge: parseNewNotif.length }, () => {
                this.getPreSurveys();
            })

        } catch(error) {
            // Tools.notify(error + '')
        }
    }

    async getPreSurveys() {
        let { courses } = this.state;
        let pre = [];
        let disabledCourses = [];

        for(var i in courses) {
            let status = await Available.survey(i, 'Course ' + i + ' Pre', 'Pre');
            let course = await Available.course(i);
            pre.push(status);
            disabledCourses.push(course);
        }

        this.setState({ pre, disabledCourses }, () => {
            this.displayData();
        });
    }

    onRefresh = () => {
        let { id, username, api_key } = this.state;

        var data = new FormData();
        data.append('user_id', id);
        data.append('username', username);
        data.append('api_key', api_key);

        fetch(Coronex.APIURL + '/Patients/others', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ 
                refreshing: false,  
            })

            this.manageOthers(responseJson.others);
    
            this.displayData();
        })
        .catch(function(err) {
            console.log(err)
        });
    }

    manageOthers = (others) => {
        let { savedUserData, isDeactivated } = this.state;
        let status = others.status;

        if (status == 'Deactivated') {
            removeUserData();
            saveDataIsLoggedIn('false');
            
            if(!isDeactivated) {
                Alert.alert(
                    'Your account has been deactivated.', '',
                    [{   
                        text: 'OK', 
                        onPress: () => {
                            this.props.navigation.dispatch(logout)
                            return true
                        }
                    }],
                    { 
                        cancelable: false 
                    }
                );

                this.setState({ isDeactivated: true })
            }
        }

        let currentNotif = savedUserData.others.notifications;
        let newNotif = others.notifications;

        let checkNotifs = Tools.compare(currentNotif, newNotif);

        others.notifications = checkNotifs.current;

        savedUserData.others = others;
        saveUserData(JSON.stringify(savedUserData));

        Tools.pushNotif(checkNotifs.added)
    }

    displayData() {
        let coursesItems = [];
        let tipsItems = [];

        for(var a = 0; a < this.state.courses.length; a++) {
            coursesItems.push(
                <CourseModule 
                    key={a}
                    number={a} 
                    title={this.state.courses[a].title}
                    source={this.state.courses[a].source}
                    locked={this.state.disabledCourses[a]}
                    onPress={this.navigate.bind(this, 'Course', a)} /> 
            );
        }

        for(var b = 0; b < this.state.tips.length; b++) {
            tipsItems.push(
                <TipModule 
                    key={b}
                    number={b} 
                    title={this.state.tips[b].title}
                    source={this.state.tips[b].source}
                    description={this.state.tips[b].description}
                    onPress={this.navigate.bind(this, 'Tips', b)} /> 
            );
        }

        this.setState({ coursesItems, tipsItems });
    }
    
    handleBackPress = () => {
        if(!this.state.starting) {
            this.closeTopic(); 
            return true
        }
    }

    navigate(module, id) {
        let { survey, pre, disabledCourses, courses, tips, disabled } = this.state;
        let page = pre[id] && module == 'Course' ? 'Questionnaire' : 'Module';

        let resource = (module == 'Course') ? courses : tips;

        if(disabled) {
            if(module == 'Tips') {
                this.props.navigation.navigate('Category', {
                    id: id
                })
            } else {
                if(disabledCourses[id]) {
                    Alert.alert('Course ' + id + ' not available!')
                } else {
                    this.props.navigation.navigate(page, { 
                        id: survey,
                        pre: pre[id],
                        module: {
                            html: Tools.stripslashes(resource[id].html), 
                            content_id: resource[id].content_id,
                            id: id, 
                            type: module, 
                            title: resource[id].title
                        }
                    })
                }
            }
        }

        return true
    }

    runAnimations = () => {
        /* ------------ Fade In / Out Layout and Move Topic to Top / Bottom ------------- */

        Animated.parallel([
            Animated.timing(this.fadeInAnim, {
                toValue: this.state.starting ? 1 : 0,
                duration: 400,
            }),

            Animated.timing(this.fadeOutAnim, {
                toValue: this.state.starting ? 0 : 1, 
                duration: 400,
            }),

            Animated.timing(this.headerHeightAnim, {
                toValue: this.state.starting ? (Screen.height / 5.5) : 0,
                duration: 400,
            }),

            Animated.timing(this.moveCourseAnim, {
                toValue: this.state.starting ? ((Screen.height / 5.5) / 2.5) : 0,
                duration: 400,
            }),
        
            Animated.timing(this.moveTipsAnim, {
                toValue: this.state.starting ? -((Screen.height / 5.5) / 1.25) : 0,
                duration: 400,
            }),

            Animated.timing(this.rotateIconAnim, {
                toValue: this.state.starting ? 1 : 0,
                duration: 400,
            }),

            Animated.timing(this.titleHeightAnim, {
                toValue: this.state.starting ? 0 : Screen.width / 1.3,
                duration: 400,
            }),
        ]).start();
    }

    openTopic = () => {
        /* ------------ Changes Main Container's justifyContent ------------- */

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        this.runAnimations();

        this.setState({ 
            justifyContentValue: 'flex-start', 
            disabled: true,
            menuZIndex: { back: 11, sideMenu: 10 },
            starting: false,
        });
    }

    closeTopic = () => {
        /* ------------ Changes Main Container's justifyContent ------------- */

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        this.runAnimations();

        this.setState({ 
            justifyContentValue: 'flex-end', 
            disabled: false, 
            menuZIndex: { back: 10, sideMenu: 11 },
            zIndex: {courses: 10, tips: 11, scrollview: 0},
            starting: true,
            fadeCourses: false,
            fadeTips: false
        });
    }

    showCourses = () => {
        this.setState({ 
            zIndex: {courses: 11, tips: 10, scrollview: 20},
            fadeTips: true,
        }, () => {
            this.openTopic();
        })
    }

    showTips = () => {
        this.setState({ 
            zIndex: {courses: 10, tips: 11, scrollview: 20},
            fadeCourses: true,
        }, () => {
            this.openTopic();
        })
    }

    openDrawer(){
        this.refs.DRAWER.open()
    }
    
    renderSideMenu(){
        return( 
            <Main 
                profilePress={() => this.goToPage('Profile')}
                contentsPress={() => this.refs.DRAWER.close()}
                surveyPress={() => this.goToPage('Survey')} 
                contactsPress={() => this.goToPage('Contacts')}
                notificationsPress={() => this.goToPage('Notifications')}
                aboutPress={() => this.goToPage('About')}
                settingsPress={() => this.goToPage('Settings')}
                logoutPress={() => this.goToPage('Login')} 
                notificationsBadge={this.state.notifBadge}/>  
        );
    }
    
    renderTopRightView(){
        return( <TopRight 
                    image={this.state.image} 
                    profilePress={() => this.goToPage('Profile')} /> );
    }

    goToPage(page) {
        this.refs.DRAWER.close()

        if(page == 'Login') {
            Alert.alert(
                'Are you sure you want to logout?',
                '',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                    },
                    {   
                        text: 'Logout', 
                        onPress: () => this.logout()
                    },
                ],
                {cancelable: true},
            );
        } else {
            this.props.navigation.navigate(page)
            return true
        }
    }

    logout = () => {
        removeOfflineData()
        resetCoursesCP()

        AsyncStorage.removeItem('CORONA_USERDATA')
            .then((value) => {
                saveUserData("");
                saveDataIsLoggedIn("false");
                
                this.props.navigation.dispatch(logout)
                return true
            })
            .catch((error) => {
                this.logout();
            })
    }

    render() {
        const fadeOpacity = this.fadeOutAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })

        const addHeight = this.headerHeightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })

        const rotateIcon = this.rotateIconAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        const fadeIn = {
            opacity: this.fadeInAnim
        }

        const fadeOut = {
            opacity: fadeOpacity
        }

        return(
            <SafeAreaView style={styles.safe_area_view}>
                <Drawer 
                    ref="DRAWER"
                    sideMenu={this.renderSideMenu()}
                    topRightView={this.renderTopRightView()}
                    primaryColor="#fab76c"
                    secondaryColor="#ffcb80"
                    cancelColor="#fab76c">

                    <View style={[styles.main_container, { justifyContent: this.state.justifyContentValue }]}>

                        <Animated.View style={[
                            styles.invisibleHeader, 
                            fadeIn, 
                            { height: addHeight }
                        ]} />

                        <Menu 
                            name="ios-arrow-round-back"
                            style={[fadeIn, { zIndex: this.state.menuZIndex.back }, { transform: [{rotate: rotateIcon}] }]}
                            onPress={() => this.closeTopic()}/>

                        <Title 
                            animateTitle={[{ height: this.titleHeightAnim }]}/>

                        <Menu 
                            style={[fadeOut, { zIndex: this.state.menuZIndex.sideMenu }, { transform: [{rotate: rotateIcon}] }]}
                            onPress={() => this.openDrawer()}/>
                            

                        <CircleOverlay 
                            style={[styles.circle_overlay, fadeOut]}
                            size={Screen.width*2}
                            source={require('../assets/img/home_family.png')} 
                            opacity={0.9}
                            color="#fab76c"/>
                        
                        <Topic 
                            onPress={ () => this.showCourses() }
                            disabled={this.state.disabled}
                            touchStyle={!this.state.starting ? styles.remove_border : null}
                            animateContainer={[
                                { top: this.moveCourseAnim }, 
                                { zIndex: this.state.zIndex.courses },
                                this.state.fadeCourses ? fadeOut : null,
                            ]}
                            topic="Courses" 
                            description="Contains step by step guides about Radiotherapy and its effects." />

                        <Topic 
                            onPress={ () => this.showTips() }
                            disabled={this.state.disabled}
                            touchStyle={!this.state.starting ? styles.remove_border : null}
                            animateContainer={[
                                { top: this.moveTipsAnim }, 
                                { zIndex: this.state.zIndex.tips }, 
                                this.state.fadeTips ? fadeOut : null,
                            ]}
                            topic="Tips" 
                            description="Contains tips and exercises" />

                        <Animated.ScrollView 
                            bounces={false}
                            style={[styles.scrollview_container, fadeIn, { zIndex: this.state.zIndex.scrollview }]} 
                            contentContainerStyle={[styles.scrollview_content]}>

                            {
                                (this.state.fadeCourses) ?

                                this.state.tipsItems.map((value, index) => {
                                    return value
                                }) : 

                                this.state.coursesItems.map((value, index) => {
                                    return value
                                }) 
                            }

                        </Animated.ScrollView>
                    </View>

                </Drawer>
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
        alignItems: 'center',
        paddingBottom: 30,
    },
    circle_overlay:{
        position: 'absolute',
        top: 0 - (Screen.width*1.27),
        left: 0 - (Screen.width/2),
        zIndex: 1,
    },
    invisibleHeader: {
        position: 'absolute',
        top: (Tools.isIphoneX()) ? -45 : 0,
        width: Screen.width,
        backgroundColor: '#fab76c', 
        zIndex: 5,
    },
    scrollview_container: {
        position: 'absolute', 
        top: (Screen.height / 3.5),
        bottom: 0,
    },
    scrollview_content: {
        width: Screen.width,
        alignItems: 'center',
        paddingBottom: 12.5,
    },
    remove_border: {
        borderWidth: 0, 
        elevation: 0 
    }
});