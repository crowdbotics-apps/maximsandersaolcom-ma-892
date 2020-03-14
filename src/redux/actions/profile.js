import React from 'react';
import Api from '../../api';


const api = Api.getInstance();

export const getProfile = () => {
    return api.fetch('GET', `/profile/`)
        .then(response =>  console.log('PROFILE RESPONSE', response))
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


