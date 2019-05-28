import React from 'react';
import { ListView, ToastAndroid, Alert, Platform } from 'react-native';

import * as Content from '../../components/Contents';
import PushNotifications from './PushNotification';

export const Modules = {
    ModuleOne: [
        {
            layout: 1,
            title: 'Page One Title',
            subtitle: 'This is the subtitle',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        },
        {
            layout: 4,
            title: 'Page Two Title',
            subtitle: 'This is the subtitle',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        },
        {
            layout: 3,
            title: 'Page Three Title',
            subtitle: 'This is the subtitle',            
            notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        },
        {
            layout: 2,            
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
            notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        }
    ],

    ModuleTwo: [
        {
            layout: 5,
            title: 'Page One Title',
            subtitle: 'This is the subtitle',    
            header: 'This is the header',     
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        },
        {
            layout: 8,
            title: 'Page Two Title',
            headerOne: 'This is the Header One',
            contentOne: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
            headerTwo: 'This is the Header Two',
            contentTwo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        },
        {
            layout: 6,
            title: 'Page Three Title',
            subtitle: 'This is the subtitle',    
            header: 'This is the header',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        },
        {
            layout: 7,            
            header: 'This is the header',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
            multiple: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio.\n\n2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio.\n\n3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio.\n\n4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio.\n\n5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio.',
        }
    ],

    ModuleThree: [
        {
            layout: 5,
            title: 'Page One Title',
            subtitle: 'This is the subtitle',    
            header: 'This is the header',     
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        },
        {
            layout: 8,
            title: 'Page Two Title',
            headerOne: 'This is the Header One',
            contentOne: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
            headerTwo: 'This is the Header Two',
            contentTwo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        },
        {
            layout: 9,
            title: 'Page Three Title',   
            header: 'This is the header',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
            multiple: '1. Lorem ipsum dolor sit amet.\n2. Lorem ipsum dolor sit amet.\n3. Lorem ipsum dolor sit amet.\n4. Lorem ipsum dolor sit amet.\n5. Lorem ipsum dolor sit amet.'
        },
        {
            layout: 10,            
            title: 'Page Four Title',  
            headerOne: 'This is the header',
            multipleOne: '\u2022 Lorem ipsum dolor sit amet.\n\u2022 Lorem ipsum dolor sit amet.\n\u2022 Lorem ipsum dolor sit amet.\n\u2022 Lorem ipsum dolor sit amet.',
            headerTwo: 'This is the header',
            multipleTwo: '\u2022 Lorem ipsum dolor sit amet.\n\u2022 Lorem ipsum dolor sit amet.\n\u2022 Lorem ipsum dolor sit amet.\n\u2022 Lorem ipsum dolor sit amet.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacus erat, posuere eget eros quis, lobortis placerat odio. Suspendisse aliquam enim orci, quis suscipit sapien lobortis eu.',
        }
    ],
}

