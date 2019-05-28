import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import TextWithBadge from './TextWithBadge';

import { Fonts } from '../assets/utils/Fonts';
import { Coronex } from '../assets/utils/Coronex';

export class Main extends Component {
    render() {
        return(
            <View style={side_styles.main_container}>
                <TextWithBadge
                    text="CONTENTS"
                    onPress={this.props.contentsPress}
                    number={0} />
                <TextWithBadge
                    text="TAKE SURVEY"
                    onPress={this.props.surveyPress}
                    number={0} />
                <TextWithBadge
                    text="EMERGENCY NUMBERS"
                    onPress={this.props.contactsPress}
                    number={0} />
                <TextWithBadge
                    text="VIEW NOTIFICATIONS"
                    onPress={this.props.notificationsPress}
                    number={this.props.notificationsBadge} />
                <TextWithBadge
                    text="ABOUT"
                    onPress={this.props.aboutPress} />
                <TextWithBadge
                    text="SETTINGS"
                    style={side_styles.padding_top}
                    onPress={this.props.settingsPress}
                    number={0} />
                <TextWithBadge
                    text="LOGOUT"
                    onPress={this.props.logoutPress}
                    number={0} />
            </View>
        );
    }
}

export class TopRight extends Component {
    render() {
        return(
            <TouchableOpacity 
                style={side_styles.top_right} 
                onPress={this.props.profilePress}>
                <Image 
                    style={side_styles.user_icon}
                    source={{uri: Coronex.IMAGEURL + this.props.image}}
                    resizeMode="cover" />
            </TouchableOpacity>
        );
    }
}

const side_styles = StyleSheet.create({
    top_right: {
        // backgroundColor: '#faf',
        padding: 24,
        alignItems: 'flex-end'
    }, 
    menu_option_text: {
        fontSize: RF(3),
        fontFamily: Fonts.RobotoLight,
        color: '#fff',
        paddingBottom: 10,
    },
    user_icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ffcb80',
    },
    padding_top: {
        paddingTop: 20,
    }
});