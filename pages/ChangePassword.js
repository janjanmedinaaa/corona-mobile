import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { SafeAreaView, KeyboardAvoidingView, Animated, Keyboard } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";

import UserInput from '../components/UserInput';
import UserButton from '../components/UserButton';
import Menu from '../components/Menu';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import { removeUserData, saveDataIsLoggedIn } from '../assets/utils/Storage';

import Tools from '../assets/utils/Tools';
import RF from 'react-native-responsive-fontsize';

import * as Indicator from 'react-native-indicators';

const IMAGE_HEIGHT = Screen.width / 3;
const IMAGE_HEIGHT_SMALL = Screen.width / 5;

const logout = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params: { logout: true } })],
});

export default class ChangePassword extends Component {
    constructor() {
        super()

        this.state = {
            id: 0,
            username: '',
            oPassword: '',
            nPassword: '',
            cPassword: '',
            api_key: '',
            submitload: false,
            forgot: false,
            showModal: false,
        }

        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
    
    componentDidMount() {
        this.setupForgot();
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

    setupForgot() {
        let params = this.props.navigation.state.params;
        let forgot = params.forgot;

        if(forgot) {
            let oPassword = params.oPassword;
            let username = params.username;
            let id = params.user_id;
            let api_key = params.api_key;

            this.setState({ forgot, oPassword, username, id, api_key })
        } else {
            this.getUserData();
        }
    }

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
        let { id, username, oPassword, nPassword, cPassword, forgot, api_key } = this.state

        let newValidate = Tools.validate('New Password', nPassword, 'password');
        let confirmValidate = Tools.validate('Confirm Password', cPassword, 'password');

        if(oPassword == '') {
            this.refs.old_password.change()

            Tools.notify('Old Password required!')
        } else if(!newValidate.status) {
            this.refs.new_password.change()

            if(newValidate.message != "")
                Tools.notify(newValidate.message)
        } else if(!confirmValidate.status) {
            this.refs.confirm_password.change()
            
            if(confirmValidate.message != "")
                Tools.notify(confirmValidate.message)
        } else if (nPassword != cPassword) {
            Tools.notify('New Password doesn\'t match Confirm Password!')
        }

        var data = new FormData();
        data.append('user_id', id);
        data.append('username', username);
        data.append('oldpass', oPassword);
        data.append('newpass', nPassword);
        data.append('confpass', cPassword);
        data.append('api_key', api_key);

        if(oPassword != '' && newValidate.status && 
            confirmValidate.status && nPassword == cPassword) {
            this.setState({ submitload: true })

            fetch(Coronex.APIURL + '/Patients/changepass', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ submitload: false })

                if(responseJson.success) {

                    if(forgot) {
                        Tools.notify(responseJson.data);

                        this.props.navigation.navigate('Login')
                        return true;
                    } else {
                        saveDataIsLoggedIn("false");
                        Alert.alert(
                            'You\'re required to login your account again for confirmation.', '',
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
                        )
                    }
                } else {
                    Tools.notify(responseJson.data);
                }
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

    logout = () => {
        AsyncStorage.removeItem('CORONA_USERDATA')
            .then((value) => {
                removeUserData();
                saveDataIsLoggedIn("false");

                Alert.alert(
                    'You\'re required to login your account again for confirmation.', '',
                    [{   
                        text: 'OK', 
                        onPress: () => {
                            this.props.navigation.dispatch(logout)
                            return true;
                        }
                    }],
                    { 
                        cancelable: false 
                    }
                )
            })
            .catch((error) => {
                this.logout();
            })
    }

    clear = () => {
        this.setState({ oPassword: '', nPassword: '', cPassword: '' })
        this.refs.old_password.clear()
        this.refs.new_password.clear()
        this.refs.confirm_password.clear()
    }

    toggleModal() {
        this.setState({ showModal: false });
    }

    render() {
        return(
            <SafeAreaView style={styles.safe_area_view}>
                <Modal 
                    isVisible={this.state.showModal}
                    onBackButtonPress={() => this.toggleModal()}
                    onBackdropPress={() => this.toggleModal()}>

                    <View style={styles.modal_container}>
                        <Text style={[styles.modal_title]}>Reminder</Text>
                        <Text style={[styles.modal_text]}>Password should have atleast:</Text>
                        <Text style={[styles.modal_text, styles.option_text]}>1. (1) Uppercase Letter</Text>
                        <Text style={[styles.modal_text, styles.option_text]}>2. (1) Lowercase Letter</Text>
                        <Text style={[styles.modal_text, styles.option_text]}>3. (1) Number</Text>
                        <Text style={[styles.modal_text, styles.option_text]}>4. (1) Special Character</Text>
                    </View>

                </Modal>

                <KeyboardAvoidingView style={styles.main_container} behavior="padding">
                    {
                        (!this.state.forgot || this.state.forgot == undefined) ?

                        <Menu 
                            color="#000" 
                            name="ios-arrow-round-back" 
                            onPress={() => this.props.navigation.goBack()}/> : 

                            null
                    }
                    
                    {
                        (this.state.submitload) ?
                            <Indicator.BarIndicator 
                                style={styles.indicator} 
                                color="#ffcb80" /> : null
                    }

                    <View style={styles.content_container}>

                        <Animated.Image 
                            style={[styles.logo, { height: this.imageHeight }]}
                            source={require('../assets/img/change_pass.png')} 
                            resizeMode="contain"/>

                        
                        <TouchableOpacity 
                            style={styles.menu_icon}
                            activeOpacity={0.7}
                            onPress={() => this.setState({ showModal: true })}>
                            <Icon 
                                name='questioncircleo'
                                size={24} 
                                color='#5B5555' />
                        </TouchableOpacity>

                        {
                            (!this.state.forgot || this.state.forgot == undefined) ?

                            <UserInput
                                ref="old_password"
                                label="Enter Old Password"
                                returnKeyType="next"
                                password
                                onChangeText={(oPassword) => this.setState({ oPassword })} /> : 

                                null
                        }

                        <UserInput
                            ref="new_password"
                            label="Enter New Password"
                            returnKeyType="next"
                            password
                            onChangeText={(nPassword) => this.setState({ nPassword })} />

                        <UserInput
                            ref="confirm_password"
                            label="Confirm Password"
                            returnKeyType="done"
                            password
                            onChangeText={(cPassword) => this.setState({ cPassword })} />

                        <UserButton 
                            title="SUBMIT"
                            onPress={() => this.submit()} />

                        <TouchableOpacity onPress={() => this.clear()}>
                            <Text style={[styles.orange_text, styles.extras_text]}>Clear</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1, 
        backgroundColor: '#fff',
    },
    main_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal_container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 15,
        textAlign: 'center'
    },
    modal_title: {
        fontSize: RF(3),
        fontFamily: Fonts.RobotoBold,
        alignSelf: 'center',
        margin: 5,
        marginTop: 0,
    },
    modal_text: {
        fontSize: RF(2.4),
        fontFamily: Fonts.RobotoLight
    },
    option_text: {
        marginHorizontal: 7,
        marginVertical: 2
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
    menu_icon: {
        top: 10,
        right: 50,
        width: 24,
        height: 24,
        zIndex: 10,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
});