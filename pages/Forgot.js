import React, { Component } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { Animated, Text, Alert, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';

import UserInput from '../components/UserInput';
import UserButton from '../components/UserButton';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import Tools from '../assets/utils/Tools';

import RF from 'react-native-responsive-fontsize';

import * as Indicator from 'react-native-indicators';

export default class Forgot extends Component {
    constructor() {
        super();

        this.state = {
            proceed: true,
            username: '',
            email: '',
            code: '',
            submitload: false,
            verifyload: false,
            showModal: false,
        }

        this.unameIndicator = new Animated.Value(0);
        this.proceedAnimate = new Animated.Value(this.state.proceed ? 50 : -Screen.width * 2);
        this.submitAnimate = new Animated.Value(this.state.proceed ? Screen.width * 2 : 50);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    handleBackPress = () => {
        if(!this.state.proceed) {
            this.proceed(); 
        } else {
            this.props.navigation.goBack()
        }

        return true
    }


    handlerOnFulfill = code => Alert.alert(code);

    proceed = () => {
        var { username } = this.state;

        if(username == '')
            this.refs.username.change();
        else {
            Animated.parallel([
                Animated.timing(this.unameIndicator, {
                    toValue: 150,
                    duration: 300,
                }),
                
                Animated.timing(this.proceedAnimate, {
                    toValue: this.state.proceed ? -Screen.width * 2 : 50,
                    duration: 300,
                }),
    
                Animated.timing(this.submitAnimate, {
                    toValue: this.state.proceed ? 50 : Screen.width * 2,
                    duration: 300,
                })
            ]).start();
    
            this.setState({ proceed: !this.state.proceed })
        }
    }

    submit = () => {
        var { username, email } = this.state;

        var data = new FormData();
        data.append('username', username);
        data.append('email', email);

        if(email == '')
            this.refs.email.change();
        else {
            this.setState({ submitload: true })

            fetch(Coronex.APIURL + '/Patients/forgotpass', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ submitload: false })

                if(responseJson.success) {
                    this.setState({ showModal: true })
                } else {
                    Alert.alert(responseJson.data)
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

    verify = () => {
        var { username, email, code } = this.state;

        var data = new FormData();
        data.append('code', code);
        data.append('username', username);
        data.append('email', email);

        if(code == '') {
            Tools.notify('Verification Code Required!');
            this.refs.code.change();
        }
        else {
            this.setState({ verifyload: true })

            fetch(Coronex.APIURL + '/Patients/forgotvalidation', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ verifyload: false })

                if(responseJson.success) {
                    this.setState({ showModal: false })

                    this.props.navigation.replace('ChangePassword', {
                        forgot: true,
                        oPassword: responseJson.data.code,
                        username: responseJson.data.username,
                        user_id: responseJson.data.user_id,
                        api_key: responseJson.data.api_key,
                    })

                    return true;
                } else {
                    Tools.notify(responseJson.data)
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

    goHome() {
        this.props.navigation.replace('Login')
        return true;
    }

    toggleModal() {
        this.setState({ showModal: false });
    }

    render() {
        const proceedLeft = {
            left: this.proceedAnimate
        }

        const submitLeft = {
            left: this.submitAnimate
        }

        return(
            <SafeAreaView style={styles.safe_area_view}>
                <View style={styles.main_container}>
                    <Menu 
                        color="#000" 
                        name="ios-arrow-round-back" 
                        onPress={() => this.handleBackPress()}/>
                        
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

                        <UserInput
                            ref="username"
                            label="Username"
                            autoCapitalize="characters"
                            animateContainer={[proceedLeft, styles.user_input]}
                            onChangeText={(username) => this.setState({ username })} />

                        <UserButton 
                            title="PROCEED"
                            animateContainer={[proceedLeft, styles.proceed_button]}
                            onPress={() => this.proceed()} />

                        <UserInput
                            ref="email"
                            label="Email"
                            animateContainer={[submitLeft, styles.user_input]}
                            onChangeText={(email) => this.setState({ email })} />

                        <UserButton 
                            title="SUBMIT"
                            animateContainer={[submitLeft, styles.proceed_button]}
                            onPress={() => this.submit()} />

                        { (this.state.showModal) ? <View style={styles.white_overlay}/> : null }

                        <Footer />
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
    modal: {
        // backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 8,
        textAlign: 'center',
    },
    content_container: {
        position: 'absolute',
        bottom: 0,
        width: Screen.width,
        height: Screen.height - (Screen.height / 2.5),
        alignSelf: 'flex-end',
        alignItems: 'center', 
    },
    user_input: {
        position: 'absolute',
    },
    proceed_button: {
        position: 'absolute',
        top: 70
    },
    submit_button: {
        position: 'absolute',
        top: 140
    },
    extras_text: {
        fontSize: RF(2.1),
        fontFamily: Fonts.Roboto
    },
    orange_text: {
        color: '#ffbd5d'
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
    indicator: {
        zIndex: 5,
        position: 'absolute',
    },
    verify_indicator: {
        zIndex: 50,
        position: 'absolute',
    },
    white_overlay: {
        position: 'absolute',
        width: Screen.width,
        height: Screen.height / 2.5,
        backgroundColor: '#fff',
        zIndex: 4
    }
});