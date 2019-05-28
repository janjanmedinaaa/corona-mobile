import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { AsyncStorage, Alert, SafeAreaView } from 'react-native';
import Drawer from 'react-native-circle-drawer';
import RF from 'react-native-responsive-fontsize';
import { StackActions, NavigationActions } from 'react-navigation';

import Menu from '../components/Menu';
import SettingModule from '../components/SettingModule';
import { Main, TopRight } from '../components/SideMenu';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import { saveUserData, resetCoursesCP, removeOfflineData, saveDataIsLoggedIn } from '../assets/utils/Storage';
import Tools from '../assets/utils/Tools';
import Available from '../assets/utils/Available';

const logout = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params: { logout: true } })],
});

export default class Survey extends Component {
    constructor() {
        super()

        this.state = {
            modules: [],
            surveys: [],
            disabledSurveys: [],
            refreshing: false,
            image: '',
            timer: null,
            notifBadge: 0,
        }
    }

    componentDidMount() {
        this.getUserData();
        this.getContent();

        let timer = setInterval(this.actions, 2000);
        this.setState({ timer });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    actions = () => {
        this.getContent();
    }

    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let parseData = JSON.parse(data);

            let image = parseData.image;

            this.setState({ image })
        } catch(error) {
            console.log(error + "")
        }
    }

    async getContent() {
        try {
            let data = await AsyncStorage.getItem('CORONA_CONTENTS');
            let newNotif = await AsyncStorage.getItem('CORONA_NEWNOTIFICATIONS');

            let parseData = JSON.parse(data);
            let parseNewNotif = (newNotif != null && newNotif != "") ? JSON.parse(newNotif) : [];

            let surveys = parseData.surveys;

            this.setState({ surveys, notifBadge: parseNewNotif.length }, () => {
                this.getDisableSurveys();
            })

        } catch (error) {
            console.log(error)
        }
    }

    async getDisableSurveys() {
        try {
            let { surveys } = this.state;
            let disabledSurveys = [];
 
            for(var i in surveys) {
                let open = await Available.survey(i, surveys[i].short + ' Weekly', 'Weekly');
                disabledSurveys.push(open);
            }

            this.setState({ disabledSurveys }, () => {
                this.displayData();
            });
        } catch(err) {
            console.log(err)
        }
    }

    getQuestions = (a) => {
        let { disabledSurveys } = this.state;

        if(disabledSurveys[a]) {
            Tools.notify('Weekly Survey not available!')
        } else {
            this.props.navigation.navigate('Questionnaire', {id : a});
            return true
        }
    }

    displayData() {
        let modules = [];
        
        for(var a = 0; a < this.state.surveys.length; a++) {
            modules.push(
                <SettingModule 
                    key={a}
                    disabled={this.state.disabledSurveys[a]}
                    onPress={this.getQuestions.bind(this, a)}
                    topic={this.state.surveys[a].name + ' (' + this.state.surveys[a].short + ')'}/>
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
                surveyPress={() => this.refs.DRAWER.close()} 
                contactsPress={() => this.goToPage('Contacts')}
                notificationsPress={() => this.goToPage('Notifications')}
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

                        <Text style={styles.courses_title}>SURVEYS</Text>

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
    },
})