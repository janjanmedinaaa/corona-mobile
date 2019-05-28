import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Animated, TouchableOpacity } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';

export default class UserInput extends Component {
    constructor() {
        super()

        this.state = {
            secureTextEntry: false
        }
    }

    componentWillMount() {
        this.animatedUsername = new Animated.Value(0);

        if(this.props.password)
            this.setState({ secureTextEntry: true })
    }

    change = () => {
        Animated.timing(this.animatedUsername, {
            toValue: 150,
            duration: 300,
        }).start();
    }

    changeBack = () => {
        Animated.timing(this.animatedPassword, {
            toValue: 150,
            duration: 300,
        }).start();
    }

    clear = () => {
        this.refs.input.clear();
    }
    
    render() {
        const usernameColor = this.animatedUsername.interpolate({
            inputRange: [0, 150],
            outputRange: ['#ffbd5d', '#FF5D5D']
        })

        const animateUsername =  {
            backgroundColor: usernameColor
        }

        return(
            <Animated.View style={[styles.input_container, this.props.animateContainer]}>
                <Text style={[styles.input_label, this.props.labelStyle]}>{this.props.label}</Text>
                <TextInput 
                    ref="input"
                    style={styles.input}
                    secureTextEntry={this.state.secureTextEntry}
                    onChange={this.props.onChange}
                    autoCapitalize="none"
                    {...this.props}
                    />
                {
                    (this.props.password) ?
                    <TouchableOpacity 
                        style={styles.menu_icon} 
                        onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}>
                        <Icon 
                            name={(this.state.secureTextEntry) ? 'eye' : 'eye-off'} 
                            size={24} 
                            color='#5B5555' />
                    </TouchableOpacity> : null
                }
                <Animated.View style={[
                    styles.color_indicator, 
                    this.props.animatedIndi,
                    animateUsername
                ]} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    input_container: {
        width: Screen.width - 100,
    },
    input_label: {
        fontFamily: Fonts.Roboto,
        fontSize: RF(2.5),
    },
    input: {
        width: Screen.width - 100,
        height: 50,
        backgroundColor: '#ebebeb',
        fontSize: RF(2.4),
        padding: 10,
        borderRadius: 5
    },
    color_indicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 50,
        width: 5,
        borderRadius: 5,
    },
    menu_icon: {
        position: 'absolute',
        top: RF(2.5) + (17.5),
        right: 15,
        width: 24,
        height: 24,
    },
});