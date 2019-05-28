import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RF from 'react-native-responsive-fontsize';

import UserButton from '../components/UserButton';

import { Fonts } from '../assets/utils/Fonts';

export default class SurveyOutro extends Component {
    render() {
        return(
            <View style={styles.main_container}>
                <Text style={styles.survey_short}>{this.props.short}</Text>
                <Text style={styles.survey_name}>{this.props.name}</Text>
                <Text style={styles.description}>Are you sure you are ready to submit?</Text>
                <UserButton title="SUBMIT" style={styles.button} onPress={this.props.onPress}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        // backgroundColor: '#afa',
        paddingHorizontal: 25,
        paddingVertical: 15,
        justifyContent: 'flex-end',
        top: -48,
    },
    survey_short: {
        fontSize: RF(5),
        fontFamily: Fonts.RobotoBold,
        textAlign: 'left',
        color: '#000'
    },
    survey_name: {
        fontSize: RF(3.6),
        fontFamily: Fonts.Roboto,
        textAlign: 'left',
        color: '#000'
    },
    description: {
        fontSize: RF(3.6),
        marginVertical: 30,
        fontFamily: Fonts.RobotoLight,
        color: '#000'
    },
    button: {
        alignSelf: 'center',
    }
})