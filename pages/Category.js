import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ToastAndroid, AsyncStorage, SafeAreaView } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import Menu from '../components/Menu';
import Category from '../components/Category';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import Tools from '../assets/utils/Tools';

export default class Contacts extends Component {
    constructor() {
        super()

        this.state = {
            category: [],
            title: '',
            modules: [],
            image: ''
        }
    }

    componentDidMount() {
        this.getUserData();
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
            let parseData = JSON.parse(data);
            let id = this.props.navigation.state.params.id;

            let category = parseData.tips[id].category;
            let title = parseData.tips[id].title;

            this.setState({ category, title }, () => {
                this.displayData();
            })

        } catch (error) {
            ToastAndroid.show(error + "", ToastAndroid.SHORT)
        }
    }

    displayData() {
        let modules = [];
        for(var a = 0; a < this.state.category.length; a++) {

            modules.push(
                <Category 
                    key={a} 
                    number={a+1} 
                    category={(this.state.category[a].category != "" && this.state.category[a].category != null) 
                                ? this.state.category[a].category : 
                                this.state.title + ' ' + (a+1)}
                    onPress={this.navigate.bind(this, 'Tips', a)} />
            )
        }

        this.setState({ modules })
    }

    navigate(module, id) {
        let { category, title } = this.state;

        this.props.navigation.navigate('Module', { 
            module: {
                html: Tools.stripslashes(category[id].html), 
                id: id, 
                type: module, 
                title: category[id].title,
                category: category[id].category
            }
        })
    }

    render() {
        return(
            <SafeAreaView style={styles.safe_area_view}>
                <View style={styles.main_container}>
                    <Menu 
                        color="#000" 
                        name="ios-arrow-round-back" 
                        onPress={() => this.props.navigation.goBack()}/>

                    <Text style={styles.tips}>TIPS</Text>
                    <Text style={styles.category}>{this.state.title}</Text>
                    <Text style={styles.note}>Don't forget to read the courses. It will guide you to the right tips to do.</Text>

                    <ScrollView 
                        style={styles.scrollview_container} 
                        contentContainerStyle={[styles.scrollview_content]}
                        bounces={false}>

                        {this.state.modules.map((value, index) => {
                            return value
                        })}

                    </ScrollView>
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
        // alignItems: 'center',
    },
    courses_title: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(3.5),
        margin: 20,
        color: '#ffcb80',
    },
    tips: {
        marginTop: 70,
        marginHorizontal: 24,
        fontSize: RF(5.5),
        fontFamily: Fonts.RobotoBold,
        color: '#fab76c'
    },
    category: {
        marginHorizontal: 24,
        fontSize: RF(5),
        marginTop: -10,
    },
    note: {
        marginHorizontal: 24,
        fontSize: RF(2),
    },
    contacts_inquiry: { 
        fontFamily: Fonts.Roboto,
        fontSize: RF(2.5),
        marginHorizontal: 24,
        marginVertical: 10,
    },
    // scrollview_container: {
    //     position: 'absolute', 
    //     top: Screen.height / 4,
    //     bottom: 0,
    // },
    scrollview_content: {
        width: Screen.width,
        alignItems: 'center',
        paddingBottom: 12.5,
        // backgroundColor: '#faf'
    },
})