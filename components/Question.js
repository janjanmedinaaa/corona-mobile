import React, { Component } from 'react';
import { StyleSheet, View, Text, Slider, TextInput } from 'react-native';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import RNSlider from 'react-native-slider'

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';

export default class Question extends Component {
    constructor() {
        super()

        this.state = {
            value: 0,
            choices: [],
            answer: null,
        }
    }

    componentDidMount() {
        if(this.props.answers.type == 'Multiple Choice')
        this.display();
    }

    componentDidUpdate(prevProps) {
        if(this.props.colors !== prevProps.colors) {
            this.display();
        }
    }

    display = () => {
        let choices = [];
    
        for(var a = 0; a < this.props.answers.choices.length; a++) {
            if(this.props.answers.choices[a] != "") {
                choices.push(
                    <TouchableOpacity 
                        key={a}
                        style={[styles.choice_con, { backgroundColor: this.props.colors[a]}]} 
                        onPress={this.props.onSelect(this.props.number - 1, a)}>
                        <Text style={styles.text_choice}>{this.props.answers.choices[a]}</Text>
                    </TouchableOpacity>
                )
            }
        }
    
        this.setState({ choices });
    }

    render() {
        return(
            <ScrollView style={styles.main_container} bounces={false}>
                <Text style={styles.survey_name}>{this.props.name} ({this.props.short})</Text>
                {/* <Text style={[styles.reminder, styles.rem_title]}>Reminder</Text>
                <Text style={[styles.reminder, styles.rem_description]}>
                    If you are having a hard time assessing your condition, SKIP the question. 
                    Then, consult your doctor immediately or they will contact you for consultation
                </Text> */}
                <Text style={styles.question_num}>Question {this.props.number} - {this.props.totalQuestions}</Text>
                <Text style={styles.question_text}>{this.props.question}</Text>
                <View style={styles.line_divider} />
                {
                    (this.props.answers.type == 'Multiple Choice') ?

                    <View style={styles.choices_container}>
                        {this.state.choices.map((value, index) => {
                            return value
                        })}
                    </View> :
                    
                    (this.props.answers.type == 'Scale') ?

                    <View>
                        <View style={styles.label_container}>
                            <Text style={{textAlign: 'left', flex: 1}}>{this.props.answers.min}</Text>
                            <Text style={{textAlign: 'center', flex: 1, fontSize: RF(2.7)}}>
                                {this.state.value}
                            </Text>
                            <Text style={{textAlign: 'right', flex: 1}}>{this.props.answers.max}</Text>
                        </View>
                        {

                        (Platform.OS === 'ios') ?
                            <Slider
                                style={styles.slider}
                                value={this.props.answers.min}
                                minimumValue={this.props.answers.min}
                                maximumValue={this.props.answers.max}
                                thumbTintColor="#fff"
                                minimumTrackTintColor="#fab76c"
                                step={1}
                                onValueChange={(a) => this.setState({value : a})}
                                onSlidingComplete={this.props.onSelect(this.props.number - 1, this.state.value)} /> :
                                
                            <RNSlider
                                style={styles.slider}
                                thumbStyle={styles.thumb_style}
                                trackStyle={styles.track_style}
                                value={this.props.answers.min}
                                minimumValue={this.props.answers.min}
                                maximumValue={this.props.answers.max}
                                thumbTintColor="#fff"
                                minimumTrackTintColor="#fab76c"
                                step={1}
                                onValueChange={(a) => this.setState({value : a})}
                                onSlidingComplete={this.props.onSelect(this.props.number - 1, this.state.value)} />
                        }
                    </View> :

                    <TextInput 
                        style={[styles.choice_con, styles.input]}
                        multiline = {true}
                        numberOfLines = {4}
                        onEndEditing={this.props.inputChange(this.props.number - 1, this.state.value)}
                        onSelectionChange={this.props.inputChange(this.props.number - 1, this.state.value)}
                        onChangeText={(a) => this.setState({value : a})} />
                }

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width,
        textAlign: 'center',
        paddingHorizontal: 25,
        paddingVertical: 15,
        paddingBottom: 30,
        top: 48,
    },
    survey_name: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(2.7),
        textAlign: 'center',
        color: '#000'
    },
    reminder: {
        fontSize: RF(2.2),
        marginTop: 5,
        marginRight: Screen.width / 6,
        color: '#000'
    },
    rem_title: {
        color: '#fab76c',
        marginTop: 20,
        fontFamily: Fonts.RobotoBold,
    },
    rem_description: {
        color: '#ababab',
        fontFamily: Fonts.RobotoLight,
    },
    question_num: {
        fontSize: RF(2.8),
        fontFamily: Fonts.RobotoLight,
        color: '#ababab',
        marginTop: 20
    },
    question_text: {
        fontSize: RF(3),
        fontFamily: Fonts.RobotoLight,
        marginVertical: 8,
        color: '#000'
    },
    line_divider: {
        width: Screen.width / 3.5,
        height: 4,
        borderRadius: 5,
        backgroundColor: '#fab76c',
        marginHorizontal: 3,
        marginBottom: 5
    },
    choices_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    choice_con: {
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        width: Screen.width - 50,
        borderRadius: 3,
    },
    text_choice: {
        fontFamily: Fonts.RobotoLight,
        fontSize: RF(3),
        color: '#000'
    },
    label_container: {
        flexDirection: 'row',
        marginTop: 20
    },
    slider: {
        marginBottom: 10,
    },
    input: {
        fontFamily: Fonts.RobotoLight,
        fontSize: RF(2.6),
        color: '#000',
        paddingHorizontal: 15,
    },
    thumb_style: { 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        borderColor: '#fff',
        elevation: 2,
        borderWidth: 2  
    },
    track_style: { 
        height: 3, 
        borderRadius: 10 
    },
})