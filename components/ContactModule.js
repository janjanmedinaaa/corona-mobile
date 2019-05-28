import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';

export default class ContactModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contact_list: []
        }
    }

    componentDidMount() {
        let contact_list = [];
        if(this.props.contacts != null) {

            for(var a = 0; a < this.props.contacts.length; a++) {
                contact_list.push(
                    <Text 
                        style={[styles.tip_description]} 
                        key={a}>
                        {this.props.contacts[a].name} at {this.props.contacts[a].number}
                    </Text>
                );
            }
    
            this.setState({ contact_list });
        }
    }

    render() {
        return(
            <TouchableOpacity 
                style={styles.main_container}
                activeOpacity={0.7}
                onPress={this.props.onPress}>

                    <Text style={[styles.tip_text, styles.tip_num]}>{this.props.hospital}</Text>

                    { (this.props.direct != null && this.props.direct != "") ?
                        <Text style={[styles.tip_description]}>Direct Line: {this.props.direct}</Text> : null }
                    
                    { (this.props.contacts != null) ?
                        <View>
                            <Text style={[styles.tip_description]}>Contact Person:</Text> 
                            {this.state.contact_list.map((value, index) => {
                                return value 
                            })}
                        </View>
                        : null }
                    
                    { (this.props.local != null && this.props.local != "") ?
                        <Text style={[styles.tip_description]}>local {this.props.local}</Text> : null }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width - 25,
        marginBottom: 0,
        marginTop: 15,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 15,

        /* IOS Shadow for testing */

        // borderWidth: .5,
        // borderColor: '#d3d3d3',

        /* Android Shadow */

        // elevation: 4
    },
    tip_text: {
        fontFamily: Fonts.RobotoBold,
        fontSize: RF(2.5)    
    },
    tip_num: {
        color: '#ffcb80'
    },
    tip_description: {
        fontSize: RF(2.2),
        fontFamily: Fonts.Roboto,
        color: '#000'
    }
});