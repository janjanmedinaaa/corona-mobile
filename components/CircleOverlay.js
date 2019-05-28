import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';

export default class CircleOverlay extends Component {
    constructor() {
        super();
        this.state = {
            size: 0,
        }
    }

    render() {
        const { size, source, style, imagesize } = this.props;

        return(
            <Animated.View style={[
                style,
                styles.main_container, 
                { width: size, height: size, borderRadius: size / 2 }]}>

                <Image 
                    style={[
                        styles.image,
                        { width: imagesize || size, height: imagesize || size, borderRadius: size / 2}]}
                    source={source}
                    resizeMode={this.props.resizeMode || "cover" } />

                <View style={[
                    styles.overlay, 
                    { opacity: this.props.opacity || 0.6 },
                    { width: size, height: size, borderRadius: size / 2, backgroundColor: this.props.color }]}>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: '#ffa',
    },
    image: {
        position: 'absolute',
        zIndex: 1,
    },
    overlay: {
        position: 'absolute',
        zIndex: 2,
    }
})