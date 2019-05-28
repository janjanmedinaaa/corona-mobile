import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import { Platform, AsyncStorage, TouchableOpacity } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import SplashScreen from 'react-native-splash-screen';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import Tools from '../assets/utils/Tools';

import { saveAppData, saveLayout } from '../assets/utils/Storage';
import { saveUserLogs, saveCoursesCP, removeUserData, saveDataIsLoggedIn } from '../assets/utils/Storage';

var moment = require('moment');

export default class Module extends Component {
    constructor() {
        super();
        this.state = {
            module: [
                {
                    title: 'Read your Modules',
                    description: 'Take your courses and read them thoroughly. These will guide you throughout you radiotherapy session.',
                    image: require('../assets/img/courses.png')
                },
                {
                    title: 'Apply the Tips',
                    description: 'The Tips section contains nutrition, exercises, and other useful tips you can follow before, during, and after radiotherapy.',
                    image: require('../assets/img/tips.png')
                },
                {
                    title: 'Take your survey',
                    description: 'Answer your surveys weekly. This will help the doctors keep track of your condition.',
                    image: require('../assets/img/survey.png')
                },
            ],
            pages: [],
            index: 0,
            appData: null,
            logs: null,
            isLoggedIn: null
        }

        this.timeout = 20000;
        this.lockTimeDiff = 5;
        this.timeUnit = 'hours';

        this.sessionLimitDiff = 1;
        this.sessionTimeUnit = 'months'; // Hours for development, Months for production
    }

    componentDidMount() {
        this.display();

        this.getAppData();
        this.getContentLogs();
    }

    async getAppData() {
        try {
            let startingAppData = {
                lockDate: '',
                firstTime: true,
                lastSession: ''
            }

            let appData = await AsyncStorage.getItem('CORONA_APPDATA');
            let isLoggedIn = await AsyncStorage.getItem('CORONA_LOGGEDIN');

            let parseData = (appData != undefined) ? 
                                JSON.parse(appData) : startingAppData;

            if (appData == null || appData == undefined)
                saveAppData(JSON.stringify(startingAppData));

            this.setState({ appData: parseData, isLoggedIn })
        } catch(error) {
            console.log(error)
        }
    }

    async getContentLogs() {
        try {
            let data = await AsyncStorage.getItem('CORONA_CONTENTLOGS');
            let logs = JSON.parse(data);

            this.setState({ logs }, () => {
                this.getLogs();
            })

        } catch(error) {
            console.log(error)
        }
    }

    async getCourseCP(contents) {
        try {
            let data = await AsyncStorage.getItem('CORONA_COURSESCP');

            this.autoLogin();
            
            if(data == undefined || data == null)
                this.manageCourseCP(contents);
            else 
                this.manageCourseCP(contents, true, JSON.parse(data))

        } catch(error) {
            console.log(error)
        }
    }

    manageCourseCP = (contents, addcp = false, current = []) => {
        var holder = current;
    
        for(var a = 0; a < contents.courses.length; a++) {
            if(addcp) {
                checker:
                for(var b = 0; b < current.length; b++) {
                    if(contents.courses[a].title == current[b].title) {
                        break checker;
                    }
        
                    if(b == current.length-1) {
                        holder.push({
                            id: contents.courses[b].content_id,
                            title: contents.courses[b].title,
                            scroll: 0,
                            page: 0,
                        })
                    }
                }
    
                console.log('Add New Checkpoints');
            } else {
                for(var a = 0; a < contents.courses.length; a++) {
                    holder.push({
                        id: contents.courses[a].content_id,
                        title: contents.courses[a].title,
                        scroll: 0,
                        page: 0,
                    })
                }
    
                console.log('Create Checkpoints');
            }
        }
    
        saveCoursesCP(JSON.stringify(holder))
    }

    getLogs = () => {
        Tools.fetch(Coronex.APIURL + '/Activities/latest', {
            method: 'POST'
        }, this.timeout)
        .then(response => response.json())
        .then(responseJson => {
            var { logs } = this.state;

            if(logs == undefined || logs == null || 
                logs.timestamp != responseJson.logs.timestamp) {
                this.getContent(responseJson);
            } else {
                this.autoLogin();
            }
        })
        .catch((err) => {
            this.autoLogin();
        });
    }

    getContent = (logs) => {
        Tools.fetch(Coronex.APIURL + '/Patients/contents', {
            method: 'POST'
        }, this.timeout)
        .then(response => response.json())
        .then(responseJson => {
            let contents = responseJson.contents;

            for(var a in contents.courses) {
                Image.prefetch(Coronex.IMAGEURL + contents.courses[a].source)
            }
    
            for(var b in contents.tips) {
                Image.prefetch(Coronex.IMAGEURL + contents.tips[b].source)
            }

            saveLayout(JSON.stringify(responseJson.contents));
            saveUserLogs(JSON.stringify(logs.logs));

            this.getCourseCP(responseJson.contents);
        })
        .catch((err) => {
            this.autoLogin(err);
        });
    }

