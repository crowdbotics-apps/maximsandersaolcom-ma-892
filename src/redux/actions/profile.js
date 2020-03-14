import React from 'react';
import Api from '../../api';
import {GET_PROFILE_INFO} from '../constants'


const api = Api.getInstance();

export const getProfile = () => {
    return (dispatch) => api.fetch('GET', `/profile/`)
        .then(response =>  {

            dispatch({
                type: GET_PROFILE_INFO,
                data: response.data.results[0]
            });
            console.log('PROFILE RESPONSE', response)
        })
        .catch((err) => { throw err; });
};

export const changeAvatarImage = () => {


    return api.fetch('POST', `/profile/set_profile_picture/`)
        .then(response =>  console.log('PROFILE RESPONSE', response))
        .catch((err) => { throw err; });
};

export const changeBackgroundImage = (url, fileName, type) => {

    console.log('HEY ', url, fileName, type)

    const data = {
        background_picture_url: url
    }

    const bgImage = new FormData();
    //bgImage.append('background_picture_url', {uri: url, name: fileName, type}); //{ uri: imageUri, name: fileName, type }
    bgImage.append('id', '32');
    bgImage.append('background_picture_url', {uri: url, name: fileName, type});

    console.log(bgImage)

    return () => api.fetch('POST', `/profile/set_background_picture/`, bgImage)
        .then(response =>  console.log('BG UPLOAD RESPONSE', response))
        .catch((err) => { throw err; });
};


