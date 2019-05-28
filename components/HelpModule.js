import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';

export default class HelpModule extends Component {
    render() {
        return(
            <TouchableOpacity 
                style={styles.main_container}
                activeOpacity={0.7}
                onPress={this.props.onPress}>

                <View style={styles.left_decor}/>
                <Text style={[styles.tip_text, styles.tip_num]}>{this.props.step}</Text>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width - 25,
        marginBottom: 0,
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        overflow: 'hidden',

        /* IOS Shadow for testing */

        borderWidth: .5,
        borderColor: '#d3d3d3',

        /* Android Shadow */

        // elevation: 4
    },
    tip_text: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(2.6),
        color: '#000'
    },
    tip_num: {
        color: '#282828'
    },
    left_decor: {
        position: 'absolute',
        left: 0,
        width: 5,
        height: 1000,
        backgroundColor: '#ffcb80'
    }
});