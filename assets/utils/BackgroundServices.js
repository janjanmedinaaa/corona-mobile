import React from 'react';
import { AsyncStorage, Image } from 'react-native';
import BackgroundFetch from "react-native-background-fetch";

import Tools from './Tools';
import { Coronex } from './Coronex';
import { saveCoursesCP, saveLayout, saveUserLogs, saveUserData, saveNewNotifications } from './Storage';


const checkOffData = async() => {
    try {
        let batch = await AsyncStorage.getItem('CORONA_OFFDATA');
        let parseBatch = (batch != "" && batch != null) ? JSON.parse(batch) : [];

        if(parseBatch.length != 0)
            module.exports.sendBatch(batch);
        else {
            module.exports.getUserData();
        }

    } catch(err) {
        console.log(err)
    }
}

const sendBatch = (batch) => {
    var data = new FormData();
    data.append('batch', batch);

    Tools.fetch(Coronex.APIURL + '/Patients/batch', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(responseJson => {
        if(responseJson.success) {
            Tools.pushNotif([{
                title: 'Offline Backlogs sent!', 
                message: 'Your offline logs have been sent to your doctor!'
            }])
            
            removeOfflineData();
        }
    })
    .catch(function(err) {
        console.log(err)
    });
}

const getUserData = async() => {
    try {
        let userData = await AsyncStorage.getItem('CORONA_USERDATA');
        let parseData = (userData != null) ? JSON.parse(userData) : null;

        if(parseData != null) {
            console.log('Prefetched User Image')
            Image.prefetch(Coronex.IMAGEURL + parseData.image);

            console.log('Get Notifications')

            module.exports.getOthers(
                parseData.id, 
                parseData.patientID, 
                parseData.api_key, 
                parseData
            )
        }
    } catch(err) {
        console.log(err)
    }
}

const getContentLogs = async() => {
    try {
        let data = await AsyncStorage.getItem('CORONA_CONTENTLOGS');
        let logs = (data != null) ? JSON.parse(data) : null;

        console.log('Local Logs:', logs)

        return logs;
    } catch(error) {
        console.log(error)
    }
}

const getLogs = (logs) => {
    Tools.fetch(Coronex.APIURL + '/Activities/latest', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log('Get Logs');
        console.log('Current Logs:', logs)
        if(logs == null || logs.timestamp != responseJson.logs.timestamp) {
            module.exports.getContent(responseJson);
        }
    })
    .catch((err) => {
        console.log(err)
    });
}

const getContent = (logs) => {
    Tools.fetch(Coronex.APIURL + '/Patients/contents', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log('Get Contents');

        let contents = responseJson.contents;

        for(var a in contents.courses) {
            Image.prefetch(Coronex.IMAGEURL + contents.courses[a].source)
        }

        for(var b in contents.tips) {
            Image.prefetch(Coronex.IMAGEURL + contents.tips[b].source)
        }

        console.log('Prefetched Images');

        saveLayout(JSON.stringify(contents));
        saveUserLogs(JSON.stringify(logs.logs));

        // Tools.pushNotif([{ 
        //     title: 'CORONA', 
        //     message: 'Successfully updated your Content resources!'
        // }]);

        module.exports.getCourseCP(responseJson.contents);
    })
    .catch((err) => {
        console.log(err)
    });
}

const getOthers = (id, username, api_key, savedUserData) => {
    var data = new FormData();
    data.append('user_id', id);
    data.append('username', username);
    data.append('api_key', api_key);

    Tools.fetch(Coronex.APIURL + '/Patients/others', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(responseJson => {
        if(responseJson.success) 
            module.exports.manageOthers(responseJson.others, savedUserData);
    })
    .catch(function(err) {
        console.log(err)
    });
}

const manageOthers = (others, savedUserData) => {
    let currentNotif = savedUserData.others.notifications;
    let newNotif = others.notifications;

    let checkNotifs = Tools.compare(currentNotif, newNotif);

    others.notifications = checkNotifs.current;

    savedUserData.others = others;
    saveUserData(JSON.stringify(savedUserData));

    if(checkNotifs.added.length > 0) {
        saveNewNotifications(JSON.stringify(checkNotifs.added))
    }

    Tools.pushNotif(checkNotifs.added)
}

const getCourseCP = async(contents) => {
    try {
        let data = await AsyncStorage.getItem('CORONA_COURSESCP');
        
        if(data == null)
            module.exports.manageCourseCP(contents);
        else 
            module.exports.manageCourseCP(contents, true, JSON.parse(data))
        

    } catch(error) {
        console.log(error)
    }
}

const manageCourseCP = (contents, addcp = false, current = []) => {
    var holder = current;

    for(var a = 0; a < contents.courses.length; a++) {
        if(addcp) {
            checker:
            for(var b = 0; b < current.length; b++) {
                if(contents.courses[a].title == current[b].title) {
                    break checker;
                }
    
                if(b == current.length-1) {
                    holder.push({
                        id: contents.courses[b].content_id,
                        title: contents.courses[b].title,
                        scroll: 0,
                        page: 0,
                    })
                }
            }

            console.log('Add New Checkpoints');
        } else {
            for(var a = 0; a < contents.courses.length; a++) {
                holder.push({
                    id: contents.courses[a].content_id,
                    title: contents.courses[a].title,
                    scroll: 0,
                    page: 0,
                })
            }

            console.log('Create Checkpoints');
        }
    }

    saveCoursesCP(JSON.stringify(holder))
}

export const configure = () => {
    // Configure it.
    BackgroundFetch.configure({
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        stopOnTerminate: false,   // <-- Android-only,
        startOnBoot: true,        // <-- Android-only,
        enableHeadless: true
    }, () => {
        console.log("Received background-fetch event");
        
        let localLogs = module.exports.getContentLogs();

        // Send offline Data if there are any then Get User Data then calls getOthers() function
        module.exports.checkOffData();

        // Get Online Locals passing Local Logs as Parameter then calls getContent() function
        module.exports.getLogs(localLogs);

        // Tools.pushNotif([
        //     {
        //         title: 'CORONA Background Service', 
        //         message: 'Run Background Service. Prefetch Images and Notifications'
        //     }
        // ]);
        
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);

    // Required: Signal completion of your task to native code
    // If you fail to do this, the OS can terminate your app
    // or assign battery-blame for consuming too much background-time
    }, (error) => {
        console.log("[js] RNBackgroundFetch failed to start: ", error);
    });
    
    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
        switch(status) {
            case BackgroundFetch.STATUS_RESTRICTED:
                console.log("BackgroundFetch restricted");
                break;
            case BackgroundFetch.STATUS_DENIED:
                console.log("BackgroundFetch denied");
                break;
            case BackgroundFetch.STATUS_AVAILABLE:
                console.log("BackgroundFetch is enabled");
                break;
        }
    });
}

module.exports = {
    configure: configure,
    getUserData: getUserData,
    getContentLogs: getContentLogs,
    getLogs: getLogs,
    getContent: getContent,
    getOthers: getOthers,
    manageOthers: manageOthers,
    getCourseCP: getCourseCP,
    manageCourseCP: manageCourseCP,
    checkOffData: checkOffData,
    sendBatch: sendBatch
}