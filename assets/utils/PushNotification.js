import React from 'react';
import { PushNotificationIOS, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
      
    // (required) Called when a remote or local notification is opened or received
    onNotification: (notification) => {
    }, //this._onNotification,

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

module.exports = {
    notify: (title, message) => {
        if(Platform.OS === 'android') {
            PushNotification.localNotification({
                title: title, 
                message: message,
            });
        } else if(Platform.OS === 'ios') {
            PushNotificationIOS.presentLocalNotification({
                alertTitle: title,
                alertBody: message
            })
        }
    }
}