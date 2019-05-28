import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';

export default class Title extends Component {
    render() {
        return(
            <Animated.View 
                style={[styles.title_main_container, this.props.animateTitle]}>
                <Animated.View style={[styles.text_containers, this.props.animateTitle]}>
                    <Text style={[styles.white_text, styles.step_text]}>Step by step guide</Text>
                    <View style={styles.white_title_container}>
                        <Text style={styles.escort_text}>
                            <Text style={styles.orange_text}>HEAD</Text>
                            &
                            <Text style={styles.grey_text}>NECK</Text>
                        </Text>
                        <Text style={styles.escort_text}>RADIOTHERAPY</Text>
                    </View>
                    <Text style={[styles.white_text, styles.escort_text]}>ESCORT</Text>
                    <Text style={[styles.white_text, styles.empower_text]}>
                        Empowerment and Support for Coping with Radiotherapy
                    </Text>
                </Animated.View>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    title_main_container: {
        position: 'absolute',
        top: 0,
        width: Screen.width,
        height: Screen.width,
        opacity: 0.9,
        zIndex:2,
        // backgroundColor: '#add'
    },
    text_containers: {
        alignSelf: 'flex-end',
        width: Screen.width - (Screen.width / 3),
        height: Screen.width - (Screen.width / 4),
        justifyContent: 'center'
    },
    white_title_container: {
        backgroundColor: '#fff',
        width: Screen.width - (Screen.width / 3),
        padding: 7,
        marginTop: 5,
        marginBottom: 5,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },
    white_text: {
        color: '#fff'
    },
    orange_text: {
        color: '#fab76c'
    },
    grey_text: {
        color: '#3c3939'
    },
    step_text: {
        fontSize: RF(2.8),
        fontFamily: Fonts.Roboto
    },
    empower_text: {
        fontSize: RF(2),
        fontFamily: Fonts.Roboto,
        marginRight: 10,
    },
    escort_text: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(3.5),
    }
});