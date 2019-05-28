import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { SafeAreaView, KeyboardAvoidingView, Animated, Keyboard } from 'react-native';
import Modal from 'react-native-modal';

import UserInput from '../components/UserInput';
import UserButton from '../components/UserButton';
import Menu from '../components/Menu';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import Tools from '../assets/utils/Tools';

import RF from 'react-native-responsive-fontsize';

import * as Indicator from 'react-native-indicators';

const IMAGE_HEIGHT = Screen.width / 3;
const IMAGE_HEIGHT_SMALL = Screen.width / 5;

export default class ChangeEmail extends Component {
    constructor() {
        super()

        this.state = {
            id: 0,
            username: '',
            cEmail: '',
            nEmail: '',
            password: '',
            api_key: '',
            verifyload: false,
            submitload: false,
            showModal: false,
            code: ''
        }
    
        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }


    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentDidMount() {
        this.getUserData();
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

    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let parseData = JSON.parse(data);

            let id = parseData.id;
            let username = parseData.patientID;
            let api_key = parseData.api_key;

            this.setState({ id, username, api_key })
        } catch(error) {
            console.log(error + "")
        }
    }

    submit = () => {
        let { cEmail, nEmail, password, id, username, api_key } = this.state

        let currentValidate = Tools.validate('Current Email', cEmail, 'email');
        let newValidate = Tools.validate('New Email', nEmail, 'email');

        if(!currentValidate.status) {
            this.refs.current_email.change()
            
            if(currentValidate.message != "")
                Tools.notify(currentValidate.message)
        } else if(!newValidate.status) {
            this.refs.new_email.change()

            if(newValidate.message != "")
                Tools.notify(newValidate.message)
        } else if(password == '') {
            this.refs.password.change()
            Tools.notify('Password required!')
        }

        var data = new FormData();
        data.append('user_id', id);
        data.append('username', username);
        data.append('oldemail', cEmail);
        data.append('newemail', nEmail);
        data.append('password', password);
        data.append('api_key', api_key);

        if(currentValidate.status && newValidate.status && password != '') {
            this.setState({ submitload: true })
            
            Tools.fetch(Coronex.APIURL + '/Patients/changeemail', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ submitload: false })

                if(responseJson.success)
                    this.setState({ showModal: true })
                else 
                    Tools.notify(responseJson.data)
            })
            .catch(err => {
                this.setState({ submitload: false })
                
                err += '';

                if(err == 'timeout')
                    Tools.notify('Request time out. Try again later.');
                else
                    Tools.notify(err);
            });
        }
    }

    verify = () => {
        var { username, cEmail, code, nEmail } = this.state;

        var data = new FormData();
        data.append('username', username);
        data.append('email', cEmail);
        data.append('newemail', nEmail);
        data.append('code', code);

        if(code == ''){
            Tools.notify('Verification Code Required!');
            this.refs.code.change();
        }
        else {
            this.setState({ verifyload: true })

            fetch(Coronex.APIURL + '/Patients/changeemailvalidation', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ verifyload: false })

                if(responseJson.success) {
                    this.setState({ showModal: false }, () => {
                        this.props.navigation.replace('Settings', { 
                            changeEmail: 'Change Email Successful!' 
                        })
                        return true;
                    })
                } else {
                    Tools.notify(responseJson.data);
                }
            })
            .catch(err => {
                this.setState({ verifyload: false })
                
                err += '';

                if(err == 'timeout')
                    Tools.notify('Request time out. Try again later.');
                else
                    Tools.notify(err);
            });
        }
    }

    clear = () => {
        this.setState({ cEmail: '', nEmail: '', password: '' })
        this.refs.current_email.clear()
        this.refs.new_email.clear()
        this.refs.password.clear()
    }

    toggleModal() {
        this.setState({ showModal: false });
    }

    render() {
        return(
            <SafeAreaView style={styles.safe_area_view}>
                <KeyboardAvoidingView style={styles.main_container} behavior="padding">
                    <Menu 
                        color="#000" 
                        name="ios-arrow-round-back" 
                        onPress={() => this.props.navigation.goBack()}/>

                    {      
                        (this.state.submitload) ?
                            <Indicator.BarIndicator 
                                style={styles.indicator} 
                                color="#ffcb80" /> : null
                    }

                    {
                        (this.state.verifyload) ?
                            <Indicator.BarIndicator 
                                style={styles.verify_indicator} 
                                color="#ffcb80" /> : null
                    }

                    <Modal 
                        isVisible={this.state.showModal}
                        onBackButtonPress={() => this.toggleModal()}>
                        
                        <View style={styles.modal}>

                            <UserInput
                                ref="code"
                                label="Verification Code"
                                labelStyle={styles.verify_label}
                                keyboardType="number-pad"
                                onChangeText={(code) => this.setState({ code })} />

                            <UserButton 
                                title="VERIFY"
                                onPress={() => this.verify()} />

                            <Text style={styles.note}>Kindly check your email for the verification code.</Text>
                        </View>

                    </Modal>

                    <View style={styles.content_container}> 

                        <Animated.Image 
                            style={[styles.logo, { height: this.imageHeight }]}
                            source={require('../assets/img/change_email.png')} 
                            resizeMode="contain"/>

                        <UserInput
                            ref="current_email"
                            label="Enter Current Email"
                            returnKeyType="next"
                            onChangeText={(cEmail) => this.setState({ cEmail })} />

                        <UserInput
                            ref="new_email"
                            label="Enter New Email"
                            returnKeyType="next"
                            onChangeText={(nEmail) => this.setState({ nEmail })} />

                        <UserInput
                            ref="password"
                            label="Enter Password"
                            returnKeyType="done" 
                            password
                            onChangeText={(password) => this.setState({ password })} />

                        <UserButton 
                            title="SUBMIT"
                            onPress={() => this.submit()} />

                        <TouchableOpacity onPress={() => this.clear()}>
                            <Text style={[styles.orange_text, styles.extras_text]}>Clear</Text>
                        </TouchableOpacity>
                        
                        { (this.state.showModal) ? <View style={styles.white_overlay}/> : null }
                    </View>
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
    content_container: {
        width: Screen.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        margin: 20,
    },
    extras_text: {
        fontSize: RF(2.4),
        fontFamily: Fonts.Roboto
    },
    orange_text: {
        color: '#ffbd5d'
    },
    indicator: {
        zIndex: 5,
        position: 'absolute',
    },
    verify_indicator: {
        zIndex: 50,
        position: 'absolute',
    },
    modal: {
        // backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 8,
        textAlign: 'center',
    },
    verify_label: {
        color: '#fff'
    },  
    note: {
        color: '#fff',
        textAlign: 'center',
        margin: 20,
        fontFamily: Fonts.RobotoLight
    },
    white_overlay: {
        position: 'absolute',
        width: Screen.width,
        height: Screen.height,
        backgroundColor: '#fff',
        zIndex: 4
    }
});