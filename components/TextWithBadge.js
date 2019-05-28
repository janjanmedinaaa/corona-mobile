import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';

export default class Test extends Component {
    render() {
        return(
            <View style={styles.text_container}>

                <TouchableOpacity 
                    onPress={this.props.onPress}
                    style={this.props.style}
                    activeOpacity={0.7}>
                    <Text style={styles.text}>{ this.props.text }</Text>
                </TouchableOpacity>

                {
                    this.props.number != undefined && this.props.number != 0 ?
                        <View style={styles.badge_container}>
                            <Text style={styles.badge_number}>{ this.props.number }</Text>
                        </View> : null
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    text_container: {
        // backgroundColor: '#faf',
        paddingRight: 10,
        paddingTop: 12,
        paddingLeft: 0,
        flexDirection: 'row'
    },
    badge_container: {
        backgroundColor: '#F46B6B',
        // backgroundColor: '#faf',
        // position: 'absolute',
        padding: 5,
        marginHorizontal: 7,
        width: 30,
        height: 30,
        borderRadius: 15,   
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'flex-end',
        top: -3,
        // left: -15
    },
    text: {
        fontSize: RF(3),
        fontFamily: Fonts.RobotoLight,
        color: '#fff',
    },
    badge_number: {
        color: '#fff'
    }
});