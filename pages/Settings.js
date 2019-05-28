import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, SafeAreaView, Alert, Linking } from 'react-native';
import Drawer from 'react-native-circle-drawer';
import RF from 'react-native-responsive-fontsize';
import { StackActions, NavigationActions } from 'react-navigation';

import Menu from '../components/Menu';
import SettingModule from '../components/SettingModule';
import { Main, TopRight } from '../components/SideMenu';

import { Fonts } from '../assets/utils/Fonts';
import Tools from '../assets/utils/Tools';
import { saveUserData, resetCoursesCP, removeOfflineData, saveDataIsLoggedIn } from '../assets/utils/Storage';

const logout = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params: { logout: true } })],
});

export default class Settings extends Component {
    constructor() {
        super()

        this.state = {
            image: '',
            notifBadge: 0,
            timer: null
        }
    }

    componentDidMount() {
        let changeEmail = this.props.navigation.getParam('changeEmail', '');

        if(changeEmail != '')
            setTimeout(() => Tools.notify(changeEmail), 500);

        this.getUserData();
        this.getContent();

        let timer = setInterval(this.actions, 5000);
        this.setState({ timer });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    actions = () => {
        this.getContent();
    }

    openDrawer(){
        this.refs.DRAWER.open()
    }
    
    renderSideMenu(){
        return( 
            <Main 
                profilePress={() => this.goToPage('Profile')}
                contentsPress={() => this.goToPage('Home')}
                surveyPress={() => this.goToPage('Survey')} 
                contactsPress={() => this.goToPage('Contacts')}
                notificationsPress={() => this.goToPage('Notifications')}
                aboutPress={() => this.goToPage('About')}
                settingsPress={() => this.refs.DRAWER.close()}
                logoutPress={() => this.goToPage('Login')} 
                notificationsBadge={this.state.notifBadge} />  
        );
    }
    
    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let parseData = JSON.parse(data);

            let image = parseData.image;

            this.setState({ image })
        } catch(error) {
            console.log(error)
        }
    }

    async getContent() {
        try {
            let newNotif = await AsyncStorage.getItem('CORONA_NEWNOTIFICATIONS');

            let parseNewNotif = (newNotif != null && newNotif != "") ? JSON.parse(newNotif) : [];

            this.setState({ notifBadge: parseNewNotif.length })

        } catch (error) {
            console.log(error)
        }
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

    linking() {
        let url = 'https://www.termsfeed.com/privacy-policy/b17598d55febebada83f775269593486?fbclid=IwAR3fr-MBelwEQDZJmDzPOKZNyjyBNpbh09AYbFEaB3uZuCRz26lIYJGmXmA';
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));  
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
        return(
            <SafeAreaView style={styles.safe_area_view}>
                <Drawer 
                    ref="DRAWER"
                    sideMenu={this.renderSideMenu()}
                    topRightView={this.renderTopRightView()}
                    primaryColor="#fab76c"
                    secondaryColor="#ffcb80"
                    cancelColor="#fab76c">

                    <View style={styles.main_container}>
                        <Menu 
                            color="#000"
                            onPress={() => this.openDrawer()}/>

                        <Text style={styles.courses_title}>SETTINGS</Text>

                        <SettingModule 
                            topic="Change Email Address"
                            description="Use your most active email address for us to contact you easily."
                            onPress={() => this.props.navigation.navigate('ChangeEmail')}/>
                            
                        <SettingModule 
                            topic="Change Password"
                            description="Remember to create a strong password to keep your account safe."
                            onPress={() => this.props.navigation.navigate('ChangePassword', { forgot: false })}/>

                        <SettingModule 
                            topic="Help"
                            description="Read our user manual."
                            onPress={() => this.props.navigation.navigate('Help')}/>
                            
                        <SettingModule 
                            topic="Privacy Policy"
                            description="Read about our Terms and Conditions"
                            onPress={() => this.linking()}/>
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
    },
    courses_title: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(3.5),
        margin: 20,
        color: '#ffcb80',
    }
})