    async autoLogin(err = "") {
        try {
            let { appData, isLoggedIn } = this.state;
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let timestamp = moment(new Date());

            if(err != "") {
                Tools.pushNotif([{ 
                    title: 'CORONA Content Update', 
                    message: 'Error in updating the App Content. Try restarting the app when you have a more stable internet connection.' 
                }])
            }

            if(appData.firstTime) {
                SplashScreen.hide();
            } else if(isLoggedIn && data != undefined && data != null && data != "" && !appData.firstTime) {
                if(appData.lastSession != '') {
                    let lastSession = moment(appData.lastSession);
            
                    let diff = timestamp.diff(lastSession, this.sessionTimeUnit);

                    if(diff >= this.sessionLimitDiff) {
                        Tools.notify('Session expired due to a long period of inactivity.')
                    
                        removeUserData();
                        saveDataIsLoggedIn("false");
                        this.updateLastSession('');
                    } else {
                        this.updateLastSession(timestamp.format("YYYY-MM-DD HH:mm:ss"));

                        this.props.navigation.replace('Home')
                        return true
                    }
                } else {
                    this.updateLastSession(timestamp.format("YYYY-MM-DD HH:mm:ss"));
                }

                this.props.navigation.replace('Login')
                return true
            } else {
                this.props.navigation.replace('Login')
                return true
            }
        } catch(error) {
            this.props.navigation.replace('Login')
            return true
        }
    }

    display = () => {
        let { module } = this.state;
        let pages = [];

        pages.push(
            <ImageBackground 
                key={a+1}
                style={styles.firstpage}
                source={require('../assets/img/welcome.png')} 
                resizeMode="cover">

                <Image 
                    style={styles.logo}
                    source={require('../assets/img/orange_logo.png')}
                    resizeMode="contain" />

                <Text style={styles.welcome}>Welcome To</Text>
                <Text style={styles.appname}>CORONA</Text>
                <Text style={styles.appdesc}>Cancer On-the-go Reading Online Application</Text>
                <Text style={styles.getstarted}>Get Started</Text>
            </ImageBackground>
        )

        for(var a = 0; a < module.length; a++) {
            pages.push(
                <View style={styles.pages} key={a+1}>
                    <Image
                        source={module[a].image}
                        style={styles.image} />
                    <Text style={styles.title}>{module[a].title}</Text>
                    <Text style={styles.description}>{module[a].description}</Text>
                </View>
            )
        }

        this.setState({ pages })
    }

    updateLastSession = (lastSession) => {
        let { appData } = this.state;

        appData.lastSession = lastSession;
        saveAppData(JSON.stringify(appData));
    }

    nextButton = () => {
        let { index, pages } = this.state;

        if(index != pages.length-1)
            this.refs.swiper.scrollBy(1)
        else
            this.login()
    }

    login = () => {
        let { appData } = this.state;
        
        appData.firstTime = false;
        saveAppData(JSON.stringify(appData));

        this.props.navigation.navigate('Login')
        return true
    }

    render() {
        return(
            <View style={styles.safe_area_view}>
                <Swiper 
                    style={styles.swiper}
                    loop={false}
                    ref="swiper"
                    showsPagination={true}
                    onIndexChanged={(index) => this.setState({ index })}
                    activeDotColor="#ffcb80"
                    paginationStyle={{ justifyContent: 'flex-start', margin: 40}}>

                    {
                        this.state.pages.map((value, index) => {
                            return value
                        })
                    }

                </Swiper>
                <TouchableOpacity style={styles.next_button} activeOpacity={0.7} onPress={() => this.nextButton()}>
                    <View>
                        <Feather name='arrow-right' color='#fff' size={24}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1, 
        backgroundColor: '#fff'
    },
    swiper: {
        backgroundColor: '#fff',
        height: Screen.height,
        width: (Platform.OS == 'android') ? Screen.width : 'auto'
    },
    firstpage: {
        backgroundColor: '#fff',
        height: Screen.height,
        width: Screen.width,
        justifyContent: 'center',
        padding: 10,
    },
    logo: {
        width: Screen.width / 2.5,
        height: Screen.width / 2.5
    },
    welcome: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(3),
        marginHorizontal: 20,
        color: '#ffcb80'
    },
    appname: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(6),
        marginHorizontal: 20,
        color: '#ffcb80'
    },
    appdesc: {
        width: Screen.width / 1.5   ,
        fontFamily: Fonts.RobotoLight,
        fontSize: RF(2.5),
        marginHorizontal: 20,
        color: '#000',
    },
    getstarted: {
        position: 'absolute',
        fontFamily: Fonts.RobotoLight,
        fontSize: RF(3),
        color: '#000',
        bottom: 45,
        right: 100
    },
    pages: {
        backgroundColor: '#fff',
        height: Screen.height,
        width: Screen.width,
        justifyContent: 'center',   
        alignItems: 'center',
    },
    next_button: {
        position: 'absolute',
        backgroundColor: '#ffcb80',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    image: {
        width: Screen.width - 70,
        height: Screen.width - 70
    },
    title: {
        fontSize: RF(4),
        fontFamily: Fonts.RobotoBold,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginHorizontal: 40,
        marginVertical: 5,
        color: '#ffcb80'
    },
    description: {
        fontSize: RF(2.2),
        fontFamily: Fonts.Roboto,
        textAlign: 'left',
        color: '#000',
        alignSelf: 'flex-start',
        marginHorizontal: 40,
        marginVertical: 5,
    },
})