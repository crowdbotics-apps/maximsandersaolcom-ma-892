import {
  Alert
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import initialAuthState from '../initialState/authInitial';
import AuthService from '../../services/AuthService';
import Api from '../../api';
import AsyncStorage from "@react-native-community/async-storage";

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const SET_ERROR = 'auth/SET_ERROR';
export const RESET_ERRORS = 'auth/RESET_ERRORS';

export default (state = { ...initialAuthState }, { type, payload }) => {
  switch (type) {
    case LOGOUT_SUCCESS: {
      return { ...initialAuthState };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        profile: payload,
        token: payload.token
      };
    }

    case RESET_ERRORS: {
      return {
        ...state,
        emailError: false,
        passwordError: false,
        emailErrorText: '',
        passwordErrorText: '',
        usernameError: false,
        usernameErrorText: '',
        non_field_errorsError: false,
        non_field_errorsErrorText: ''
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        [`${payload.field}Error`]: true,
        [`${payload.field}ErrorText`]: payload.message,
      };
    }

    default: {
      return state;
    }
  }
};

export const logOut = () => async (dispatch) => {
  const api = Api.getInstance();
  AsyncStorage.removeItem('userData');
  api.removeToken();
  try {
    await GoogleSignin.signOut();
    await LoginManager.logOut();
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    throw err;
  }
};

export const resetErrors = () => dispatch => dispatch({ type: RESET_ERRORS });

export const loginActionViaFacebook = token => (dispatch) => {
  const authService = new AuthService();
  let tokenForLogin = '';
  return authService.loginOrRegisterViaSocialFacebook(token)
    .then(({ key }) => {
      tokenForLogin = key;
      AsyncStorage.setItem('userData', JSON.stringify({ token: tokenForLogin }));
      return authService.getProfile();
    })
    .then(({ data }) => {
      const { results } = data;
      const [first] = results;
      const {
        email,
        first_name: firstName,
        profile_url: photo,
        last_name: lastName,
        id
      } = first;
      const payload = {
        email,
        imageUrl: photo,
        name: `${firstName} ${lastName}`,
        id,
        token: tokenForLogin
      };
      return dispatch({ type: LOGIN_SUCCESS, payload });
    })
    .catch((err) => {
      throw err;
    });
};

export const loginActionViaGmail = token => (dispatch) => {
  const authService = new AuthService();
  let tokenForLogin = '';
  return authService.loginOrRegisterViaSocialGoogle(token)
    .then(({ key }) => {
      tokenForLogin = key;
      AsyncStorage.setItem('userData', JSON.stringify({ token: tokenForLogin }));
      return authService.getProfile();
    })
    .then(({ data }) => {
      const { results } = data;
      const [first] = results;
      const {
        email,
        first_name: firstName,
        profile_url: photo,
        last_name: lastName,
        id
      } = first;
      const payload = {
        email,
        imageUrl: photo,
        name: `${firstName} ${lastName}`,
        id,
        token: tokenForLogin
      };
      return dispatch({ type: LOGIN_SUCCESS, payload });
    })
    .catch((err) => { throw err; });
};

export const register = (emailValue, passwordValue) => {
  const authService = new AuthService();
  return (dispatch) => {
    return authService.register({ email: emailValue, password: passwordValue })
      .then(() => Alert.alert('Success', 'Successfully register, please login with same email and password'))
      .catch((err) => {
        dispatch({ type: RESET_ERRORS });
        const arrayErrors = Object.entries(err.data);
        const arrayWithMessages = arrayErrors.map(item => ({
          field: `${item[0]}`,
          message: item[1].toString(),
        }));
        arrayWithMessages.map(item => dispatch({ type: SET_ERROR, payload: { field: item.field, message: item.message } }));
      });
  };
};

export const setError = payload => dispatch => dispatch({ type: SET_ERROR, payload });

export const regularLogin = (user, token) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      ...user,
      token
    }
  });
};
