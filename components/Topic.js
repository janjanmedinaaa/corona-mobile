import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, Animated } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';

export default class Topic extends Component {
    constructor() {
        super();

        this.state = {
            topic_img: require('../assets/img/blob12.png')
        }
    }

    componentDidMount() {
        var { topic } = this.props;

        if(topic == 'Courses') {
            this.setState({ topic_img: require('../assets/img/blob11.png') })
        }
    }

    render() {
        return(
            <Animated.View style={this.props.animateContainer}>
                <TouchableOpacity
                    style={[styles.main_container, this.props.touchStyle]}
                    onPress={this.props.onPress}
                    disabled={this.props.disabled}>

                    <Text style={styles.course_topic}>
                        {this.props.topic}
                    </Text>
                    
                    <Text style={styles.course_description}>
                        {this.props.description}
                    </Text>

                    <Image 
                        style={styles.blob_image}
                        source={this.state.topic_img}
                        resizeMode="contain" />

                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width - 25,
        height: Screen.height / 5.2,
        marginBottom: 0,
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        paddingRight: (Screen.width / 4),
        overflow: 'hidden',

        /* IOS Shadow for testing */

        borderWidth: .5,
        borderColor: '#d3d3d3', 


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
        bottom: -(Screen.width - 20),
        right: -(Screen.height / 2.2),
        height: Screen.width * 2.1,
        width: Screen.width * 1.5,
        zIndex: 1
    }
});