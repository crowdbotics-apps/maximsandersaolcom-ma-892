import React from 'react';
import Api from '../../api';
import {API_URL, GET_PROFILE_INFO, GET_FAV_RECIPES} from '../constants'
import AsyncStorage from "@react-native-community/async-storage";


export const getProfile = () => {
    return async (dispatch) => {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;

        try {
            const response = await fetch(`${API_URL}/profile/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            const resData = await response.json();
            console.log('PROFILE RESPONSE JSON ', resData);

            dispatch({
                type: GET_PROFILE_INFO,
                data: resData.results[0]
            });

        } catch (err) {
            console.log(err)
        }
    }
};

export const changeAvatarImage = (resp) => {

    return async dispatch => {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;

        const data = {
            image: `data:${resp.type};base64, ${resp.data}`
        };

        try {
            const response = await fetch(`${API_URL}/profile/set_profile_picture/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(data)
            });

            const resData = await response.json();
            console.log('RESPONSE AVATAR', response);
            console.log('AVATAR UPLOAD RESPONSE ', resData);


        } catch (err) {
            console.log(err)
        }

    }
};

// export const changeBackgroundImage = resp => {
//
//     const data = {
//         image: `data:image/jpeg;base64,${resp.data}` // data:image/jpeg;base64
//     };
//     //
//      console.log('DATA BEFORE SENDING ', data)
//
//    const bgImage = new FormData();
//     // //bgImage.append('background_picture_url', {uri: url, name: fileName, type}); //{ uri: imageUri, name: fileName, type }
//     // bgImage.append('id', '32');
//    //bgImage.append('image', `data:image/jpeg;base64,${resp.data}`); // data:image/jpeg;base64
//     //
//     // console.log(bgImage)
//
//
//
//     return () => api.fetch('POST', `/profile/set_background_picture/`, JSON.stringify(data))
//         .then(response =>  console.log('BG UPLOAD RESPONSE', response))
//         .catch((err) => { throw err; });
// };


export const changeBackgroundImage = resp => {
    return async dispatch => {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;

        const data = {
            image: `data:${resp.type};base64, ${resp.data}` // data:image/jpeg;base64
        };

        try {
            const response = await fetch(`${API_URL}/profile/set_background_picture/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(data)
            });


           const resData = await response.json();

        } catch (err) {
            console.log(err)
        }

    }
};



export const getFavorites = () => {
    return async (dispatch) => {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;

        try {
            const response = await fetch(`${API_URL}/profile/get_fav_recipes/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            const resData = await response.json();

            dispatch({
                type: GET_FAV_RECIPES,
                favoriteRecipes: resData
            });

        } catch (err) {
            console.log(err)
        }
    }
};


export const getProgressAndData = () => {
    return async (dispatch) => {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;

        try {
            const response = await fetch(`${API_URL}/report/get_weekly_report/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            const resData = await response.json();
            console.log('REPORT RESPONSE JSON ', resData);

            // dispatch({
            //     type: GET_FAV_RECIPES,
            //     favoriteRecipes: resData
            // });

        } catch (err) {
            console.log(err)
        }
    }
};


export const sendSurveyData = answers => {
    return async dispatch => {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;

        const birthday = answers[1].answer.toISOString().slice(0,10);

        const data = {
            gender: answers[2].answer,
            dob: birthday,
            height: answers[6].answer,
            weight: answers[7].answer,
            unit: answers[5].answer,
            exercise_level: answers[3].answer,
            activity_level: answers[4].answer,
            understanding_level: answers[12].answer,
            number_of_meal: answers[10].answer,
            number_of_training_days: answers[9].answer,
            fitness_goal: answers[8].answer
        };


        try {
            const response = await fetch(`${API_URL}/profile/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(data)
            });

            const resData = await response.json();
            console.log('Survey response ',response);
            console.log('Survey respData ',resData);


            const assignResp = await fetch(`${API_URL}/form/set_program/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            console.log('Assign program resp  ',assignResp);

        } catch (err) {
            console.log(err)
        }

    }
};
