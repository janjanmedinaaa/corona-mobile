import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';
import { Coronex } from '../assets/utils/Coronex';

export default class SettingModule extends Component {
    render() {
        return(
            <View style={styles.main_container}>
                <View style={styles.icon_container}>
                    <Image 
                        style={styles.icon}
                        source={{uri: Coronex.IMAGEURL + this.props.source}}
                        resizeMode="cover" />
                </View>
                <View style={styles.content}>
                    <Text style={styles.doctor}>Dr. {this.props.sender}</Text>
                    <Text style={[styles.doctor, styles.title]}>{this.props.title}</Text>
                    <Text style={styles.message}>{this.props.message}</Text>
                </View>
                <Text style={styles.timestamp}>{this.props.timestamp}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width - 25,
        marginBottom: 0,
        marginTop: 10,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 15,
        overflow: 'hidden',

        /* IOS Shadow for testing */

        // borderWidth: .5,
        // borderColor: '#d3d3d3',
        
        /* Android Shadow */

        // elevation: 4,
        flexDirection: 'row'
    },
    icon_container: {
        width: Screen.width / 9,
        height: Screen.width / 9,
        backgroundColor: '#ffcb80',
        borderRadius: (Screen.width / 9) / 2,
        alignSelf: 'center',
        overflow: 'hidden',
    },
    icon: {
        flex: 1,
        width: Screen.width / 9,
        height: Screen.width / 9,
        borderRadius: (Screen.width / 9) / 2,
    },
    content: {
        flex: 1,
        marginHorizontal: 10,
        color: '#000'
        // backgroundColor: '#ffa'
    },
    doctor: {
        fontSize: RF(2.4),
        fontFamily: Fonts.RobotoBold,
        color: '#000',
        marginTop: 5
    },
    title: {
        marginTop: 6,
        color: '#fab34e',
    },
    timestamp: {
        position: 'absolute',
        fontSize: RF(1.5),
        color: '#000',
        margin: 10,
        right: 0
    }
});