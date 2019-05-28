import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import Menu from '../components/Menu';
import { Main, TopRight } from '../components/SideMenu';
import HelpModule from '../components/HelpModule';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';

export default class Help extends Component {
    constructor() {
        super()

        this.state = {
            modules: [],
        }

        this.help = Coronex.Help
    }

    componentDidMount() {
        let modules = [];

        for(var a = 0; a < Coronex.Help.length; a++) {
            modules.push(
                <HelpModule 
                    key={a}
                    onPress={this.chooseHelp.bind(this, a)}
                    step={Coronex.Help[a].title} />
            )
        }

        this.setState({ modules })
    }

    chooseHelp = (option) => {
        this.props.navigation.navigate('HelpContent', { option })
        return this
    }

    goToPage(page) {
        this.props.navigation.navigate(page)
        return this
    }

    render() {
        return(
            <SafeAreaView style={styles.safe_area_view}>
                <View style={styles.main_container}>
                    <Menu 
                        color="#000" 
                        name="ios-arrow-round-back" 
                        onPress={() => this.props.navigation.goBack()}/>

                    <Text style={styles.courses_title}>HELP</Text>

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
        top: 50,
        bottom: 0,
    },
    scrollview_content: {
        width: Screen.width,
        alignItems: 'center',
        paddingBottom: 12.5,
        // backgroundColor: '#faf'
    },
})