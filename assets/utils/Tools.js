import React from 'react';
import { ToastAndroid, Alert, Platform, Dimensions, AsyncStorage } from 'react-native';
import RF from 'react-native-responsive-fontsize';

import * as Content from '../../components/Contents';
import PushNotifications from './PushNotification';

const Notify = (message) => {
    if(Platform.OS === 'android') 
        ToastAndroid.show(message, ToastAndroid.SHORT)
    else if(Platform.OS === 'ios')
        Alert.alert(message)
}

const createNotifications = (notifs) => {
    for(var a = 0; a < notifs.length; a++) {
        PushNotifications.notify(notifs[a].title, notifs[a].message)
    }
}

const stripslashes = (str) => {
    //       discuss at: http://locutus.io/php/stripslashes/
    //      original by: Kevin van Zonneveld (http://kvz.io)
    //      improved by: Ates Goral (http://magnetiq.com)
    //      improved by: marrtins
    //      improved by: rezna
    //         fixed by: Mick@el
    //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //         input by: Rick Waldron
    //         input by: Brant Messenger (http://www.brantmessenger.com/)
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //        example 1: stripslashes('Kevin\'s code')
    //        returns 1: "Kevin's code"
    //        example 2: stripslashes('Kevin\\\'s code')
    //        returns 2: "Kevin\'s code"
  
    return (str + '')
      .replace(/\\(.?)/g, function (s, n1) {
        switch (n1) {
          case '\\':
            return '\\'
          case '0':
            return '\u0000'
          case '':
            return ''
          default:
            return n1
        }
      })
}

const toCamelCase = (str) => {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, " ");
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function(a,b,c) {
        return b.trim()+c.toUpperCase();
    });

    return str;
};

const arrayCompare = (current, newData) => {
    let added = [];

    if(current.length != 0) {
        for (var a = 0; a < newData.length; a++) {
            checker: 
            for(var b = 0; b < current.length; b++) {
                if(newData[a].notif_id == current[b].notif_id) {
                    break checker;
                }
    
                if(b == current.length-1) {
                    current.push(newData[a]);
                    added.push(newData[a]);
                }
            }
        }
    } else {
        current = newData;
        added = newData;
    }

    return {
        current: newData,
        added: added
    }
}

const Moduler = (source) => {
    let displayModule = [];

    for(var a = 0; a < source.length; a++) {
        switch(source[a].layout) {
            case 1:
                displayModule.push(
                    <Content.LayoutOne
                        key={a}
                        title={source[a].title}
                        subtitle={source[a].subtitle}
                        content={source[a].content}
                        image={source[a].image} />
                )
                break;
            case 2:
                displayModule.push(
                    <Content.LayoutTwo
                        key={a}
                        content={source[a].content} 
                        notes={source[a].notes}
                        image={source[a].image} />
                )
                break;
            case 3:
                displayModule.push(
                    <Content.LayoutThree
                        key={a}
                        title={source[a].title}
                        subtitle={source[a].subtitle}
                        content={source[a].content} 
                        notes={source[a].notes}
                        image={source[a].image} />
                )
                break;
            case 4:
                displayModule.push(
                    <Content.LayoutFour
                        key={a}
                        title={source[a].title}
                        subtitle={source[a].subtitle}
                        content={source[a].content}
                        image={source[a].image} />
                )
                break;
            case 5:
                displayModule.push(
                    <Content.LayoutFive
                        key={a}
                        title={source[a].title}
                        subtitle={source[a].subtitle}
                        header={source[a].header}
                        content={source[a].content}
                        image={source[a].image} />
                )
                break;
            case 6:
                displayModule.push(
                    <Content.LayoutSix
                        key={a}
                        title={source[a].title}
                        subtitle={source[a].subtitle}
                        header={source[a].header}
                        content={source[a].content}
                        image={source[a].image} />
                )
                break;
            case 7:
                displayModule.push(
                    <Content.LayoutSeven
                        key={a}
                        header={source[a].header}
                        content={source[a].content}
                        multiple={source[a].multiple}
                        image={source[a].image} />
                )
                break;
            case 8:
                displayModule.push(
                    <Content.LayoutEight
                        key={a}
                        title={source[a].title}
                        headerOne={source[a].headerOne}
                        contentOne={source[a].contentOne}
                        headerTwo={source[a].headerTwo}
                        contentTwo={source[a].contentTwo}
                        image={source[a].image} />
                )
                break;
            case 9:
                displayModule.push(
                    <Content.LayoutNine
                        key={a}
                        title={source[a].title}
                        header={source[a].header}
                        content={source[a].content}
                        multiple={source[a].multiple}
                        image={source[a].image} />
                )
                break;
            case 10:
                displayModule.push(
                    <Content.LayoutTen
                        key={a}
                        title={source[a].title}
                        content={source[a].content}
                        headerOne={source[a].headerOne}
                        multipleOne={source[a].multipleOne}
                        headerTwo={source[a].headerTwo}
                        multipleTwo={source[a].multipleTwo}
                        image={source[a].image} />
                )
            break;
        }
    }

    return displayModule;
}

