import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';

export default class UserInput extends Component {
    render() {
        return(
            <Animated.View style={this.props.animateContainer}>
                <TouchableOpacity 
                    onPress={this.props.onPress}
                    style={[styles.login_button, this.props.style]}
                    activeOpacity={0.7}>

                        <Text style={styles.login_text}>{this.props.title}</Text>

                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    login_button: {
        width: Screen.width - 100,
        height: 60,
        backgroundColor: '#ffcb80',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 15,
    },
    login_text: {
        fontSize: RF(3.5),
        fontFamily: Fonts.RobotoBold,
        color: '#fff',
    },
});