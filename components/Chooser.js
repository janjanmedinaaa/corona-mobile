import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';

export default class SettingModule extends Component {
    constructor() {
        super();
        this.state = {
            choices: [],
            answer: null,
            colors: ['#faf', '#faf', '#faf']
        }
    }
    
    componentDidMount() {
        this.display();
    }

    componentDidUpdate(prevProps) {
        if(this.props.colors !== prevProps.colors) {
            this.display();
        }
    }

    display = () => {
        let choices = [];
    
        for(var a = 0; a < this.props.choices.length; a++) {
            choices.push(
                <TouchableOpacity 
                    key={a}
                    style={[styles.choice_con, { backgroundColor: this.props.colors[a]}]} 
                    onPress={this.props.onItemClick(a)}>
                    <Text style={styles.text_choice}>{this.props.choices[a]}</Text>
                </TouchableOpacity>
            )
        }
    
        this.setState({ choices });
    }

    render() {
        return(
            <View style={styles.main_container}>
                {this.state.choices.map((value, index) => {
                    return value
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    choice_con: {
        margin: 5,
        padding: 8,
        borderWidth: 1,
        width: Screen.width - 50,
        borderRadius: 3,
    },
    picked_con: {
        margin: 5,
        padding: 8,
        borderWidth: 1,
        width: Screen.width - 50,
        borderColor: '#ffcb80',
        borderRadius: 3,
    },
    text_choice: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(2.6),
        // color: '#ababab'
        color: '#000'
    }

});