import {
  Alert
} from 'react-native';
import initialAuthState from '../initialState/authInitial';
import AuthService from '../../services/AuthService';

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
        profile: payload
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
        usernameErrorText: ''
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

export const logOut = () => dispatch => dispatch({ type: LOGOUT_SUCCESS });

export const resetErrors = () => dispatch => dispatch({ type: RESET_ERRORS });

export const loginActionViaFacebook = data => (dispatch) => {
  const { email, picture, name } = data;
  const payload = {
    email,
    imageUrl: picture.data.url,
    name
  };
  dispatch({ type: LOGIN_SUCCESS, payload });
};

export const loginActionViaGmail = data => (dispatch) => {
  const { user: { email, photo, name } } = data;
  const payload = {
    email,
    imageUrl: photo,
    name
  };
  dispatch({ type: LOGIN_SUCCESS, payload });
};

export const register = (emailValue, passwordValue) => {
  const authService = new AuthService();
  return (dispatch) => {
    return authService.register({ email: emailValue, password: passwordValue })
      .then(res => {
        return Alert.alert('Success', 'Successfully register, please login with same email and password');
      })
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
