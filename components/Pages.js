import React, { Component } from 'react';
import { StyleSheet, Linking, ScrollView } from 'react-native';
import { _constructStyles } from 'react-native-render-html/src/HTMLStyles';
import HTML from 'react-native-render-html';
import Video , { Container } from 'react-native-af-video-player'

import { Screen } from '../assets/utils/Screen';
import { Fonts } from '../assets/utils/Fonts';
import Tools from '../assets/utils/Tools';

export default class Pages extends Component {
    constructor() {
        super()

        this.state = {
            
        }
    }

    componentDidMount() {
        if(this.props.type == 'Course') {
            let { scrollTo, checkpointPage, currentPage } = this.props;

            if(checkpointPage == currentPage)
                setTimeout(() => this.scrollTo(scrollTo), 1000);
        }
    }

    scrollTo = (y) => {
        this.refs.scrollref.scrollTo({x: 0, y: y, animated: true});
    }

    linkPress = (evt, url) => {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    download = (url) => {
        let file = Tools.getFile(url);

        Linking.openURL(`https://sitem.website/corona/download.php?file=${file}`);
    }

    render() {
        return(
            <ScrollView 
                style={styles.main_container} 
                onScrollEndDrag={this.props.onScrollEndDrag}
                onContentSizeChange={this.props.onContentSizeChange}
                scrollEventThrottle={16}
                bounces={false}
                ref="scrollref"> 

                <HTML 
                    containerStyle={styles.html} 
                    html={this.props.html} 
                    textSelectable={true}
                    tagsStyles={{ 
                        img: { left: -25 },
                        p: { fontFamily: Fonts.Roboto, marginVertical: 5 },
                        i: { fontFamily: Fonts.RobotoLight, marginVertical: 5 },
                        b: { fontFamily: Fonts.RobotoBold, marginVertical: 5 },
                        h1: { fontFamily: Fonts.RobotoBold, marginVertical: 5 },
                        h2: { fontFamily: Fonts.RobotoBold, marginVertical: 5 },
                        h3: { fontFamily: Fonts.RobotoBold, marginVertical: 5 },
                        h4: { fontFamily: Fonts.RobotoBold, marginVertical: 5 },
                        h5: { fontFamily: Fonts.RobotoBold, marginVertical: 5 },
                        h6: { fontFamily: Fonts.RobotoBold, marginVertical: 5 },
                        iframe: { width: Screen.width-50 }
                    }}
                    renderers={{
                        iframe: (attr, children, css, props) => 
                            <Video 
                                key={1}
                                style={{ width: Screen.width-50 }}
                                url={Tools.getURL(attr.src)} 
                                // url="http://techslides.com/demos/sample-videos/small.mp4"
                                inlineOnly
                                onMorePress={() => this.download(attr.src)}
                                onEnd={this.props.onEnd} />
                    }}
                    imagesMaxWidth={Screen.width} 
                    textSelectable={true}
                    onLinkPress={(evt, href) => this.linkPress(evt, href)} />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: Screen.width,
        height: Screen.height,
        backgroundColor: '#fff',
    },
    html: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: Screen.height / 11,
        paddingBottom: 20,
        width: Screen.width,
    }
})