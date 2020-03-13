import React from 'react';
import axios from 'axios';
import {API_URL} from "../../constants";


export const getProfile = () => {
    return async dispatch => {

        try {
            const response = await axios.get(API_URL + '/profile/');
            console.log('PROFILE RESPONSE', response);
        } catch (err) {console.log(err)}

    }
};