const timeoutableFetch = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

const JSONtoFormData = (data) => {
    var formData = new FormData();

    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
}
 
const isIphoneX = () => {
    let d = Dimensions.get('window');
    const { height, width } = d;
  
    return (
      // This has to be iOS duh
      Platform.OS === 'ios' &&
  
      // Accounting for the height in either orientation
      (height === 812 || width === 812)
    );
}

const validate = (input, value, type) => {
    var regex = null;

    // ^ - start of string
    // (?=.*\d) - require at least one digit
    // (?=.*[a-z]) - require at least a lowercase ASCII letter
    // (?=.*[A-Z]) - require at least 1 ASCII uppercase letter
    // [\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{6,8} - match (=consume) 6,8 characters only,symbols that are either alphanumeric, or _, or all those inside the character class
    // $ - end of string
    
    switch (type) {
        case 'email':
            regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            break;
        case 'username':
            regex = /([A-Z]{2})-[0-9]+/;
            break;
        case 'password':
            // regex = /^(?=.*\d)(?=.*[a-z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/;
            regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            break;
    }

    return {
        status: (value != "" && regex.test(value) == 1),
        message: (value == "") ? input + ' Required!' : 
                    (regex.test(value) != 1) ? 'Invalid ' + input + ' Format!' : ''
    }
}

// const fontSize = (number) => {
//     try {

//     } catch(e) {}
// }

const htmlFormat = (html) => {
    html = module.exports.stripslashes(html);       // Stripslashes from html
    html = module.exports.replaceCSS(html);             // Replace Web CSS to React Native styles
    html = html.split('<br /><br /><br /><br />');  // Split by 4 Breaklines

    return html;
}

const replaceCSS = (html) => {
    html = html.replace(/font-size/g, 'fontSize');

    return html;
}

const parseHTML = (html) => {
    html = html.replace(/\r/ig, "");
    html = html.replace(/\n/ig, "");
    html = html.replace(/(<([^>]+)>)/ig, "");
    html = html.replace(/<br \/>/g, '\n');

    return html;
}

const getFile = (url) => {
    let split = url.split('/');

    return split[split.length-1];
}

const getURL = (url) => {
    let split = url.split('/');

    return 'https://sitem.website/corona/uploads/app/' + split[split.length-1];
}

module.exports = {
    notify: Notify,
    pushNotif: createNotifications,
    stripslashes: stripslashes,
    camel: toCamelCase,
    compare: arrayCompare,
    moduler: Moduler,
    fetch: timeoutableFetch,
    jsonToFormData: JSONtoFormData,
    isIphoneX: isIphoneX,
    validate: validate,
    htmlFormat: htmlFormat,
    replaceCSS: replaceCSS,
    parseHTML: parseHTML,
    getFile: getFile,
    getURL: getURL
}