import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import Menu from '../components/Menu';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';
import { Coronex } from '../assets/utils/Coronex';

export default class HelpContent extends Component {
    constructor() {
        super()

        this.state = {
            steps: []
        }
    }

    componentDidMount() {
        let steps = [];
        let option = this.props.navigation.state.params.option;
        
        for(var a = 0; a < Coronex.Help[option].steps.length; a++) {
            steps.push(
                <Text key={a} style={styles.step}>{a+1}. {Coronex.Help[option].steps[a]}</Text>
            )
        }

        this.setState({ steps });
    }

    render() {
        let option = this.props.navigation.state.params.option;
        
        return(
            <SafeAreaView style={styles.safe_area_view}>
                <View style={styles.main_container}>
                    <Menu 
                        color="#000" 
                        name="ios-arrow-round-back" 
                        onPress={() => this.props.navigation.goBack()}/>

                    <Text style={styles.number}>{Coronex.Help[option].number}</Text>
                    <Text style={styles.headone}>{Coronex.Help[option].headOne}</Text>
                    <Text style={styles.headtwo}>{Coronex.Help[option].headTwo}</Text>

                    <View style={styles.step_container}>
                        
                        {this.state.steps.map((value, index) => {
                            return value
                        })}

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
        width: Screen.width,
        backgroundColor: '#fff',
        height: Screen.height,
        padding: 20,
        paddingTop: Screen.height / 7.5 
    },
    number: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(5.5),
        color: '#000'
    },
    headone: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(4.8),
        color: '#000'
    },
    headtwo: {
        fontFamily: Fonts.Roboto,
        fontSize: RF(3.8),
        color: '#ffcb80'
    },
    step_container: {
        // backgroundColor: '#faf',
        width: Screen.width - 30,
        paddingVertical: 20
    },
    step: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(2.5),
        marginVertical: 10
    }
})