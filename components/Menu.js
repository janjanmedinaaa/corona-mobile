import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Menu extends Component {

    render() {

        return(
            <Animated.View style={[styles.menu_container, this.props.style]}>
                <TouchableOpacity 
                    activeOpacity={0.7} 
                    style={[styles.menu_container]}
                    onPress={ this.props.onPress }
                    navigation={this.props.navigation}>
                    <Icon 
                        name={(this.props.name != undefined) ? this.props.name : 'ios-menu'} 
                        style={styles.menu_icon} 
                        size={24} 
                        color={(this.props.color != undefined) ? this.props.color : '#fff' } />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({ 
    menu_container: {
        position: 'absolute',
        width: 24,
        height: 24,
        zIndex: 3,
        top: 0,
        left: 0,
        padding: 24,
    },
    menu_icon: {
        width: 24,
        height: 24,
        zIndex: 10,
    },
})