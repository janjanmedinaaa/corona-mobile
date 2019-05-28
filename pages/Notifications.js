import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, Alert } from 'react-native';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import Drawer from 'react-native-circle-drawer';
import { StackActions, NavigationActions } from 'react-navigation';

import Menu from '../components/Menu';
import { Main, TopRight } from '../components/SideMenu';
import NotifModule from '../components/NotifModule';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import { saveDataIsLoggedIn, removeNewNotifications } from '../assets/utils/Storage';
import { saveUserData, resetCoursesCP, removeOfflineData } from '../assets/utils/Storage';

const logout = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params: { logout: true } })],
});

export default class Notifications extends Component {
    constructor() {
        super()

        this.state = {
            timer: null,
            modules: [],
            notifs: null, 
            image: null,
            notifBadge: 0,
        }
    }

    componentDidMount() {
        this.getUserData();
        removeNewNotifications();

        let timer = setInterval(this.actions, 2000);
        this.setState({ timer });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    actions = () => {
        this.getUserData();
    }

    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let parseData = JSON.parse(data);

            let notifs = parseData.others.notifications;
            let image = parseData.image;

            this.setState({ notifs, image }, () => {
                this.displayNotif();
            })

        } catch(error) {
            console.log(error + "")
        }
    }

    displayNotif = () => {
        let modules = [];
        let { notifs } = this.state;

        notifs = notifs.reverse();

        for(var a = 0; a < notifs.length; a++) {
            modules.push(
                <NotifModule 
                    key={a}
                    source={notifs[a].doctor.image}
                    sender={notifs[a].doctor.name}
                    title={notifs[a].title}
                    message={notifs[a].message}
                    timestamp={notifs[a].timestamp} />
            )
        }

        this.setState({ modules })
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
                notificationsPress={() => this.refs.DRAWER.close()}
                aboutPress={() => this.goToPage('About')}
                settingsPress={() => this.goToPage('Settings')}
                logoutPress={() => this.goToPage('Login')} 
                notificationsBadge={this.state.notifBadge} />  
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

                        <Text style={styles.courses_title}>NOTIFICATIONS</Text>

                        <ScrollView 
                            style={styles.scrollview_container} 
                            contentContainerStyle={[styles.scrollview_content]}
                            bounces={false}>

                            {this.state.modules.map((value, index) => {
                                return value
                            })}

                        </ScrollView>
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
    scrollview_container: {
        position: 'absolute', 
        top: 60,
        bottom: 0,
    },
    scrollview_content: {
        width: Screen.width,
        alignItems: 'center',
        paddingBottom: 12.5,
        // backgroundColor: '#faf'
    },
})