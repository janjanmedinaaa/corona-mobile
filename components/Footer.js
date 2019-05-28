import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';

export default class Footer extends Component {
    render() {
        return(
            <View style={styles.footer}>
                <Text style={styles.footer_text}>
                    Cancer: On-the-go Online Reading Application (CORONA)
                </Text>
                <Text style={styles.footer_text}>
                    Copyright 2017
                </Text>
                <Text style={styles.footer_text}>
                    Version 2.0
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    footer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        marginBottom: 20,
        textAlign: 'center'
    },
    footer_text: {
        fontSize: RF(1.8),
        fontFamily: Fonts.Roboto,
        textAlign: 'center',
        marginHorizontal: 20
    }
})