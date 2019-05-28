import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
var moment = require('moment');

const surveyCheck = async(id, title, type) => {
    try {
        /* 
         * id: index of the survey in their respective array,
         * title: type of Survey, ex. K10 Weekly, Course 0 Pre, Course 3 Post
         * type: Weekly, Pre, Post
         * 
         * 1. Check first the CORONA_OFFDATA Storage if there exists already a 
         * answered survey. Prioritize the Offline data because it is more updated
         * compared to the Online data.
         * 2. Return true for Available survey (Pwede na sagutan, in the case
         * of Pre and Post Survey, Di pa nasasagutan) else false
        */

        // Alert.alert('RUNNING')
        let user_data = await AsyncStorage.getItem('CORONA_USERDATA');
        let offline_data = await AsyncStorage.getItem('CORONA_OFFDATA');
        let content_data = await AsyncStorage.getItem('CORONA_CONTENTS');

        // Parse to objects
        let user_parse = JSON.parse(user_data);
        let offline_parse = (offline_data == null) ? [] : JSON.parse(offline_data);
        let content_parse = JSON.parse(content_data);

        // Reverse data to get latest first
        offline_parse = offline_parse.reverse(); 

        // Get Survey info
        if(type === 'Weekly') {
            var surveys = content_parse.surveys;
            var survey_interval = content_parse.surveys[id].interval;
            var survey_name = content_parse.surveys[id].name;
        }

        let latest_timestamp = "";
        let weekly_match = false; 

        // If there are offline data saved, check if there is already a saved survey
        if(offline_parse.length != 0) {
            offline:
            for (var i in offline_parse) {  
                if(offline_parse[i].title == title) {
                    if(type != 'Weekly') {
                        return false;
                    }
                    else {
                        weekly_match = true;
                        latest_timestamp = offline_parse[i].timestamp;
                    }
                    
                    break offline;
                }
            }
        } 

        let others = user_parse.others;

        if(!weekly_match) {
            // No offline data, so just base on the latest timestamp given by the database
            switch(type) {
                case 'Weekly':
                    latest_timestamp = others.surveys[id];
                    break;
                case 'Pre':
                    return others.pre[id];
                case 'Post':
                    return others.post[id];
            }
        }

        if(latest_timestamp == "") {
            return false;
        }

        let current = moment(new Date());
        latest_timestamp = moment(latest_timestamp);

        let diff = current.diff(latest_timestamp, 'days');
        
        return diff < survey_interval;
    } catch(error) {
        console.log(error)
    }
}

const courseCheck = async(id) => {
    try {

        /* 
         * Deactivate only if OPEN NA and DI PA NAGPOPOST SURVEY
         * Mag open lang kung nasagutan na previous Post Survey, 
         * reach Interval, and di deactivated
         */

        let user_data = await AsyncStorage.getItem('CORONA_USERDATA');
        let content_data = await AsyncStorage.getItem('CORONA_CONTENTS');

        // Parse to objects
        let user_parse = JSON.parse(user_data);
        let content_parse = JSON.parse(content_data);

        let others = user_parse.others;

        let current = moment(new Date());
        let user_timestamp = moment(user_parse.timestamp);
        let course_interval = content_parse.courses[id].day_interval;

        let diff = current.diff(user_timestamp, 'days');
        
        let title = 'Course ' + (id - 1) + ' Post';
        let previousPostSurvey = false;

        if(id != 0){
            previousPostSurvey = await module.exports.survey(id - 1, title, 'Post')
        }

        // Need ng false para maging active yung course kasi disable={false}
        if(!(diff < course_interval) && !previousPostSurvey && others.courses_status == 1) {
            return false
        } else {
            return true
        }
    } catch(err) {
        console.log(err)
        // Alert.alert(err + '')
    }
}

module.exports = {
    survey: surveyCheck,
    course: courseCheck
}