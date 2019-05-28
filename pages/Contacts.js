import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ToastAndroid, AsyncStorage, SafeAreaView, Alert } from 'react-native';
import Drawer from 'react-native-circle-drawer';
import RF from 'react-native-responsive-fontsize';
import Modal from "react-native-modal";
import { StackActions, NavigationActions } from 'react-navigation';

import Menu from '../components/Menu';
import { Main, TopRight } from '../components/SideMenu';
import ContactModule from '../components/ContactModule';
import ModalContent from '../components/ModalContent';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';
import { saveUserData, resetCoursesCP } from '../assets/utils/Storage';
import { removeOfflineData, saveDataIsLoggedIn } from '../assets/utils/Storage';

const logout = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params: { logout: true } })],
});

export default class Contacts extends Component {
    constructor() {
        super()

        this.state = {
            modules: [],
            numbers: [],
            contacts: [],
            showModal: false,
            refreshing: false,
            hospital: '',
            image: '',
            notifBadge: 0,
            timer: null
        }
    }

    componentDidMount() {
        this.getContent();
        this.getUserData();

        let timer = setInterval(this.actions, 5000);
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
            console.log(error)
        }
    }

    async getContent() {
        try {
            let data = await AsyncStorage.getItem('CORONA_CONTENTS');
            let newNotif = await AsyncStorage.getItem('CORONA_NEWNOTIFICATIONS');

            let parseData = JSON.parse(data);
            let parseNewNotif = (newNotif != null && newNotif != "") ? JSON.parse(newNotif) : [];

            let contacts = parseData.emergency;

            this.setState({ contacts, notifBadge: parseNewNotif.length }, () => {
                this.displayData();
            })

        } catch (error) {
            ToastAndroid.show(error + "", ToastAndroid.SHORT)
        }
    }

    displayData() {
        let modules = [];
        for(var a = 0; a < this.state.contacts.length; a++) {

            modules.push(
                <ContactModule 
                    key={a}
                    hospital={this.state.contacts[a].name}
                    direct={this.state.contacts[a].direct}
                    local={this.state.contacts[a].local}
                    contacts={this.state.contacts[a].contacts}
                    onPress={this.call.bind(this,a)}/>
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
                contactsPress={() => this.refs.DRAWER.close()}
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

    call(id) {
        let numbers = [];

        this.setState({ numbers: [] }, () => {

            if(this.state.contacts[id].local != null) 
                numbers.push(this.state.contacts[id].local)

            
            if(this.state.contacts[id].direct != null) 
                numbers.push(this.state.contacts[id].direct)

            if(this.state.contacts[id].contacts != null) {
                for(var a = 0; a < this.state.contacts[id].contacts.length; a++) {
                    numbers.push(this.state.contacts[id].contacts[a].number)
                }
            }

            this.setState({  
                numbers,
                showModal: true, 
                hospital: this.state.contacts[id].name
            });

        });
    }

    toggleModal() {
        this.setState({ showModal: false });
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

                    <Modal 
                        isVisible={this.state.showModal}
                        onBackButtonPress={() => this.toggleModal()}
                        onBackdropPress={() => this.toggleModal()}>

                        <ModalContent 
                            hospital={this.state.hospital}
                            numbers={this.state.numbers} />

                    </Modal>

                    <View style={styles.main_container}>
                        <Menu color="#000" onPress={() => this.openDrawer()}/>

                        <Text style={styles.courses_title}>CONTACTS</Text>

                        <Text style={styles.contacts_inquiry}>
                            For inquiries or concerns regarding your treatment or follow-up care, 
                            please contact out USTH-BCI front desk at 731-3001 local 2615.
                        </Text>

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
    contacts_inquiry: { 
        fontFamily: Fonts.Roboto,
        fontSize: RF(2.5),
        marginHorizontal: 24,
        marginVertical: 10,
        color: '#000'
    },
    scrollview_container: {
        bottom: 0,
    },
    scrollview_content: {
        width: Screen.width,
        alignItems: 'center',
        paddingBottom: 12.5,
    },
})