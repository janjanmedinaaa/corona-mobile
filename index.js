/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import BackgroundFetch from "react-native-background-fetch";

import Tools from './assets/utils/Tools';
import BackgroundServices from './assets/utils/BackgroundServices';

const myHeadlessTask = async (event) => {
    console.log('[BackgroundFetch HeadlessTask] start');
  
    // Perform an example HTTP request.
    // Important:  await asychronous tasks when using HeadlessJS.

    let localLogs = await BackgroundServices.getContentLogs();

    // Send offline Data if there are any then Get User Data then calls getOthers() function
    await BackgroundServices.checkOffData();

    // Get Online Locals passing Local Logs as Parameter then calls getContent() function
    await BackgroundServices.getLogs(localLogs);

    // Tools.pushNotif([
    //     {
    //         title: 'CORONA Background Service', 
    //         message: 'Run Background Service. Prefetch Images and Notifications from myHeadlessTask'
    //     }
    // ]);

    // Required:  Signal to native code that your task is complete.
    // If you don't do this, your app could be terminated and/or assigned
    // battery-blame for consuming too much time in background.
    BackgroundFetch.finish();
}

BackgroundFetch.registerHeadlessTask(myHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