export const Coronex = {

    APIURL: 'http://usthbci-icompass.com/corona/index.php/api',

    IMAGEURL: 'http://usthbci-icompass.com/corona/uploads',
    
    ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),

    Courses: [
        {
            title: 'What is Radiotherapy?',
            source: '/img/family.png',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 0</p></b><p style="fontSize: 22px;">RADIATION THERAPY</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/1.png" /><br /><b><p style="fontSize: 22px">What is Radiotherapy?</p></b><br /><br /><b>Radiation therapy, or radiotherapy, is the delivery of high-energy radiation to the cancerous tumor</b><br /><ul><li>Radiation damages the cancer cells and stops them from multiplying. It is carefully targeted to the cancerous tumor, but some exposure of normal tissues is unaviodable causing some side effects.</li><li>Dividing the total radiation dose into smaller daily doses allows the normal tissue to recover from the exposure.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/2.png" /><br /><b><p style="fontSize: 22px">How is Radiotherapy given?</p></b><br /><br /><b>For head and neck cancers, radiotherapy is commonly given through external beam radiation. It is given daily with weekend pauses, over six to seven weeks.</b><br /><br /><b>In preparation, you will undergo the process of immobilization and CT simulation.</b><br /><ul><li> A personalized immobilization device (face mask) will be crafted for you that will be used during your treatment.</li><li>This device is important to keep your head and neck steady to improve treatment accuracy</li><li>It is important to inform the radiation therapis if the fit is comfortable, as this will be used for all your subsequent treatments.</li></ul><b>CT simulation is needed to plan your radiation fields and ensure accuracy of the radiation target. The entire process will take approximately 1-2 hours.</b><br /><ul><li>The CT images acquired will be used for treatment volume and normal organ delineation and dose planning.</li><li>You may go home while your treatment plan is being completed, which will take 3-5 workng days.</li><li>The department receptionist will inform you of your tentative radiotherapy scheudle. This can be adjusted according to your preference.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/3.png" /><br /><br /><b>Don't worry and just relax because this procedure will only take about 15-30 minutes.</b><br /><br /><ul><li>While waiting for your schedule, you will be advised to see your dentist for dental and oral care prior to radiation treatment.</li><li>You may also be required to have a hearing check and some thyroid function tests. It is important for you to undergo these procedures without any delays.</li><li>The department receptionist will inform you of your tentative radiotherapy schedule. This can be adjusted according to your preference.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/4.png" /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/5.png" /><br /><br /><b>You won't see, smell, nor feel the radiation during the treatment. So remain calm and be attentive. Keep your head-and-neck region as still as possible. You will be alone in the chamber, but you will be monitored through an outside television.</b><br /><ul><li>Your radiotherapy session will be conducted in the treatment bunker, where you will be positioned as initially planned.</li><li>A verification radiograph will be done to assure the alignment prior to the delivery of the radiation.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/6.png" /><br /><b>Your radiation therapist can give instructions over the speaker. You can communicate using hand gestures, but remember not to place your hands in the target area.</b><br />`,
        },
        {
            title: 'Radiation Therapy Self-Care and Coping During',
            source: '/img/family.png',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 1</p></b><p style="fontSize: 22px;">SELF-CARE AND COPING DURING RADIATION TREATMENT</p><br /><b>What side effects might I experience during radiotherapy?</b><p>Irradiation in general can cause fatigue and loss of appetite. Radiation to the head and neck, in particular, can cause:</p><b>Side effects generally appear in the third week of radiotherapy and persist throughout the treatment. Proper self-care and nutrition can maximize further injury and provide your body with necessary support to cope and adjust to these changes.</b><br /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/7.png" /><br /><br /><b>These side effects may vary depending on the primary site of cancer, hence, the area of radiation.</b><br /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/8.png" /><br /><p style="fontSize: 24px;">How do I best manage these side effects?</p><p>You are likely to develop the above symptoms due to radiotherapy. Other causes remain possible, such as the tumor itself, chemotherapy, other medication or other disease processes.</p><b>Presenting yourself for weekly check-ups during treatment and reporting as well as you can how you are really feeling will enable your radiation oncologist to advise you how to manage your symptom and give you treatment for your situation.</b><p><b style="color: #ffbd5d">Symptom scoring tools</b> can aid you, your family and caregiver, and the radiation team in understanding your symptoms. You can make use of these tools in the survey tool in the side menu</p><br /><br /><b><p style="fontSize: 18px">A. FATIGUE</p></b><br /><br /><b><p style="fontSize: 16px">Tiredness or lack of energy is usually due to several causes with interplaying mechanisms such as:</p></b><br /><ol><li>Tumor-related symptoms and its effects on eating habits and nutrition.</li><li>Head-and-neck radiotherapy-related symptoms affecting eating habits, appetite and nutrition.</li><li>Chemotherapy-related decrease in blood counts</li><li>Treatment and cancer-related pain</li><li>General fatigue from the daily protracted treatment schedule</li><li>Psychological distress</li></ol><i>(Serra, Bennett, Carper, Fox, & Resnick, 2014)</i><br /><ul><li>Fatigue management during head and neck treatment requires treatment of any identifiable specific cause.</li><li>The feeling of fatigue will go away after treatment once the body has recovered from its side effects.</li><li>Afterwards, you may perform your usal physical activity and work.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/9.png" /><br /><br /><b>Make sure that you are getting enough rest and sleep and proper nutrition. Having a positive outlook and maintaining a healthy relationship with your family and friends can greatly help you in coping with fatigue and other elects of your cancer and its treatment.</b><br /><p style="fontSize: 17px">It is very important that you stop smoking right away and permanently. Smoking can interfere with proper oxygenation, can worsen fatigue, and interfere with your treatment and recovery. If you have housemates or workmates who smoke, encourage them to stop or refrain from doing so whenever you are around.</p><br /><b><p style="fontSize: 16px">Never hesitate to seek counseling if you feel that you are too anxious, distressed or saddened because these can add to your fatigue.</p></b><br /><br /><b><p style="fontSize: 16px">Make sure that you eat enough and properly</p></b><br /><br /><b><p style="fontSize: 16px">Acquiring good nutrition will help your organs repair and recover better.</p></b><p style="fontSize: 16px"><b>Malnutrition can slow down or prevent proper organ repair</b><i> (Blanco & Chao, 2006)</i><p><br /><b><p style="fontSize: 18px">A. NUTRITION RELATED PROBLEMS</p></b><br /><br /><b style="color: #ffbd5d">Lack of Appetite</b><p>Lack of appetite is the effect of the humor and its treatment on organs, making it hard for patients to eat foods.</p><p>Causes of lack of appetite during radiotherapy are the following:</p><ol><li>Tumor Paint</li><li>Loss of smell</li><li>Loss of alteration of taste</li><li>Dry mouth</li><li>Nausea and vomiting</li><li>Choking</li><li>Difficulty or pain with swallowing</li><li>Development of tooth and mouth problems <i>(Cukier, 2005)</i></li></ol><br /><b>Make sure that you eat enough and properly. Acquiring good nutrition will help your organs repair and recover better. Malnutrition can slow down or prevent proper organ repair (Blanco & Chao, 2006)</b><br /><br /><b>Try to consume nutrient dense food to counteract the effects of appetite loss on nutritional status. Try to always eat with the company of family or friends</b><br /><br /><br /><b style="color: #ffbd5d">Loss or Alteration of Taste</b><p>Loss or alteration of taste may be due to loss of smell, damage to the taste buds and/or mouth dryness.</p><p>This usually appears during your 3rd week of treatment <i>(Rosenthal, et al., 2014)</i>, or earlier if you are receiving chemotherapy at the same time</p><br /><b>If you are undergoing chemotherapy and it makes you feel awful, it might be helpful to avoid foods that you really enjoy during chemotherapy to avoid associating these foods with the chemotherapy effects.</b><br /><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><br /><b style="color: #ffbd5d">Dry Mouth</b><p>During the third week of your treatment, you will experience dry mouth. This is caused by the radiation damage to the salivary glands. <i>(Rosenthal, et al., 2014)</i></p><br /><br /><b style="color: #ffbd5d">Choking</b><p>Choking is due to impairment of the mechanism that seals the air passages from the food passages. Radiotherapy-related choking is due to swelling of the organs of the sealing mechanism, making them flabby and move slowly. This may appear during your third week of treatment. <i>(Blanco & Chao, 2006)</i><p><b>Swallow like a bird: extend your neck by pointing your chin up when you swallow.</b><br /><b>Swallow twice to ensure that any pooled saliva or food at the back of the throat has been drained and pushed down into the esophagus</b><br /><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><b style="color: #ffbd5d">Nausea and Vomiting</b><p>Nausea and vomiting happends due to chemotherapy, which is commonly given at the same time as radiotherapy. <i>(Cukier, 2005)</i></p><br /><b style="color: #ffbd5d">Oral sores and dental problems</b><p>Radiation damages the lining of the mouth, resulting in oral sores or ulcers. The <b style="color: #ffbd5d">lack of saliva</b> results in the loss of its antibacterial and acid-regulating effects, leaing to infections and increased fragility of teeth. <i>(Hofstede, Martin, Lemon, & Chambers, 2014)</i>.</p><b>It is extremely important to see your dentist prior to starting head-and-neck radiotherapy to ensure that your teeth and your mouth are resolved to their best health.</b><br /><br /><b>If you have undergone dental extraction or some other invasive dental procedure, a minimum of two weeks is required prior to starting radiation to allow for tissue healing.</b><i>(Blanco & Chao, 2006)</i><br /><br /><b>If you see white plaques in your mouth, have your radiation oncologist look at them. These can be fungal plaques and may bleed if picked.</b><br /><br /><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><br /><b><p style="fontSize: 18px">C. SKIN RELATED PROBLEMS</p></b><p>Radiation burn, like sunburn, damages the deeper skin layers that replace the replace the overlying layers of dead skin.</p><p>After two weeks of treatment, your skin may feel <b>warm and red like a mild sunburn</b>. A week later, it may appear darker, feel dry and itchy and begin to peel. With continuing radiation, the skin may peel leaving a raw, moist area. <br /><i>(Serra, Bennett, Carper, Fox, & Resnick, 2014)</i></p><b>Remember, skin reaction is expected, temporary, and reversible. By observing proper skin care, this can lessen the severity, promote healing, and prevent complications and radiation treatment breaks.</b><br /><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b>   <br /><br /><b style="color: #ffbd5d">Hair Loss</b><p>Radiotherapy-related hair loss is secondary to damage to the <b style="color: #ffbd5d">hair follicle</b> and is limited only to the area within the radiation field.</p><p>Hair is expected to grow back after several months, but may be of a different quality than before. in areas irradiated to rather high doses, hair may not grow back at all and the sweat glands are permanently damages leaving patches of sweat-less skin.</p><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b>   <br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/10.png" /><br /><br /><b><p style="fontSize: 18px">D. VOICE CHANGES</p></b><p style="fontSize: 16px"><b>Radiotherapy</b> to the head and neck may have an effect on your voice.</p><ul><li>Your voice may become hoarse or husky if the voice box is included in the radiotherapy area for cancers of the larynx. It may even completely dissappear for a while during and after radiotherpay, but should come back within a few weeks after treatment. Your voice quality, however, may never get back to what it was befire radiotherapy.</li><li>Radiation to other head and cancer sites might also result in voice changes during, and for a few weeks after the treatment. You should expect your voice to eventually go back to normal some time after the end of radiotherapy.</li></ul><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b> <br /><br /><br /><b><p style="fontSize: 18px">E. SLEEP DISTURBANCES</p></b><p>Do you know that sleep disturbance can contribute to fatigue? This can be due to hormonal changes, tumor of treatement-related pain, or troubles with oral or airway scretions. <br /><i>(Shuman, A., Duffy, S., Ronix, D., Garetz, S., Mclean, S., Fowler, KL, & Terrell, J., 2010)</i></p><b>Always work with your doctor in controlling your pain. Keep a pain diary so your doctor can help you with your pain medications.</b><br /><b>Try to elevate the head of your bed, or sleep in a recliner if you have difficulty clearing mucus, saliva, or phlegm to minimize sleep disturbance. Use a humidifier or vaporizer in your bedroom to help thin or liquefy the secretions that thicken during radiation.</b><br /><br /><br /><b><p style="fontSize: 18px">F. COPING WITH YOUR EMOTIONS</p></b><br /><ul><li>Let your family of friends help you. Find spiritual guidance through prayer or meditation, or talk to your parish counselor or you specified religious leader.</li><li>Express your feelings by talking, keeping a diary or even drawing a picture.</li><li>Take walks or exercise, with your doctor's consent.</li><li>Find support groups of other cancer patients and families to learn new ways to cope and to talk about your treatment.</li><li>Take special care of yourself by getting plenty of time to rest and think and by eating a healthy diet.</li><li>Talk to your doctor or other health care professional about help.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/11.png" />`,
        },
        {
            title: 'Radiation Therapy Self-Care and Coping After',
            source: '/img/neck1.png',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 2</p></b><p style="fontSize: 22px;">SELF-CARE AND COPING AFTER RADIATION TREATMENT</p><p>When might I expect the side effects of radiotherapy to go away?</p><p> Although some side effects may start to go away once you have completed your treatment, some may continue or oocur <b style="color: #ffbd5d">several weeks after radiation therapy.</b></p><b>Skin reactions, and mouth sores usually begin to subside two weeks after the completion of your treatment and resolve completely within six weeks.</b><br /><br /><b>Mouth dryness and altered taste may continue to improve over the next <b style="color: #ffbd5d">six months to one year</b>, then stabilize and persist, if not worsen after, Sometimes, these changes do not entirely return to the way they were before treatment.</b><br /><br /><b>In the first three weeks after your treatment, communicate to your doctor if you have any of the following: persistent pain (not relieved by over-the-counter drugs or other remedy), fever, severe, nausea and/or vomiting, or inability to feed.</b><br /><br /><b>With proper self-care, coping skills training and regular follow-up, you can speed up and maximize your recovery, adequately compensate, and adjust to treatment, compensate, and adjust to treatment-relate changes to minimize complications, and help your doctor detect and manage complications early.</b><br /><br /><b>It is absolutely important to stop smoking and to get proper nutrition to maximize recovery from the side effects of the treatment.</b><br /><br /><b>Avoid alcoholic beverages (including wine) during the first three months of treatment and for so long as your doctor advises you so.</b><br /><br /><br /><b style="color: #ffbd5d">Dry Mouth and Oral and Dental Health</b><p>Mouth dryness can cause changes in the mouth, making it fragile and prone to infection and tooth damage. Thus, it is important for you to see your dentist on the regular basis (every 3-4 months) to maintain oral and dental hygiene. You will have to take special care of your mouth for the rest of your life.</p><br /><b>Dental extractions after head and neck radiotherapy are avoided as much as possible due to possible complications, namely:</b><br /><ul><li><b>delayed wound healing</b></li><li><b>infections</b></li><li><b>osteoradionecrosis</b></li></ul><p>Among these, <b style="color: #ffbd5d">osteoradionecrosis</b> is the most dreaded potential problem. It is characterized as a nonhealing area of the bone that has a high likelihood of occuring after dental extraction in an irradiated jaw.<p><b>This further emphasizes the need for taking special care of your teeth to prevent the need for dental extractions</b><br /><i>(Hofstede, Martin, Lemon, & Chambers, 2014)</i></p><br /><b style="color: #ffbd5d">Difficulty Swallowing and Choking</b><p><b>Pain in <b style="color: #ffbd5d">swallowing</b> usually improves when your mouth and throat sores disappear. Your doctor may require you to undergo a <b style="color: #ffbd5d">barium swallow</b>, to evaluate your swallowing mechanism, and to make sure there is no abnormal passage between the air and food pipes (fistula) caused by the treatment.</b> <i>(Cukier, 2005)</i></p><p style="fontSize: 18px;">As soon as the mouth and throat sores disappear and the barium swallow shows no fistula, you may start trying to shift back to normal food.</p><b>If you had a nasogastric of stomach tube inserted, ask your doctor wheter you can still eat through your mouth, It will be useful and advisable to keep trying to eat by mouth and resume normal feeding to recover and maintain your throat function.</b><b>Pain in the throat may persist in some patients possible due to:</b><br /><ul><li><b>incomplete resolution of swelling</b></li><li><b>acid reflux disease</b></li><li><b><b style="color: #ffbd5d">globus sensation</b> - feeling that there is something stuck in the throat but without an actual physical obstruction</b></li></ul><p>In such cases, consultation with your competent head and neck surgeon is recommended and further workup like <b style="color: #ffbd5d">flexible laryngoscopy and/or functional endoscopic evaluation</b> of swallowing (FESS) may be warranted</p><b>If you still choke or cough when you swallow, swallow like a bird: extend your neck by pointing you chin up when you swallow. Swallow twice. This will ensure that any pooled saliva of food at the back of the throat has been drained and pushed down into the esophagus</b> <br /><br /><b style="color: #ffbd5d">Swallowing Therapy</b><p>Swallowing problem may be due to scar ir hardened muscles of your mouth and throat. By doing swallowing exercises, it may help reduce the risk of having permanent difficulty in swallowing.</p><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><br /><b style="color: #ffbd5d">Hypothyroidism</b><br /><br /><b>Some survivors suffer from hypothyroidism, due to damage to the thyroid gland during treatment.</b><p>The symptoms include weight gain, constipation, dry skin, sensitivity to cold, and sleep disturbances. With thyroid medication, these ide effects can be managed. If necessary, you will be advised to have thyroid function tests done every 6 months after treatment. <i>(Cukier, 2005)</i></p><b style="color: #ffbd5d">Hearing Loss</b><p>Gradual but permanent hearing loss due to damage to the hearing apparatus may occur with combined radiation and platinum-based chemotherapy. Audiometric exams are done before the treatment and regular afterwards to monitor hearing loss. Cochlear implants maybe one way to remedy when hearing loss happens. <i>(Curier, 2005)</i></p><b style="color: #ffbd5d">Mouth and Jaw Stiffnees (Trismus)</b><p><b>Irradiated muscles or joints in the mouth area may become stiff as early as one year after treatment. This may lead initially to pain on jaw opening, then eventually to difficulty or inability to open the mouth, also known as <b style="color: #ffbd5d">trismus.</b></b><i>("Perventing Trismus | Memorial Sloan Kettering Cancer Center")(Rose, T., Center Leco, P., Wilson, J., 2009)</i></p><b style="fontSize: 18px;">Trismus is difficult to reverse and may be progressive;thus, regular jaw exercises are very important.</b><br /><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><br /><b style="color: #ffbd5d">Neck and Shoulder Exercises</b><p><b>Irradiation of the neck muscles can make them stiff. This can lead to inability to turn your head sideways and move it up and down, as well as inability to shrug your shoulders.</b> <i>(Dunphy, 2015)</i><p><b style="fontSize: 18px;">Neck stiffness is difficult to reverse and may be progressive, thus regular exercise is necessary.</b><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><b style="color: #ffbd5d">Speech Therapy</b><br /><b>The Apolinario Mabini Rehabilitation Center of the University of Santo Tomas Hospital offers a variety of services aimed at helping patients with speech problems. Head and neck cancer patients with this handicap are not an exception.</b><br /><br /><b>The problem areas treated are disorders of:</b><br /><ul><li><b>Speech</b></li><li><b>Articulation</b></li><li><b>Fluency: Stuttering</b></li><li><b>Voice</b></li><li><b>Language</b></li></ul><p style="fontSize: 18px;">Drills are designed, that patiens practice to address a specific problem; compensatory techniques are taught to facilitate precise vowel/consonant production; alternate communication pathways to natural speech are provided, including patients with tracheostomy.</p><p>Thus, speech therapy can be applied in:</p><ul><li>Remediation or impairments in <b>speech</b>, comprehension, reading and writing</li><li>Evaluation of the <b>swallowing</b> mechanism, with subsequent recommendations and implementation of feeding regimens</li><li>Intervention for pragmatic and <b>congnitive-based</b> communicative disorders</li><li>Motor-speech treatment</li><li>Training of patients requiring augmentative communication approaches, including use of <b>high-technology devices</b></li></ul>`,
        },
        {
            title: 'Radiation Treatment Follow-up After Radiation',
            source: '/img/Hands.png',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 3</p></b><p style="fontSize: 22px;">FOLLOW-UP AFTER RADIATION</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/12.png" /><br /><b><p style="fontSize: 18px">After your treatment, you're now ready to get back to your "new" normal life.</p></b><p><b style="color: #ffbd5d">Physical and emotional changes</b> brought by illness can linger for years or a lifetime. A follow-up care program is important to help you cope with these changes.</p><p>Your follow-up treatment plan wil include:</p><ul><li>Regular physical exams with an overview of your recent medical history.</li><li>Monitoring for early detection of new or returning cancers.</li><li>Management of cancer and treatment-related side elects.</li><li>Lifestyle coaching and tips to help reduce cancer risk.</li><li>Referrals to community resources and support groups.</li></ul><br /><b style="fontSize: 18px;">You can also help other cancer patients by volunteering as a patient advocate.</b><br /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/12.png" />`,
        },
        {
            title: 'Radiation Therapy Self-Care and Coping After',
            source: '/img/family.png',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 2</p></b><p style="fontSize: 22px;">SELF-CARE AND COPING AFTER RADIATION TREATMENT</p><p>When might I expect the side effects of radiotherapy to go away?</p><p> Although some side effects may start to go away once you have completed your treatment, some may continue or oocur <b style="color: #ffbd5d">several weeks after radiation therapy.</b></p><b>Skin reactions, and mouth sores usually begin to subside two weeks after the completion of your treatment and resolve completely within six weeks.</b><br /><br /><b>Mouth dryness and altered taste may continue to improve over the next <b style="color: #ffbd5d">six months to one year</b>, then stabilize and persist, if not worsen after, Sometimes, these changes do not entirely return to the way they were before treatment.</b><br /><br /><b>In the first three weeks after your treatment, communicate to your doctor if you have any of the following: persistent pain (not relieved by over-the-counter drugs or other remedy), fever, severe, nausea and/or vomiting, or inability to feed.</b><br /><br /><b>With proper self-care, coping skills training and regular follow-up, you can speed up and maximize your recovery, adequately compensate, and adjust to treatment, compensate, and adjust to treatment-relate changes to minimize complications, and help your doctor detect and manage complications early.</b><br /><br /><b>It is absolutely important to stop smoking and to get proper nutrition to maximize recovery from the side effects of the treatment.</b><br /><br /><b>Avoid alcoholic beverages (including wine) during the first three months of treatment and for so long as your doctor advises you so.</b><br /><br /><br /><b style="color: #ffbd5d">Dry Mouth and Oral and Dental Health</b><p>Mouth dryness can cause changes in the mouth, making it fragile and prone to infection and tooth damage. Thus, it is important for you to see your dentist on the regular basis (every 3-4 months) to maintain oral and dental hygiene. You will have to take special care of your mouth for the rest of your life.</p><br /><b>Dental extractions after head and neck radiotherapy are avoided as much as possible due to possible complications, namely:</b><br /><ul><li><b>delayed wound healing</b></li><li><b>infections</b></li><li><b>osteoradionecrosis</b></li></ul><p>Among these, <b style="color: #ffbd5d">osteoradionecrosis</b> is the most dreaded potential problem. It is characterized as a nonhealing area of the bone that has a high likelihood of occuring after dental extraction in an irradiated jaw.<p><b>This further emphasizes the need for taking special care of your teeth to prevent the need for dental extractions</b><br /><i>(Hofstede, Martin, Lemon, & Chambers, 2014)</i></p><br /><b style="color: #ffbd5d">Difficulty Swallowing and Choking</b><p><b>Pain in <b style="color: #ffbd5d">swallowing</b> usually improves when your mouth and throat sores disappear. Your doctor may require you to undergo a <b style="color: #ffbd5d">barium swallow</b>, to evaluate your swallowing mechanism, and to make sure there is no abnormal passage between the air and food pipes (fistula) caused by the treatment.</b> <i>(Cukier, 2005)</i></p><p style="fontSize: 18px;">As soon as the mouth and throat sores disappear and the barium swallow shows no fistula, you may start trying to shift back to normal food.</p><b>If you had a nasogastric of stomach tube inserted, ask your doctor wheter you can still eat through your mouth, It will be useful and advisable to keep trying to eat by mouth and resume normal feeding to recover and maintain your throat function.</b><b>Pain in the throat may persist in some patients possible due to:</b><br /><ul><li><b>incomplete resolution of swelling</b></li><li><b>acid reflux disease</b></li><li><b><b style="color: #ffbd5d">globus sensation</b> - feeling that there is something stuck in the throat but without an actual physical obstruction</b></li></ul><p>In such cases, consultation with your competent head and neck surgeon is recommended and further workup like <b style="color: #ffbd5d">flexible laryngoscopy and/or functional endoscopic evaluation</b> of swallowing (FESS) may be warranted</p><b>If you still choke or cough when you swallow, swallow like a bird: extend your neck by pointing you chin up when you swallow. Swallow twice. This will ensure that any pooled saliva of food at the back of the throat has been drained and pushed down into the esophagus</b> <br /><br /><b style="color: #ffbd5d">Swallowing Therapy</b><p>Swallowing problem may be due to scar ir hardened muscles of your mouth and throat. By doing swallowing exercises, it may help reduce the risk of having permanent difficulty in swallowing.</p><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><br /><b style="color: #ffbd5d">Hypothyroidism</b><br /><br /><b>Some survivors suffer from hypothyroidism, due to damage to the thyroid gland during treatment.</b><p>The symptoms include weight gain, constipation, dry skin, sensitivity to cold, and sleep disturbances. With thyroid medication, these ide effects can be managed. If necessary, you will be advised to have thyroid function tests done every 6 months after treatment. <i>(Cukier, 2005)</i></p><b style="color: #ffbd5d">Hearing Loss</b><p>Gradual but permanent hearing loss due to damage to the hearing apparatus may occur with combined radiation and platinum-based chemotherapy. Audiometric exams are done before the treatment and regular afterwards to monitor hearing loss. Cochlear implants maybe one way to remedy when hearing loss happens. <i>(Curier, 2005)</i></p><b style="color: #ffbd5d">Mouth and Jaw Stiffnees (Trismus)</b><p><b>Irradiated muscles or joints in the mouth area may become stiff as early as one year after treatment. This may lead initially to pain on jaw opening, then eventually to difficulty or inability to open the mouth, also known as <b style="color: #ffbd5d">trismus.</b></b><i>("Perventing Trismus | Memorial Sloan Kettering Cancer Center")(Rose, T., Center Leco, P., Wilson, J., 2009)</i></p><b style="fontSize: 18px;">Trismus is difficult to reverse and may be progressive;thus, regular jaw exercises are very important.</b><br /><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><br /><b style="color: #ffbd5d">Neck and Shoulder Exercises</b><p><b>Irradiation of the neck muscles can make them stiff. This can lead to inability to turn your head sideways and move it up and down, as well as inability to shrug your shoulders.</b> <i>(Dunphy, 2015)</i><p><b style="fontSize: 18px;">Neck stiffness is difficult to reverse and may be progressive, thus regular exercise is necessary.</b><br /><b><p style="fontSize: 12px; color: #ababab">Go to tips section, under general care option for the do's and don't when experiencing this.</p></b><br /><br /><b style="color: #ffbd5d">Speech Therapy</b><br /><b>The Apolinario Mabini Rehabilitation Center of the University of Santo Tomas Hospital offers a variety of services aimed at helping patients with speech problems. Head and neck cancer patients with this handicap are not an exception.</b><br /><br /><b>The problem areas treated are disorders of:</b><br /><ul><li><b>Speech</b></li><li><b>Articulation</b></li><li><b>Fluency: Stuttering</b></li><li><b>Voice</b></li><li><b>Language</b></li></ul><p style="fontSize: 18px;">Drills are designed, that patiens practice to address a specific problem; compensatory techniques are taught to facilitate precise vowel/consonant production; alternate communication pathways to natural speech are provided, including patients with tracheostomy.</p><p>Thus, speech therapy can be applied in:</p><ul><li>Remediation or impairments in <b>speech</b>, comprehension, reading and writing</li><li>Evaluation of the <b>swallowing</b> mechanism, with subsequent recommendations and implementation of feeding regimens</li><li>Intervention for pragmatic and <b>congnitive-based</b> communicative disorders</li><li>Motor-speech treatment</li><li>Training of patients requiring augmentative communication approaches, including use of <b>high-technology devices</b></li></ul>`,
        },
        {
            title: 'Radiation Treatment Follow-up After Radiation',
            source: '/img/neck1.png',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 3</p></b><p style="fontSize: 22px;">FOLLOW-UP AFTER RADIATION</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/12.png" /><br /><b><p style="fontSize: 18px">After your treatment, you're now ready to get back to your "new" normal life.</p></b><p><b style="color: #ffbd5d">Physical and emotional changes</b> brought by illness can linger for years or a lifetime. A follow-up care program is important to help you cope with these changes.</p><p>Your follow-up treatment plan wil include:</p><ul><li>Regular physical exams with an overview of your recent medical history.</li><li>Monitoring for early detection of new or returning cancers.</li><li>Management of cancer and treatment-related side elects.</li><li>Lifestyle coaching and tips to help reduce cancer risk.</li><li>Referrals to community resources and support groups.</li></ul><br /><b style="fontSize: 18px;">You can also help other cancer patients by volunteering as a patient advocate.</b><br /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/12.png" />`,
        },
    ], 

    Tips: [
        {
            title: 'General Care',
            source: '/img/cereal.jpg',
            description: 'General Needs and Care',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 0</p></b><p style="fontSize: 22px;">RADIATION THERAPY</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/1.png" /><br /><b><p style="fontSize: 22px">What is Radiotherapy?</p></b><br /><br /><b>Radiation therapy, or radiotherapy, is the delivery of high-energy radiation to the cancerous tumor</b><br /><ul><li>Radiation damages the cancer cells and stops them from multiplying. It is carefully targeted to the cancerous tumor, but some exposure of normal tissues is unaviodable causing some side effects.</li><li>Dividing the total radiation dose into smaller daily doses allows the normal tissue to recover from the exposure.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/2.png" /><br /><b><p style="fontSize: 22px">How is Radiotherapy given?</p></b><br /><br /><b>For head and neck cancers, radiotherapy is commonly given through external beam radiation. It is given daily with weekend pauses, over six to seven weeks.</b><br /><br /><b>In preparation, you will undergo the process of immobilization and CT simulation.</b><br /><ul><li> A personalized immobilization device (face mask) will be crafted for you that will be used during your treatment.</li><li>This device is important to keep your head and neck steady to improve treatment accuracy</li><li>It is important to inform the radiation therapis if the fit is comfortable, as this will be used for all your subsequent treatments.</li></ul><b>CT simulation is needed to plan your radiation fields and ensure accuracy of the radiation target. The entire process will take approximately 1-2 hours.</b><br /><ul><li>The CT images acquired will be used for treatment volume and normal organ delineation and dose planning.</li><li>You may go home while your treatment plan is being completed, which will take 3-5 workng days.</li><li>The department receptionist will inform you of your tentative radiotherapy scheudle. This can be adjusted according to your preference.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/3.png" /><br /><br /><b>Don't worry and just relax because this procedure will only take about 15-30 minutes.</b><br /><br /><ul><li>While waiting for your schedule, you will be advised to see your dentist for dental and oral care prior to radiation treatment.</li><li>You may also be required to have a hearing check and some thyroid function tests. It is important for you to undergo these procedures without any delays.</li><li>The department receptionist will inform you of your tentative radiotherapy schedule. This can be adjusted according to your preference.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/4.png" /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/5.png" /><br /><br /><b>You won't see, smell, nor feel the radiation during the treatment. So remain calm and be attentive. Keep your head-and-neck region as still as possible. You will be alone in the chamber, but you will be monitored through an outside television.</b><br /><ul><li>Your radiotherapy session will be conducted in the treatment bunker, where you will be positioned as initially planned.</li><li>A verification radiograph will be done to assure the alignment prior to the delivery of the radiation.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/6.png" /><br /><b>Your radiation therapist can give instructions over the speaker. You can communicate using hand gestures, but remember not to place your hands in the target area.</b><br />`,
        },
        {
            title: 'Nutrition Maintenance',
            source: '/img/cereal.jpg',
            description: 'Prevention of significant weight loss',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 0</p></b><p style="fontSize: 22px;">RADIATION THERAPY</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/1.png" /><br /><b><p style="fontSize: 22px">What is Radiotherapy?</p></b><br /><br /><b>Radiation therapy, or radiotherapy, is the delivery of high-energy radiation to the cancerous tumor</b><br /><ul><li>Radiation damages the cancer cells and stops them from multiplying. It is carefully targeted to the cancerous tumor, but some exposure of normal tissues is unaviodable causing some side effects.</li><li>Dividing the total radiation dose into smaller daily doses allows the normal tissue to recover from the exposure.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/2.png" /><br /><b><p style="fontSize: 22px">How is Radiotherapy given?</p></b><br /><br /><b>For head and neck cancers, radiotherapy is commonly given through external beam radiation. It is given daily with weekend pauses, over six to seven weeks.</b><br /><br /><b>In preparation, you will undergo the process of immobilization and CT simulation.</b><br /><ul><li> A personalized immobilization device (face mask) will be crafted for you that will be used during your treatment.</li><li>This device is important to keep your head and neck steady to improve treatment accuracy</li><li>It is important to inform the radiation therapis if the fit is comfortable, as this will be used for all your subsequent treatments.</li></ul><b>CT simulation is needed to plan your radiation fields and ensure accuracy of the radiation target. The entire process will take approximately 1-2 hours.</b><br /><ul><li>The CT images acquired will be used for treatment volume and normal organ delineation and dose planning.</li><li>You may go home while your treatment plan is being completed, which will take 3-5 workng days.</li><li>The department receptionist will inform you of your tentative radiotherapy scheudle. This can be adjusted according to your preference.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/3.png" /><br /><br /><b>Don't worry and just relax because this procedure will only take about 15-30 minutes.</b><br /><br /><ul><li>While waiting for your schedule, you will be advised to see your dentist for dental and oral care prior to radiation treatment.</li><li>You may also be required to have a hearing check and some thyroid function tests. It is important for you to undergo these procedures without any delays.</li><li>The department receptionist will inform you of your tentative radiotherapy schedule. This can be adjusted according to your preference.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/4.png" /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/5.png" /><br /><br /><b>You won't see, smell, nor feel the radiation during the treatment. So remain calm and be attentive. Keep your head-and-neck region as still as possible. You will be alone in the chamber, but you will be monitored through an outside television.</b><br /><ul><li>Your radiotherapy session will be conducted in the treatment bunker, where you will be positioned as initially planned.</li><li>A verification radiograph will be done to assure the alignment prior to the delivery of the radiation.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/6.png" /><br /><b>Your radiation therapist can give instructions over the speaker. You can communicate using hand gestures, but remember not to place your hands in the target area.</b><br />`,
        },
        {
            title: 'Skin Care',
            source: '/img/Dermatitis1.png',
            description: 'Skin Infection and remedies prevention',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 0</p></b><p style="fontSize: 22px;">RADIATION THERAPY</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/1.png" /><br /><b><p style="fontSize: 22px">What is Radiotherapy?</p></b><br /><br /><b>Radiation therapy, or radiotherapy, is the delivery of high-energy radiation to the cancerous tumor</b><br /><ul><li>Radiation damages the cancer cells and stops them from multiplying. It is carefully targeted to the cancerous tumor, but some exposure of normal tissues is unaviodable causing some side effects.</li><li>Dividing the total radiation dose into smaller daily doses allows the normal tissue to recover from the exposure.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/2.png" /><br /><b><p style="fontSize: 22px">How is Radiotherapy given?</p></b><br /><br /><b>For head and neck cancers, radiotherapy is commonly given through external beam radiation. It is given daily with weekend pauses, over six to seven weeks.</b><br /><br /><b>In preparation, you will undergo the process of immobilization and CT simulation.</b><br /><ul><li> A personalized immobilization device (face mask) will be crafted for you that will be used during your treatment.</li><li>This device is important to keep your head and neck steady to improve treatment accuracy</li><li>It is important to inform the radiation therapis if the fit is comfortable, as this will be used for all your subsequent treatments.</li></ul><b>CT simulation is needed to plan your radiation fields and ensure accuracy of the radiation target. The entire process will take approximately 1-2 hours.</b><br /><ul><li>The CT images acquired will be used for treatment volume and normal organ delineation and dose planning.</li><li>You may go home while your treatment plan is being completed, which will take 3-5 workng days.</li><li>The department receptionist will inform you of your tentative radiotherapy scheudle. This can be adjusted according to your preference.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/3.png" /><br /><br /><b>Don't worry and just relax because this procedure will only take about 15-30 minutes.</b><br /><br /><ul><li>While waiting for your schedule, you will be advised to see your dentist for dental and oral care prior to radiation treatment.</li><li>You may also be required to have a hearing check and some thyroid function tests. It is important for you to undergo these procedures without any delays.</li><li>The department receptionist will inform you of your tentative radiotherapy schedule. This can be adjusted according to your preference.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/4.png" /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/5.png" /><br /><br /><b>You won't see, smell, nor feel the radiation during the treatment. So remain calm and be attentive. Keep your head-and-neck region as still as possible. You will be alone in the chamber, but you will be monitored through an outside television.</b><br /><ul><li>Your radiotherapy session will be conducted in the treatment bunker, where you will be positioned as initially planned.</li><li>A verification radiograph will be done to assure the alignment prior to the delivery of the radiation.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/6.png" /><br /><b>Your radiation therapist can give instructions over the speaker. You can communicate using hand gestures, but remember not to place your hands in the target area.</b><br />`,
        },
        {
            title: 'Exercises',
            source: '/img/shoulder2.png',
            description: 'Body Exercises for better health',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 0</p></b><p style="fontSize: 22px;">RADIATION THERAPY</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/1.png" /><br /><b><p style="fontSize: 22px">What is Radiotherapy?</p></b><br /><br /><b>Radiation therapy, or radiotherapy, is the delivery of high-energy radiation to the cancerous tumor</b><br /><ul><li>Radiation damages the cancer cells and stops them from multiplying. It is carefully targeted to the cancerous tumor, but some exposure of normal tissues is unaviodable causing some side effects.</li><li>Dividing the total radiation dose into smaller daily doses allows the normal tissue to recover from the exposure.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/2.png" /><br /><b><p style="fontSize: 22px">How is Radiotherapy given?</p></b><br /><br /><b>For head and neck cancers, radiotherapy is commonly given through external beam radiation. It is given daily with weekend pauses, over six to seven weeks.</b><br /><br /><b>In preparation, you will undergo the process of immobilization and CT simulation.</b><br /><ul><li> A personalized immobilization device (face mask) will be crafted for you that will be used during your treatment.</li><li>This device is important to keep your head and neck steady to improve treatment accuracy</li><li>It is important to inform the radiation therapis if the fit is comfortable, as this will be used for all your subsequent treatments.</li></ul><b>CT simulation is needed to plan your radiation fields and ensure accuracy of the radiation target. The entire process will take approximately 1-2 hours.</b><br /><ul><li>The CT images acquired will be used for treatment volume and normal organ delineation and dose planning.</li><li>You may go home while your treatment plan is being completed, which will take 3-5 workng days.</li><li>The department receptionist will inform you of your tentative radiotherapy scheudle. This can be adjusted according to your preference.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/3.png" /><br /><br /><b>Don't worry and just relax because this procedure will only take about 15-30 minutes.</b><br /><br /><ul><li>While waiting for your schedule, you will be advised to see your dentist for dental and oral care prior to radiation treatment.</li><li>You may also be required to have a hearing check and some thyroid function tests. It is important for you to undergo these procedures without any delays.</li><li>The department receptionist will inform you of your tentative radiotherapy schedule. This can be adjusted according to your preference.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/4.png" /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/5.png" /><br /><br /><b>You won't see, smell, nor feel the radiation during the treatment. So remain calm and be attentive. Keep your head-and-neck region as still as possible. You will be alone in the chamber, but you will be monitored through an outside television.</b><br /><ul><li>Your radiotherapy session will be conducted in the treatment bunker, where you will be positioned as initially planned.</li><li>A verification radiograph will be done to assure the alignment prior to the delivery of the radiation.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/6.png" /><br /><b>Your radiation therapist can give instructions over the speaker. You can communicate using hand gestures, but remember not to place your hands in the target area.</b><br />`,
        },
        {
            title: 'Skin Care',
            source: '/img/Dermatitis1.png',
            description: 'Skin Infection and remedies prevention',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 0</p></b><p style="fontSize: 22px;">RADIATION THERAPY</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/1.png" /><br /><b><p style="fontSize: 22px">What is Radiotherapy?</p></b><br /><br /><b>Radiation therapy, or radiotherapy, is the delivery of high-energy radiation to the cancerous tumor</b><br /><ul><li>Radiation damages the cancer cells and stops them from multiplying. It is carefully targeted to the cancerous tumor, but some exposure of normal tissues is unaviodable causing some side effects.</li><li>Dividing the total radiation dose into smaller daily doses allows the normal tissue to recover from the exposure.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/2.png" /><br /><b><p style="fontSize: 22px">How is Radiotherapy given?</p></b><br /><br /><b>For head and neck cancers, radiotherapy is commonly given through external beam radiation. It is given daily with weekend pauses, over six to seven weeks.</b><br /><br /><b>In preparation, you will undergo the process of immobilization and CT simulation.</b><br /><ul><li> A personalized immobilization device (face mask) will be crafted for you that will be used during your treatment.</li><li>This device is important to keep your head and neck steady to improve treatment accuracy</li><li>It is important to inform the radiation therapis if the fit is comfortable, as this will be used for all your subsequent treatments.</li></ul><b>CT simulation is needed to plan your radiation fields and ensure accuracy of the radiation target. The entire process will take approximately 1-2 hours.</b><br /><ul><li>The CT images acquired will be used for treatment volume and normal organ delineation and dose planning.</li><li>You may go home while your treatment plan is being completed, which will take 3-5 workng days.</li><li>The department receptionist will inform you of your tentative radiotherapy scheudle. This can be adjusted according to your preference.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/3.png" /><br /><br /><b>Don't worry and just relax because this procedure will only take about 15-30 minutes.</b><br /><br /><ul><li>While waiting for your schedule, you will be advised to see your dentist for dental and oral care prior to radiation treatment.</li><li>You may also be required to have a hearing check and some thyroid function tests. It is important for you to undergo these procedures without any delays.</li><li>The department receptionist will inform you of your tentative radiotherapy schedule. This can be adjusted according to your preference.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/4.png" /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/5.png" /><br /><br /><b>You won't see, smell, nor feel the radiation during the treatment. So remain calm and be attentive. Keep your head-and-neck region as still as possible. You will be alone in the chamber, but you will be monitored through an outside television.</b><br /><ul><li>Your radiotherapy session will be conducted in the treatment bunker, where you will be positioned as initially planned.</li><li>A verification radiograph will be done to assure the alignment prior to the delivery of the radiation.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/6.png" /><br /><b>Your radiation therapist can give instructions over the speaker. You can communicate using hand gestures, but remember not to place your hands in the target area.</b><br />`,
        },
        {
            title: 'Exercises',
            source: '/img/shoulder2.png',
            description: 'Body Exercises for better health',
            html: `<b><p style="fontSize: 35px; color: #ffcb80">COURSE 0</p></b><p style="fontSize: 22px;">RADIATION THERAPY</p><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/1.png" /><br /><b><p style="fontSize: 22px">What is Radiotherapy?</p></b><br /><br /><b>Radiation therapy, or radiotherapy, is the delivery of high-energy radiation to the cancerous tumor</b><br /><ul><li>Radiation damages the cancer cells and stops them from multiplying. It is carefully targeted to the cancerous tumor, but some exposure of normal tissues is unaviodable causing some side effects.</li><li>Dividing the total radiation dose into smaller daily doses allows the normal tissue to recover from the exposure.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/2.png" /><br /><b><p style="fontSize: 22px">How is Radiotherapy given?</p></b><br /><br /><b>For head and neck cancers, radiotherapy is commonly given through external beam radiation. It is given daily with weekend pauses, over six to seven weeks.</b><br /><br /><b>In preparation, you will undergo the process of immobilization and CT simulation.</b><br /><ul><li> A personalized immobilization device (face mask) will be crafted for you that will be used during your treatment.</li><li>This device is important to keep your head and neck steady to improve treatment accuracy</li><li>It is important to inform the radiation therapis if the fit is comfortable, as this will be used for all your subsequent treatments.</li></ul><b>CT simulation is needed to plan your radiation fields and ensure accuracy of the radiation target. The entire process will take approximately 1-2 hours.</b><br /><ul><li>The CT images acquired will be used for treatment volume and normal organ delineation and dose planning.</li><li>You may go home while your treatment plan is being completed, which will take 3-5 workng days.</li><li>The department receptionist will inform you of your tentative radiotherapy scheudle. This can be adjusted according to your preference.</li></ul><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/3.png" /><br /><br /><b>Don't worry and just relax because this procedure will only take about 15-30 minutes.</b><br /><br /><ul><li>While waiting for your schedule, you will be advised to see your dentist for dental and oral care prior to radiation treatment.</li><li>You may also be required to have a hearing check and some thyroid function tests. It is important for you to undergo these procedures without any delays.</li><li>The department receptionist will inform you of your tentative radiotherapy schedule. This can be adjusted according to your preference.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/4.png" /><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/5.png" /><br /><br /><b>You won't see, smell, nor feel the radiation during the treatment. So remain calm and be attentive. Keep your head-and-neck region as still as possible. You will be alone in the chamber, but you will be monitored through an outside television.</b><br /><ul><li>Your radiotherapy session will be conducted in the treatment bunker, where you will be positioned as initially planned.</li><li>A verification radiograph will be done to assure the alignment prior to the delivery of the radiation.</li></ul><br /><img src="httpss://raw.githubusercontent.com/janjanmedinaaa/json-api/master/CAPSTONE/img/courses/6.png" /><br /><b>Your radiation therapist can give instructions over the speaker. You can communicate using hand gestures, but remember not to place your hands in the target area.</b><br />`,
        },
    ],

    Contacts: [
        {
            hospital: 'The Apolinario Mabini Rehabilitation Center Private Division',
            direct: '731-8018',
            local: '2488',
            contacts: null
        },
        {
            hospital: 'Nutrition Clinic',
            direct: '731-3037',
            local: '2631',
            contacts: null
        },
        {
            hospital: 'Psychiatric Services',
            direct: '749-9788',
            local: null,
            contacts: null
        },
        {
            hospital: 'Palliative Care/ Pain Management Unit',
            direct: null,
            local: '2460',
            contacts: null
        },
        {
            hospital: 'UST ASPIRE and Smoking Cessation Program',
            direct: null,
            local: null,
            contacts: [
                {
                    'name': 'Dr. Jayson Co',
                    'number': '09226540870',
                },
                {
                    'name': 'Dr. JC Jacinto',
                    'number': '09334047972',
                }
            ]
        },
        {
            hospital: 'Palliative Care/ Pain Management Unit',
            direct: null,
            local: null,
            contacts: [
                {
                    'name': 'Maria Christina Intia',
                    'number': '09499924954'
                }
            ]
        },
        {
            hospital: 'BCI CanShare',
            direct: null,
            local: null,
            contacts: [
                {
                    'name': 'Ms. Francie Go',
                    'number': '09278685695',
                },
                {
                    'name': 'Ms. Cristy Tirado',
                    'number': '09107649810',
                }
            ]
        },
    ],

    Notifications: [
        {
            sender: 'Ryan Agas',
            title: 'Follow-up on Monday!',
            message: 'Please see me on my clinic hours for your weekly check-up.',
            timestamp: '11/28/2018 1:26 AM'
        },
        {
            sender: 'Ryan Agas',
            title: 'Read Tips!',
            message: 'Answer your weekly surveys. Thank you!',
            timestamp: '11/28/2018 1:27 AM'
        },
        {
            sender: 'Mark Johnson',
            title: 'Answer Survey',
            message: 'Please do answer the survey for the week',
            timestamp: '11/28/2018 1:28 AM'
        },
        {
            sender: 'Ryan Agas',
            title: 'Course One is made available for you',
            message: 'Read it thoroughly and if you have any questions, see me on my clinic hours for check-up or clarifications.',
            timestamp: '11/28/2018 1:29 AM'
        }
    ],

    Surveys: [
        {
            name: 'M. D. Anderson Symptom Inventory Core Items',
            short: 'MDADI',
            items: 19,
            description: 'Part I. How severe are your conditions? \n\nPeople with cancer frequently have symptoms that are cause by their disease or by their treatment. We ask you to rate how severe the following symptoms have been in the last 24 hours. Please fill in the questions from UNANSWERED, 0 (symptom has not been present) to 10 (symptom was as bad as you can imagine it could be) for each item.',
            answers: {
                type: 'rating',
                min: 0,
                max: 10
            },
            questions: [
                'Your pain at its WORST?',
                'Your fatigue (tiredness) at its WORST?',
                'Your nausea at its WORST?',
                'Your disturbed sleep at its WORST?',
                'Your feelings of being distressed (upset) at its WORST?',
                'Your shortness of breath at its WORST?',
                'Your problem with remembering things at its WORST?',
                'Your problem with lack of appetite at its WORST?',
                'Your feeling drowsy (sleepy) at its WORST?',
                'Your having a dry mouth at its WORST?',
                'Your feeling sad at its WORST?',
                'Your vomiting of tingling at its WORST?',
                'General Activity?',
                'Mood?',
                'Work (including work around the house)?',
                'Relations with other people?',
                'Walking?',
                'Enjoyment of life?'
            ]
        },
        {
            name: 'M. D. Anderson Dysphagia Inventory',
            short: 'MDADI',
            items: 20,
            description: 'This questionnaire asks for your views about your swallowing ability. This information will help us understand how you feel about swallowing. \n\nThe following statements have been made by people who have problems with their swallowing. Some of the statement may apply to you. \n\nPlease read each statement and choose the response which best reflects your experience in the past week.',
            answers: {
                type: 'multiple',
                choices: [
                    'Strongly Agree',
                    'Agree',
                    'No Opinion',
                    'Disagree',
                    'Strongly Disagree'
                ]
            },
            questions: [
                'My swallowing ability limits my day-to-day acitivities.',
                'I am embarrassed by my eating habits.',
                'People have difficulty cooking for me.',
                'Swallowing is more difficult at the end of the day.',
                'I do not feel self-conscious when I eat.',
                'I am upset by my swallowing problem.',
                'Swallowing takes great effort',
                'I do not go out because of my swallowing problem.',
                'My swallowing difficulty has caused me to lose income.',
                'It takes me longer to eat because of my swallowing problem.',
                'People ask me, "Why can\'t you eat that?"',
                'Other people are irritated by my eating problem',
                'I cough when I try to drink liquids.',
                'My swallowing problems limit my social and personal life.',
                'I feel free to go out to eat with my friends, neighbors, and relatives.',
                'I limit my food intake because of my swallowing problem.',
                'I cannot maintain my weight because of my swallowing problem.',
                'I have low self-esteem because of my swallowing problem.',
                'I feel that I am swallowing a huge amount of food.',
                'I feel excluded because of my eating habits.'
            ]
        },
        {
            name: 'Kessler Psychological Distress Scale',
            short: 'K10',
            items: 10,
            description: 'The Kessler Psychological Distress Scale(K10) is a simple measure of psychological distress. The K10 scale involves 10 questions about emotional states each with a five-levek response scale. The measure  can be used as a brief screen to identify levels of distress. The tool can be given to patients to completem ir alternatively the questions can be read to the patients by the practitioner.',
            answers: {
                type: 'multiple',
                choices: [
                    'None of the time',
                    'A little of the time',
                    'Some of the time',
                    'Most of the time',
                    'All of the time'
                ]
            },
            questions: [
                'In the past 4 weeks, about how often did you feel tired out for no good reason?',
                'In the past 4 weeks, about how often did you feel nervous?',
                'In the past 4 weeks, about how often did you feel so nervous that nothing could calm you down?',
                'In the past 4 weeks, about how often did you feel hopeless?',
                'In the past 4 weeks, about how often did you feel restless or fidgety?',
                'In the past 4 weeks, about how often did you feel so restless you could not sit still?',
                'In the past 4 weeks, about how often did you feel depressed?',
                'In the past 4 weeks, about how often did you feel that everything was an effort?',
                'In the past 4 weeks, about how often did you feel so sad that nothing could cheer you up?',
                'In the past 4 weeks, about how often did you feel worthless?'
            ]
        },
    ],

    Help: [
        {
            number: '01',
            title: 'Getting Started',
            headOne: 'GETTING',
            headTwo: 'the mobile application',
            steps: [
                'Open the Play Store for Android users or App Store for Apple iOS users.',
                'Search CORONA.',
                'Download the mobile applications.',
                'Choose Allow once the app asks if you wish to permit Push Notifications.',
                'Once downloaded, the app is now ready to use.'
            ]
        },
        {
            number: '02',
            title: 'Login',
            headOne: 'LOGGING IN',
            headTwo: 'the mobile application',
            steps: [
                'Open the CORONA Application',
                'Input your patient number and password which will be created by the system administrator and be given by the doctor assigned to you.',
                'Then press log in',
            ]
        },
        {
            number: '03',
            title: 'Taking a Survey',
            headOne: 'TAKING',
            headTwo: 'a SURVEY',
            steps: [
                'You must be logged to the application before you can take any survey.',
                'On the upper left-most side of the screen, press an icon like the one below to open the side menu.',
                'Choose Take Survey and tap any survey type you would need or want to take.',
                'Answer the survey. Swipe from right to left to proceed to the next page.',
                'Press submit once the survey has been completely answered.'
            ]
        },
        {
            number: '04',
            title: 'Taking Course',
            headOne: 'TAKING',
            headTwo: 'a COURSE',
            steps: [
                'You must be logged to the application before you can read any course',
                'Choose Courses in the mobile Application homepage.',
                'Tap the course assigned or available to your account which you need to take.',
                'Once in the specific course, a pre-survey and post-survey will be given at the first take of the course.',
            ]
        },
        {
            number: '05',
            title: 'Viewing Tips',
            headOne: 'VIEWING',
            headTwo: 'TIPS',
            steps: [
                'You must be logged to the application before you can read any tips.',
                'Choose Tips in the mobile application homepage.',
                'All tips are available for viewing so you can tap the tips you wish to view.',
            ]
        },
        {
            number: '06',
            title: 'Emergency Contacts',
            headOne: 'VIEWING',
            headTwo: 'EMERGENCY CONTACTS',
            steps: [
                'Log In to the application',
                'On the upper left-most side of the screen, open the side menu and choose Emergency Numbers.',
                'Tap a number to be redirected to your phone contacts.',
            ]
        },
        {
            number: '07',
            title: 'Account Password',
            headOne: 'CHANGING',
            headTwo: 'the ACCOUNT PASSWORD',
            steps: [
                'Log In to the application.',
                'On the upper left-most side of the screen, open the side menu and choose Settings and tap Change Password.',
                'Input your old Password, the new Password you wish to have, and re-enter the new Password for verification.',
                'Press Confirm once finished.',
            ]
        },
        {
            number: '08',
            title: 'Account Email',
            headOne: 'CHANGING',
            headTwo: 'the ACCOUNT E-MAIL',
            steps: [
                'Log In to the application.',
                'On the upper left-most side of the screen, open the side menu and choose Settings and tap Change Email.',
                'Input your old e-mail, the new e-mail you wish to have, and password. Check your new e-mail for confirmation.',
                'Press Confirm once finished.',
            ]
        },
        {
            number: '09',
            title: 'Logout',
            headOne: 'LOGGING OUT',
            headTwo: 'the mobile application',
            steps: [
                'Log In to the application',
                'On the upper left-most side of the screen, open the side menu and choose Logout.',
            ]
        },
    ]
}

export const loginSample = {
    data: {
        id: 0,
        firstName: 'Janjan',
        lastName: 'Medina',
        patientID: 'PC-00012',
        others: {
            surveys: [true, false, true],
            courses: [false, false, false, true, true, true]
        }
    },
    contents: {
        courses: Coronex.Courses,
        tips: Coronex.Tips,
        emergency: Coronex.Contacts
    }
}