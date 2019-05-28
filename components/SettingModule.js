import React, { Component } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import { StyleSheet, Text, Image } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';

export default class SettingModule extends Component {
    render() {
        return(
            <Animated.View style={this.props.animateContainer}>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={this.props.onPress}>

                    { this.props.disabled ? <View style={styles.disabled} /> : null } 
                    
                    <Text style={styles.course_topic}>
                        {this.props.topic}
                    </Text>
                    
                    {
                        (this.props.description != undefined) ?
                            <Text style={styles.course_description}>
                                {this.props.description}
                            </Text> : null
                    }

                    <Image 
                        style={styles.blob_image}
                        source={require('../assets/img/blob.png')}
                        resizeMode="contain" />

                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width - 25,
        // height: Screen.height / 5.2,
        marginBottom: 0,
        marginTop: 15,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 15,
        paddingTop: 45,
        paddingRight: (Screen.width / 4),
        overflow: 'hidden',
        justifyContent: 'flex-end',

        /* IOS Shadow for testing */

        // borderWidth: .5,
        // borderColor: '#d3d3d3',
        
        /* Android Shadow */

        // elevation: 4
    },
    course_topic: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(2.7),
        zIndex: 2,
        color: '#000'
    },
    course_description: {
        fontFamily: Fonts.Roboto,
        fontSize: RF(2.2),
        zIndex: 2,
        color: '#000'
    },
    blob_image: {
        position: 'absolute',
        bottom: -330,
        right: -300,
        height: 800,
        width: 550,
        zIndex: 1
    },
    disabled: {
        position: 'absolute',
        width: Screen.width - 25,
        height: Screen.height / 2,
        backgroundColor: '#000',
        zIndex: 3,
        opacity: .2
    },
});