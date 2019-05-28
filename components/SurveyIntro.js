import React, { Component } from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import RF from 'react-native-responsive-fontsize';

import UserButton from '../components/UserButton';

import { Fonts } from '../assets/utils/Fonts';
import Tools from '../assets/utils/Tools';

export default class SurveyIntro extends Component {
    constructor() {
        super();

        this.state = {
            description: ''
        }
    }

    componentDidMount() {
        var description = this.props.description;
        description = description.replace(/\\n/g, "\n");

        this.setState({ description })
    }
    render() {

        return(
            <ImageBackground 
                style={styles.main_container}
                source={require('../assets/img/bg.png')} 
                resizeMode="cover">
                <Text style={styles.survey_short}>{this.props.short}</Text>
                <Text style={styles.survey_name}>{this.props.name}</Text>
                <Text style={styles.description}>{Tools.parseHTML(this.state.description)}</Text>
                <UserButton title="PROCEED" style={styles.button} onPress={this.props.onPress}/>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 15,
        justifyContent: 'flex-end',
    },
    survey_short: {
        fontSize: RF(5),
        fontFamily: Fonts.RobotoBold,
        textAlign: 'left',
        color: '#000'
    },
    survey_name: {
        fontSize: RF(3.6),
        fontFamily: Fonts.Roboto,
        textAlign: 'left',
        color: '#000'
    },
    description: {
        fontSize: RF(2.4),
        marginVertical: 30,
        fontFamily: Fonts.RobotoLight,
        color: '#000'
    },
    button: {
        alignSelf: 'center',
    }
})