import React from 'react';
import { Dimensions } from 'react-native'

export const Screen = { 
    width: Math.round(Dimensions.get("window").width) + 1, 
    height: Math.round(Dimensions.get("window").height) 
};