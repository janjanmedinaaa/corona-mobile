import React, { Component } from 'react';
import { Image, SafeAreaView, Alert, ScrollView } from 'react-native';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import Drawer from 'react-native-circle-drawer';
import RF from 'react-native-responsive-fontsize';
import { StackActions, NavigationActions } from 'react-navigation';

import Menu from '../components/Menu';
import { Main, TopRight } from '../components/SideMenu';
import CircleOverlay from '../components/CircleOverlay';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';

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
            parseData: {},
            assignedDoctors: [],
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
                aboutPress={() => this.goToPage('About')}
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

            console.log(parseData.patientID)

            this.setState({ image, parseData }, () => {
                this.getDoctors();
            })
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

    getDoctors = () => {
        let assignedDoctors = [];
        let { parseData } = this.state;

        for(var a = 0; a < parseData.doctors.length; a++) {
            assignedDoctors.push(
                <Text key={a} style={styles.inner_text}>
                    Dr. {parseData.doctors[a].firstname} {parseData.doctors[a].lastname}
                </Text>
            )
        }

        this.setState({ assignedDoctors })
    }
    
    renderTopRightView(){
        return( <TopRight 
                    image={this.state.image} 
                    profilePress={() => this.refs.DRAWER.close()} /> );
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
                saveDataIsLoggedIn("false")

                this.props.navigation.dispatch(logout)
                return true
            })
            .catch((error) => {
                this.logout();
            })
    }

    render() {
        let { parseData, assignedDoctors } = this.state;

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
                        <Menu color="#fff" onPress={() => this.openDrawer()}/>

                        <CircleOverlay 
                            style={styles.circle_overlay}
                            size={Screen.width*2}
                            source={require('../assets/img/home_family.png')} 
                            resizeMode="cover"
                            opacity={0.9}
                            color="#fab76c"/>

                        <View style={styles.image_container}>
                            <Image 
                                style={styles.image}
                                source={{uri: Coronex.IMAGEURL + this.state.image}}
                                resizeMode="cover" />
                        </View>
                        
                        <Text style={styles.username}>{parseData.patientID}</Text>
                        <Text style={styles.name}>{parseData.firstName} {parseData.lastName}</Text>
                        <View style={styles.line_divider} />

                        <ScrollView style={styles.scrollview} bounces={false}>
                            <Text style={[styles.username]}>Personal Information</Text>
                            <View style={styles.inner_container}>
                                <Text style={styles.inner_title}>Email Address</Text>
                                <Text style={styles.inner_text}>{parseData.email}</Text>
                                <Text style={styles.inner_title}>Contact Number</Text>
                                <Text style={styles.inner_text}>{parseData.number}</Text>
                            </View>
                            <Text style={[styles.username]}>Assigned Doctors</Text>
                            <View style={[styles.inner_container, { marginBottom: 60 }]}>

                                {assignedDoctors.map((value, index) => {
                                    return value
                                })}
                                
                            </View>
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
    circle_overlay:{
        position: 'absolute',
        top: 0 - (Screen.width*1.6),
        left: 0 - (Screen.width/2),
        zIndex: 1,
    },
    image_container: {
        width: Screen.width / 3,
        height: Screen.width / 3,
        backgroundColor: '#fff',
        borderRadius: (Screen.width / 3) / 2,
        zIndex: 2,
        borderWidth: 4,
        borderColor: '#fff',
        marginTop: Screen.width / 5,
        marginBottom: 10,
        overflow: 'hidden'
    },
    image: {
        width: Screen.width / 3,
        height: Screen.width / 3,
        borderRadius: (Screen.width / 3) / 2,
    },
    username: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(3.5)
    },
    name: {
        fontFamily: Fonts.RobotoLight,
        fontSize: RF(3)
    },
    line_divider: {
        width: Screen.width / 3,
        height: 4,
        borderRadius: 5,
        backgroundColor: '#fab76c',
        margin: 10
    },
    scrollview: {
        width: Screen.width,
        padding: 30,
        backgroundColor: '#fff'
    },
    inner_container: {
        marginVertical: 10,
        // borderWidth: .5,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#f7f7f7'
    },
    inner_title: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(2.5),
        marginTop: 5
    },
    inner_text: {
        fontFamily: Fonts.Roboto,
        fontSize: RF(2.3)
    }
})