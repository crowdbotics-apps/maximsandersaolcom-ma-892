import {
  Alert
} from 'react-native';
import initialAuthState from '../initialState/authInitial';
import AuthService from '../../services/AuthService';

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

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

    case SET_ERROR: {
      return {
        // to do! handle errors on login and register
      };
    }

    default: {
      return state;
    }
  }
};

export const logOut = () => dispatch => dispatch({ type: LOGOUT_SUCCESS });

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

export const register = (email, password) => {
  const authService = new AuthService();
  return (dispatch) => {
    return authService.register({ name: 'TestUser', email, password })
      .then(res => {
        return Alert.alert('Success', 'Successfully register, please login with same email and password');
      })
      .catch((err) => {
        Alert.alert('Error', 'Wrong credentials');
        console.log('error:', err);
        throw err;
      });
  };
};

export const regularLogin = (user, token) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      ...user,
      token
    }
  });
};
