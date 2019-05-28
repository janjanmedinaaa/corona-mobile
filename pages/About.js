import React, { Component } from 'react';
import { AsyncStorage, Image, SafeAreaView } from 'react-native';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Drawer from 'react-native-circle-drawer';
import RF from 'react-native-responsive-fontsize';
import { StackActions, NavigationActions } from 'react-navigation';

import Menu from '../components/Menu';
import { Main, TopRight } from '../components/SideMenu';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { saveUserData, resetCoursesCP, removeOfflineData, saveDataIsLoggedIn } from '../assets/utils/Storage';

const logout = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params: { logout: true } })],
});

export default class About extends Component {
    constructor() {
        super()

        this.state = {
            image: '',
            notifBadge: 0,
            timer: null
        }
    }

    componentDidMount() {
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
                aboutPress={() => this.refs.DRAWER.close()}
                settingsPress={() => this.goToPage('Settings')}
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
                        <Menu color="#000" onPress={() => this.openDrawer()}/>

                        <Text style={styles.courses_title}>ABOUT</Text>

                        <Image 
                            style={styles.about_icon}
                            source={require('../assets/img/patient.png')}
                            resizeMode="contain" />
                        
                        <Text style={styles.content_text}>
                            This mobile application, 

                            <Text style={styles.orange_text}> CORONA or Cancer: On-the-go Reading Online Application </Text>

                            is developed by students of University of Santo Tomas, Institute of Information and 
                            Computing Sciences Information in partnership with UST Hospital and Benavides Cancer 
                            Institute. This is a project of BCI under ESCORT: Empowerment and Support for Coping 
                            with Radiotherapy program for the patients of cancer. This aims to provide 
                            instructional tools before radiation therapy and lessen the overall stress brought 
                            about by cancer and along with its treatments.
                        </Text>
                        <Image 
                            style={styles.sponsor_icon}
                            source={require('../assets/img/logo.png')}
                            resizeMode="contain" />

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
        marginBottom: 10,
        color: '#ffcb80',
    },
    about_icon: {
        width: Screen.width / 1.6,
        height: Screen.width / 1.6,
        // backgroundColor: '#afa'
    },
    sponsor_icon: {
        position: 'absolute',
        width: Screen.width / 1.9,
        alignSelf: 'center',
        bottom: 0,
        // backgroundColor: '#faa',
        height: (Screen.width / 1.9) / 3,
        margin: 10,
    },
    content_text: {
        fontFamily: Fonts.Roboto,
        // backgroundColor: '#aac',
        width: Screen.width,
        fontSize: RF(2.1),
        paddingLeft: Screen.width * 0.12,
        paddingRight: Screen.width * 0.12,
        letterSpacing: 1,
        textAlign: 'center',
        color: '#000'
    },
    orange_text: {
        color: '#fab76c'
    }
})