import { AsyncStorage } from 'react-native';

export const saveDataIsLoggedIn = async (status) => {
    try {
        await AsyncStorage.setItem('CORONA_LOGGEDIN', status);
    } catch (error) {
        console.log(error)
    }
}

export const saveAppData = async (contents) => {
    try {
        await AsyncStorage.setItem('CORONA_APPDATA', contents);
    } catch (error) {
        console.log(error)
    }
}

export const saveLayout = async (contents) => {
    try {
        await AsyncStorage.setItem('CORONA_CONTENTS', contents);
    } catch (error) {
        console.log(error)
    }
}

export const saveUserData = async (data) => {
    try {
        await AsyncStorage.setItem('CORONA_USERDATA', data);
    } catch (error) {
        console.log(error)
    }
}

export const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem('CORONA_USERDATA');

        saveUserData("");
    } catch (error) {
        console.log(error)
    }
}

export const saveUserLogs = async (data) => {
    try {
        await AsyncStorage.setItem('CORONA_CONTENTLOGS', data);
    } catch (error) {
        console.log(error)
    }
}

export const saveOfflineData = async (data) => {
    try {
        await AsyncStorage.setItem('CORONA_OFFDATA', data);
    } catch (error) {
        console.log(error)
    }
}

export const removeOfflineData = async () => {
    try {
        await AsyncStorage.removeItem('CORONA_OFFDATA');
    } catch (error) {
        console.log(error)
    }
}

export const saveNewNotifications = async (data) => {
    try {
        let newData = JSON.parse(data);

        let notifications = await AsyncStorage.getItem('CORONA_NEWNOTIFICATIONS');
        let parseData = (notifications != null && notifications != "") ? JSON.parse(notifications) : [];

        for(var i in newData) {
            parseData.push(newData[i]);
        }

        await AsyncStorage.setItem('CORONA_NEWNOTIFICATIONS', JSON.stringify(parseData));
    } catch (error) {
        console.log(error)
    }
}

export const removeNewNotifications = async () => {
    try {
        await AsyncStorage.removeItem('CORONA_NEWNOTIFICATIONS');
    } catch (error) {
        console.log(error)
    }
}

export const saveCoursesCP = async (data) => {
    try {
        await AsyncStorage.setItem('CORONA_COURSESCP', data);
    } catch (error) {
        console.log(error)
    }
}

export const resetCoursesCP = async () => {
    try {
        let checkpoints = await AsyncStorage.getItem('CORONA_COURSESCP');
        let parseData = JSON.parse(checkpoints);

        let holder = [];

        for(var i in parseData) {
            parseData[i].scroll = 0;
            holder.push(parseData[i]);
        }

        this.saveCoursesCP(JSON.stringify(holder))
    } catch (error) {
        console.log(error)
    }
}