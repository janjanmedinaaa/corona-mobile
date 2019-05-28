import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import CircleOverlay from './CircleOverlay';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';
import { Coronex } from '../assets/utils/Coronex';

export default class CourseModule extends Component {
    render() {
        return(
            <TouchableOpacity 
                style={[
                    styles.main_container,
                    (this.props.number == 0) ? styles.zero_background : null
                ]}
                disabled={this.props.disabled}
                activeOpacity={0.7}
                onPress={this.props.onPress}>

                { this.props.locked ? <View style={styles.disabled} /> : null }

                <View style={styles.text_container}>

                    <Text style={[
                            styles.course_text, 
                            styles.course_num,
                            (this.props.number == 0) ? styles.zero_color : styles.nonzero_color
                        ]}>
                        {this.props.number}
                    </Text>

                    <Text style={[
                            styles.course_text, 
                            styles.course_title,
                            (this.props.number == 0) ? styles.zero_color : styles.nonzero_color
                        ]}>
                        {this.props.title}
                    </Text>

                </View>

                {
                    (this.props.number != 0) ?
                        <CircleOverlay 
                            style={styles.circle_overlay}
                            size={Screen.height / 4}
                            source={{uri: Coronex.IMAGEURL + this.props.source}} 
                            color="#ffcb80"/> : null
                }
    
                {
                    (this.props.number == 0) ?
                        <Image 
                            style={styles.white_blob}
                            source={require('../assets/img/white_blob.png')} 
                            resizeMode="contain"/> : null
                }

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width - 25,
        // height: Screen.height / 5.5,
        marginBottom: 0,
        marginTop: 15,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 15,
        paddingBottom: 35,
        overflow: 'hidden',

        /* IOS Shadow for testing */

        // borderWidth: .5,
        // borderColor: '#d3d3d3', 

        /* Android Shadow */

        // elevation: 4
    },
    text_container: {
        flex: 1,
        zIndex: 2,
        marginRight: (Screen.height / 8)
    },  
    disabled: {
        position: 'absolute',
        width: Screen.width - 25,
        height: Screen.height / 2,
        backgroundColor: '#000',
        zIndex: 3,
        opacity: .2
    },
    circle_overlay: {
        zIndex: 1,
        position: 'absolute',
        right: 0 - (Screen.height / 9),
        top: 0 - (Screen.height / 24)
    },
    blob_image: {
        position: 'absolute',
        bottom: 0 - (Screen.width / 1.8),
        left: 0 - (Screen.width / 2.5),
        width: Screen.width / 1.2  
    },
    white_blob: {
        position: 'absolute',
        bottom: -330,
        right: -300,
        height: 800,
        width: 550,
        zIndex: 1
    },
    course_text: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(2.7)    
    },
    course_num: {
        color: '#ffcb80'
    },
    zero_background: {
        backgroundColor: '#fab76c'
    },
    zero_color: {
        color: '#fff'
    },
    nonzero_color: {
        color: '#000'
    }
});