import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { AsyncStorage, Alert, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import SplashScreen from 'react-native-splash-screen';

import UserInput from '../components/UserInput';
import UserButton from '../components/UserButton';
import Footer from '../components/Footer';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import Tools from '../assets/utils/Tools';
import { saveAppData, saveUserData, removeUserData, saveDataIsLoggedIn } from '../assets/utils/Storage';

import * as Indicator from 'react-native-indicators';

var moment = require('moment');

const IMAGE_HEIGHT = Screen.width / 2;
const IMAGE_HEIGHT_SMALL = Screen.width / 4;

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            loginLoad: false,
            contentLoad: false,
            logs: null,
            username: '',
            password: '',
            hasContent: false,
            previousUsername: '',
            attempts: 1,
            loginAttempts: 1,
            appData: null,
        }

        this.timeout = 5000;
        this.lockTimeDiff = 5;
        this.timeUnit = 'hours';

        this.sessionLimitDiff = 1;
        this.sessionTimeUnit = 'months'; // Hours for development, Months for production

        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentDidMount() {
        let logout = this.props.navigation.getParam('logout', false);
        
        if (logout) {
            removeUserData();
            saveUserData("");
            saveDataIsLoggedIn("false");
        }
        
        SplashScreen.hide();

        this.getAppData();
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT_SMALL,
            }),
        ]).start();
    };
    
    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT,
            }),
        ]).start();
    };

    async checkContents() {
        try {
            let data = await AsyncStorage.getItem('CORONA_CONTENTS');
            let hasContent = (data != null) ? true: false;

            this.setState({ hasContent })

        } catch(error) {
            console.log(error)
        }
    }

    async getAppData() {
        try {
            let startingAppData = {
                lockDate: '',
                firstTime: true,
                lastSession: ''
            }

            let appData = await AsyncStorage.getItem('CORONA_APPDATA');
            let parseData = (appData != undefined) ? 
                                JSON.parse(appData) : startingAppData;

            if (appData == null || appData == undefined)
                saveAppData(JSON.stringify(startingAppData));

            this.setState({ appData: parseData })
        } catch(error) {
            console.log(error)
        }
    }

    checkUsername = (username) => {
        username = username.substring(0,2)

        return (username != 'AD' && username != 'DC')
    }

    login = () => {
        let { username, password, hasContent } = this.state;
        let timestamp = moment(new Date());

        let data = new FormData();
        data.append('username', username);
        data.append('password', password);
    
        if(username == '') {
            this.refs.username.change();
            Tools.notify('Username required!')
        } else if(password == '') {
            this.refs.password.change();
            Tools.notify('Password required!')
        } else if(!this.checkUsername(username)) {
            Tools.notify('Invalid Username Pattern!')
        }

        if(!this.checkLoginStatus()) {
            Tools.notify('You have been banned from logging in for ' + this.lockTimeDiff + ' ' + this.timeUnit + ' due to multiple failed login attempts.')
        } else if(username != '' && password != '' && this.checkUsername(username)) {
            this.setState({ loginLoad: true })

            Tools.fetch(Coronex.APIURL + '/Patients/login', {
                method: 'POST',
                body: data
            }, 10000)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ loginLoad: false })

                if(responseJson.success) {
                    if (responseJson.data.others.status == 'Deactivated') {
                        Tools.notify('Your account has been deactivated.')
                    }
                    else {
                        Image.prefetch(Coronex.IMAGEURL + responseJson.data.image)
                        this.updateLastSession(timestamp.format("YYYY-MM-DD HH:mm:ss"));

                        saveUserData(JSON.stringify(responseJson.data));
                        saveDataIsLoggedIn("true");
                        
                        // if(hasContent) 
                            this.navigate(responseJson.data.others.usernew);
                        // else
                        //     this.getLogs();
                    }
                } else { 
                    Tools.notify(responseJson.data);     
                    this.checkLoginAttempts();  
                }

                return true
            })
            .catch(err => {
                this.setState({ loginLoad: false })
                
                err += '';

                if(err == 'timeout')
                    Tools.notify('Request time out. Try again later.');
                else
                    Tools.notify('Username or Password invalid.');
            });
        }
    }

    checkLoginAttempts = () => {
        let { username, previousUsername, attempts, loginAttempts, appData } = this.state;

        let data = new FormData();
        data.append('username', username);

        if(username != previousUsername)
            this.setState({ attempts: 1, previousUsername: username }) 
        else 
            this.setState({ attempts: attempts + 1, loginAttempts: loginAttempts +1 })
        
        switch (this.state.attempts) {
            case 3:
                Alert.alert('If you accidentally forgot your password, you can still retrieve your account using the Forgot Password below.')
                break;
            case 5:
                fetch(Coronex.APIURL + '/Patients/notify', { 
                    method: 'POST',
                    body: data
                });
                break;
        }

        if(this.state.loginAttempts == 8) {
            var timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

            appData.lockDate = timestamp;
            saveAppData(JSON.stringify(appData));

            this.setState({ appData }, () => {
                Alert.alert('You have been banned from logging in for ' + 
                                this.lockTimeDiff + ' ' + this.timeUnit + 
                                ' due to multiple failed login attempts.');
            });
        } 
    }

    checkLoginStatus = () => {
        let { appData } = this.state;

        if(appData.lockDate == null || appData.lockDate == '')
            return true

        let current = moment(new Date());
        let lockDate = moment(appData.lockDate);

        let diff = current.diff(lockDate, this.timeUnit);

        return diff >= this.lockTimeDiff;
    }

    updateLastSession = (lastSession) => {
        let { appData } = this.state;

        appData.lastSession = lastSession;
        saveAppData(JSON.stringify(appData));
    }

    navigate = (usernew) => {
        if (usernew == 1) {
            this.props.navigation.replace('Settings')

            Tools.notify('For security purposes, we suggest changing your password immediately.')
        }
        else 
            this.props.navigation.replace('Home')
    }

    render() {
        return(
            <SafeAreaView style={styles.safe_area_view}>
                <KeyboardAvoidingView style={styles.main_container} behavior="padding">

                    {
                        (this.state.loginLoad) ?
                            <Indicator.BarIndicator 
                                style={styles.indicator} 
                                color="#ffcb80" /> : null
                    }

                    {
                        (this.state.contentLoad) ?
                            <Indicator.BarIndicator 
                                style={styles.indicator} 
                                color="#ffcb80" /> : null
                    }

                    <View style={styles.content_container}>
                        <Animated.Image 
                            style={[styles.logo, { height: this.imageHeight }]}
                            source={require('../assets/img/orange_logo.png')} 
                            resizeMode="contain"/>
                        <View style={styles.input_container}>
                            <UserInput
                                ref="username"
                                label="Username"
                                autoCapitalize="characters"
                                returnKeyType="next"
                                onChangeText={(username) => this.setState({ username })} />
                            <UserInput
                                ref="password"
                                label="Password"
                                password
                                returnKeyType="done"
                                onChangeText={(password) => this.setState({ password })} />
                            <UserButton 
                                title="LOGIN"
                                onPress={() => this.login()} />
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => this.props.navigation.navigate('Forgot')}>
                                <Text style={styles.extras_text}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Footer />
                </KeyboardAvoidingView>
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
        justifyContent: 'center'
    },
    logo: {
        // marginVertical: 10,
    },
    content_container: {
        width: Screen.width,
        justifyContent: 'center',
        alignItems: 'center',
        // top: -20,
    },
    input_container: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    extras_text: {
        fontSize: RF(2.1),
        fontFamily: Fonts.Roboto
    },
    orange_text: {
        color: '#ffbd5d'
    },
    indicator: {
        zIndex: 5,
        position: 'absolute',
    }
});