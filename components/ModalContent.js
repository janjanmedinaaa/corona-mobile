import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import Call from '../assets/utils/Call';
import { Coronex } from '../assets/utils/Coronex';
import { saveOfflineData } from '../assets/utils/Storage';
import Tools from '../assets/utils/Tools';

var moment = require('moment');

export default class ModalContent extends Component {
    constructor() {
        super()

        this.state = {
            numbers: [],
            parseData: null
        }
    }

    componentDidMount() {
        this.getUserData();
        this.getOffData();
        let numbers = [];

        for(var a = 0; a < this.props.numbers.length; a++) {
            if(this.props.numbers[a] != null && this.props.numbers[a] != "") {
                numbers.push(
                    <TouchableOpacity key={a} onPress={this.call.bind(this, this.props.numbers[a])}>
                        <Text style={styles.numbers}>Call {this.props.numbers[a]}</Text>
                    </TouchableOpacity>
                )
            }
        }

        this.setState({ numbers })
    }

    call(number) {
        let { parseData } = this.state;
        this.logActivity(parseData.id, parseData.api_key, 'Contacted Emergency Number');
        let options = {
            number: number, 
            prompt: true
        }

        Call(options)
    }

    async getUserData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_USERDATA');
            let parseData = JSON.parse(data);

            this.setState({ parseData })
        } catch(error) {
            console.log(error)
        }
    }

    async getOffData() {
        try {
            let data = await AsyncStorage.getItem('CORONA_OFFDATA');
            let offdata = (data != null) ? 
                JSON.parse(data) : [];

            this.setState({ offdata });
        } catch(error) {
            console.log(error)
        }
    }

    logActivity = (user_id, api_key, desc) => {
        var data = new FormData();

        var timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        
        data.append('id', user_id);
        data.append('description', desc);
        data.append('api_key', api_key);
        
        var logdata = {
            id: user_id,
            description: desc,
            api_key: api_key,
            timestamp: timestamp
        }

        Tools.fetch(Coronex.APIURL + '/Activities/log', {
            method: 'POST',
            body: data
        })
        .then(responseText => {})
        .catch(function(err) {
            this.saveToOffData(user_id, logdata)
        });
    }

    saveToOffData = (user_id, data) => {
        let { offdata } = this.state;

        let savedata = {
            id: user_id,
            activity: 'Module',
            title: data.description,
            data: data
        }

        offdata.push(savedata);

        saveOfflineData(JSON.stringify(offdata));
    }
    

    render() {
        return( 
            <View style={styles.modal}>
                <Text style={[styles.courses_title, styles.modal_title]}>{this.props.hospital}</Text>
                {this.state.numbers.map((value, index) => {
                    return value
                })}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    courses_title: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(3.5),
        margin: 20,
        color: '#ffcb80',
    },
    modal: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 8,
        textAlign: 'center'
    },
    modal_title: {
        marginTop: 0,
        marginBottom: 5,
        textAlign: 'center',
        fontSize: RF(3)
    },
    numbers: {
        fontSize: RF(3.2),
        margin: 5,
        textAlign: 'center'
    }
})