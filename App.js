import React, { Component } from 'react';
import { StatusBar, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';  

import Introduction from './pages/Introduction';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import About from './pages/About';
import Forgot from './pages/Forgot';
import Settings from './pages/Settings';
import Help from './pages/Help';
import ChangeEmail from './pages/ChangeEmail';
import ChangePassword from './pages/ChangePassword';
import Module from './pages/Module';
import Survey from './pages/Survey';
import Notifications from './pages/Notifications';
import Questionnaire from './pages/Questionnaire';
import HelpContent from './pages/HelpContent';
import Category from './pages/Category';
import Test from './pages/Test';

import { Coronex } from './assets/utils/Coronex';
import Tools from './assets/utils/Tools';
import BackgroundServices from './assets/utils/BackgroundServices';
import { saveUserData, removeOfflineData, saveNewNotifications } from './assets/utils/Storage';
import { StackActions, NavigationActions } from 'react-navigation';

const logout = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params: { logout: true } })],
});

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timer: null,
            id: 0,
            api_key: '',
            username: '',
            savedUserData: null,
            batch_status: true,
            isDeactivated: false,
        }
    }

    componentDidMount() {
        StatusBar.setHidden(true);

        BackgroundServices.configure();

        let timer = setInterval(this.actions, 10000);
        this.setState({ timer });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    actions = () => {
        this.getUserData();
        this.checkOffData();
    }
    
    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let parseData = JSON.parse(data);

            let id = parseData.id;
            let username = parseData.patientID;
            let api_key = parseData.api_key;

            this.setState({ id, username, api_key, savedUserData: parseData })
        } catch(error) {
            console.log(error)
        }
    }

    async checkOffData() {
        try {
            let batch = await AsyncStorage.getItem('CORONA_OFFDATA');
            let parseBatch = (batch != "" && batch != null) ? JSON.parse(batch) : [];

            if(parseBatch.length != 0)
                this.sendBatch(batch);
            else {
                this.setState({ batch_status: false })
                this.getOthers();
            }

        } catch(err) {
            console.log(err)
        }
    }

    sendBatch = (batch) => {
        var data = new FormData();
        data.append('batch', batch);

        Tools.fetch(Coronex.APIURL + '/Patients/batch', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(responseJson => {
            if(responseJson.success) {
                this.setState({ batch_status: false })

                Tools.pushNotif([{
                    title: 'Offline Backlogs sent!', 
                    message: 'Your offline logs have been sent to your doctor!'
                }])
                
                removeOfflineData();
            }
        })
        .catch(function(err) {
            console.log(err)
        });
    }

    getOthers = () => {
        let { id, username, api_key } = this.state;

        var data = new FormData();
        data.append('user_id', id);
        data.append('username', username);
        data.append('api_key', api_key);

        fetch(Coronex.APIURL + '/Patients/others', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(responseJson => {
            if(responseJson.success) 
                this.manageOthers(responseJson.others);
        })
        .catch(function(err) {
            console.log(err)
        });
    }

    manageOthers = (others) => {
        let { savedUserData } = this.state;
        let status = others.status;

        if (status == 'Deactivated') {
            removeUserData();
            saveDataIsLoggedIn('false');
            
            if(!isDeactivated) {
                Alert.alert(
                    'Your account has been deactivated.', '',
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
                );

                this.setState({ isDeactivated: true })
            }
        }

        let currentNotif = savedUserData.others.notifications;
        let newNotif = others.notifications;

        let checkNotifs = Tools.compare(currentNotif, newNotif);

        others.notifications = checkNotifs.current;

        savedUserData.others = others;
        saveUserData(JSON.stringify(savedUserData));

        this.setState({ savedUserData });

        if(checkNotifs.added.length > 0) {
            saveNewNotifications(JSON.stringify(checkNotifs.added))
        }

        Tools.pushNotif(checkNotifs.added)
    }

    render() {
        return (
            <StackItems />
        );
    }
}

const headerV = { headerVisible: false }

const StackItems = StackNavigator({
    Introduction: { 
        screen: Introduction,
        navigationOptions: headerV
    },
    Login: { 
        screen: Login,
        navigationOptions: headerV
    },
    Home: { 
        screen: Home,
        navigationOptions: headerV
    },
    Profile: { 
        screen: Profile,
        navigationOptions: headerV
    },
    About: { 
        screen: About,
        navigationOptions: headerV
    },
    Contacts: { 
        screen: Contacts,
        navigationOptions: headerV
    },
    Forgot: { 
        screen: Forgot,
        navigationOptions: headerV
    },
    Settings: { 
        screen: Settings,
        navigationOptions: headerV
    },
    Help: { 
        screen: Help,
        navigationOptions: headerV
    },
    ChangeEmail: { 
        screen: ChangeEmail,
        navigationOptions: headerV
    },
    ChangePassword: { 
        screen: ChangePassword,
        navigationOptions: headerV
    },
    Module: { 
        screen: Module,
        navigationOptions: headerV
    },
    Survey: { 
        screen: Survey,
        navigationOptions: headerV
    },
    Notifications: { 
        screen: Notifications,
        navigationOptions: headerV
    },
    Questionnaire: { 
        screen: Questionnaire,
        navigationOptions: headerV
    },
    HelpContent: { 
        screen: HelpContent,
        navigationOptions: headerV
    },
    Category: { 
        screen: Category,
        navigationOptions: headerV
    }
},
{
    headerVisible: false,
    headerMode: 'none',
})