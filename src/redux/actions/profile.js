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

export const changeBackgroundImage = () => {
    return api.fetch('POST', `/profile/set_background_picture/`)
        .then(response =>  console.log('PROFILE RESPONSE', response))
        .catch((err) => { throw err; });
};


