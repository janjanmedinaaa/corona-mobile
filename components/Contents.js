import React, { Component } from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import RF from 'react-native-responsive-fontsize';

import { Fonts } from '../assets/utils/Fonts';
import { Screen } from '../assets/utils/Screen';
import { Coronex } from '../assets/utils/Coronex';

export class LayoutOne extends Component {
    render() {
        return(
            <View style={generics.main_container}>
                <Text style={generics.title_text}>{this.props.title}</Text>
                <Text style={generics.subtitle_text}>{this.props.subtitle}</Text>
                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>
                <Image
                    style={generics.image}
                    source={{uri: Coronex.APIURL + this.props.image}}
                    resizeMode="cover" />
            </View>
        );
    }
}

export class LayoutTwo extends Component {
    render() {
        return(
            <View style={generics.main_container}>
                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>
                <Text style={generics.notes_text}>
                    {this.props.notes}
                </Text>
                <Image
                    style={generics.image}
                    source={{uri: Coronex.APIURL + this.props.image}}
                    resizeMode="cover" />
            </View>
        );
    }
}

export class LayoutThree extends Component {
    render() {
        return(
            <View style={[generics.main_container]}>
                <Text style={generics.subtitle_text}>{this.props.subtitle}</Text>
                <Text style={generics.title_text}>{this.props.title}</Text>
                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>
                <Image
                    style={generics.image}
                    source={{uri: Coronex.APIURL + this.props.image}}
                    resizeMode="cover" />
                <Text style={generics.notes_text}>
                    {this.props.notes}
                </Text>
            </View>
        );
    }
}

export class LayoutFour extends Component {
    render() {
        return(
            <View style={[generics.main_container, generics.center_align]}>
                <Text style={generics.title_text}>{this.props.title}</Text>
                <Image
                    style={generics.image}
                    source={{uri: Coronex.APIURL + this.props.image}}
                    resizeMode="cover" />
                <Text style={[generics.subtitle_text, generics.start_self]}>{this.props.subtitle}</Text>
                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>
            </View>
        );
    }
}

export class LayoutFive extends Component {
    render() {
        return(
            <View style={generics.main_container}>
                <Text style={generics.title_text}>{this.props.title}</Text>
                <Text style={generics.subtitle_text}>{this.props.subtitle}</Text>
                
                <View style={generics.long_divider} />

                <Text style={generics.headerone_text}>{this.props.header}</Text>

                <Image
                    style={[generics.image, generics.image_margins]}
                    source={{uri: Coronex.APIURL + this.props.image}}
                    resizeMode="cover" />

                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>
            </View>
        );
    }
}

export class LayoutSix extends Component {
    render() {
        return(
            <View style={generics.main_container}>

                <Text style={[generics.title_text, generics.center_self]}>{this.props.title}</Text>

                <View style={generics.short_divider} />

                <Text style={[generics.subtitle_text, generics.center_self]}>{this.props.subtitle}</Text>

                <Image
                    style={[generics.image, layout_six.image]}
                    source={{uri: Coronex.APIURL + this.props.image}}
                    resizeMode="cover" />

                <Text style={[generics.headerone_text]}>{this.props.header}</Text>

                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>
            </View>
        );
    }
}

export class LayoutSeven extends Component {
    render() {
        return(
            <View style={generics.main_container}>

                <Text style={[generics.headerone_text]}>{this.props.header}</Text>

                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>

                <Text style={generics.content_text} />

                <Text style={generics.content_text}>
                    {this.props.multiple}
                </Text>

            </View>
        );
    }
}

export class LayoutEight extends Component {
    render() {
        return(
            <View style={generics.main_container}>

                <Text style={[generics.title_text, generics.center_self]}>{this.props.title}</Text>

                <Text style={[generics.headerone_text]}>{this.props.headerOne}</Text>

                <Text style={generics.content_text}>
                    {this.props.contentOne}
                </Text>

                <Image
                    style={[generics.image, layout_six.image, generics.image_margins]}
                    source={{uri: Coronex.APIURL + this.props.image}}
                    resizeMode="cover" />

                <Text style={[generics.headerthree_text]}>{this.props.headerTwo}</Text>

                <Text style={generics.content_text}>
                    {this.props.contentTwo}
                </Text>
            </View>
        );
    }
}

