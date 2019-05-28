import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';

export default class ContactModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contact_list: [],
            number: ''
        }
    }

    componentDidMount() {
        if(this.props.number < 10) {
            this.setState({ number: '0' + this.props.number });
        } else {
            this.setState({ number: this.props.number });
        }
    }

    render() {
        return(
            <TouchableOpacity 
                style={styles.main_container}
                activeOpacity={0.7}
                onPress={this.props.onPress}>

                <View style={styles.number_con}>
                    <Text style={styles.number}>{this.state.number}</Text>
                </View>

                <View style={styles.category_con}>
                    <Text style={styles.category}>{this.props.category}</Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width - 40,
        marginBottom: 0,
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',

        /* IOS Shadow for testing */

        borderWidth: .5,
        borderColor: '#d3d3d3',

        /* Android Shadow */

        // elevation: 4
    },
    number_con: {
        borderRightWidth: 1.5,
        paddingHorizontal: 25,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d3d3d3',
        color: '#000'
    },
    number: {
        fontSize: RF(5.5),
        fontFamily: Fonts.Roboto,
        color: '#000'
    },
    category_con: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 20,
        paddingHorizontal: 16,
        textAlign: 'right',
        // backgroundColor: '#ffa',
        flex: 1,
        borderRadius: 10,
    },
    category: {
        fontSize: RF(3),
        fontFamily: Fonts.Roboto,
        alignSelf: 'flex-end',
        textAlign: 'right',
        color: '#000'
    }
});