export class LayoutNine extends Component {
    render() {
        return(
            <View style={generics.main_container}>

                <Text style={[generics.title_text]}>{this.props.title}</Text>

                <View style={generics.long_divider} />

                <Text style={[generics.headerthree_text]}>{this.props.header}</Text>

                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>

                <Text style={generics.content_text}>
                    {this.props.multiple}
                </Text>

                <Image
                    style={[generics.image, layout_six.image, generics.image_margins]}
                    source={{uri: Coronex.APIURL + this.props.image}}
                    resizeMode="cover" />
            </View>
        );
    }
}

export class LayoutTen extends Component {
    render() {
        return(
            <View style={generics.main_container}>

                <Text style={[generics.title_text]}>{this.props.title}</Text>

                <View style={generics.long_divider} />

                <Text style={generics.content_text}>
                    {this.props.content}
                </Text>

                <Text style={generics.content_text} />

                <Text style={[generics.headerthree_text]}>{this.props.headerOne}</Text>

                <Text style={generics.content_text}>
                    {this.props.multipleOne}
                </Text>

                <Text style={generics.content_text} />
                
                <Text style={[generics.headerthree_text]}>{this.props.headerTwo}</Text>

                <Text style={generics.content_text}>
                    {this.props.multipleTwo}
                </Text>
            </View>
        );
    }
}

const layout_six = StyleSheet.create({
    image: {
        height: Screen.height / 3, 
        marginVertical: 10
    }
})

const generics = StyleSheet.create({
    main_container: {
        backgroundColor: '#fff',
        width: Screen.width,
        paddingVertical: Screen.width / 17,
    },
    center_content: {
        justifyContent: 'center',
    },
    end_content: {
        justifyContent: 'flex-end'
    },
    center_align: {
        alignItems: 'center',
    },
    end_align: {
        alignItems: 'flex-end'
    },
    start_self: {
        alignSelf: 'flex-start',
    },
    center_self: {
        alignSelf: 'center',
    },
    end_self: {
        alignSelf: 'flex-end'
    },
    image_margins: {
        width: Screen.width - ((Screen.width / 17) * 2),
        marginHorizontal: Screen.width / 17
    },
    title_text: {
        fontSize: RF(3.8),
        fontFamily: Fonts.RobotoBold,
        marginVertical: 5,
        marginHorizontal: Screen.width / 17
    },
    subtitle_text: {
        fontSize: RF(3.2),
        fontFamily: Fonts.RobotoItalic,
        marginVertical: 5,
        marginHorizontal: Screen.width / 17
    },
    headerone_text: {
        fontSize: RF(3),
        fontFamily: Fonts.RobotoBold,
        marginVertical: 5,
        marginHorizontal: Screen.width / 17
    },
    headertwo_text: {
        fontSize: RF(2.9),
        fontFamily: Fonts.RobotoBold,
        marginVertical: 5,
        marginHorizontal: Screen.width / 17
    },
    headerthree_text: {
        fontSize: RF(2.7),
        fontFamily: Fonts.RobotoBold,
        marginVertical: 5,
        marginHorizontal: Screen.width / 17
    },
    content_text: {
        fontSize: RF(2.4),
        fontFamily: Fonts.RobotoLight,
        marginVertical: 5,
        marginHorizontal: Screen.width / 17
    },
    notes_text: {
        fontSize: RF(2.4),
        fontFamily: Fonts.RobotoItalic,
        marginVertical: 5,
        marginHorizontal: Screen.width / 17
    },
    long_divider: {
        width: Screen.width - ((Screen.width / 17) * 2),
        backgroundColor: '#fab76c',
        height: 6,
        marginVertical: 5,
        marginHorizontal: Screen.width / 17
    },
    short_divider: {
        width: Screen.width / 4,
        backgroundColor: '#fab76c',
        height: 6,
        marginVertical: 5,
        alignSelf: 'center'
    },
    image: {
        width: Screen.width,
        height: Screen.height / 2.5,
        marginVertical: 5,
    }
});