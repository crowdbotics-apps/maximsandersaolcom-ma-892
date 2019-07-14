import initialAuthState from '../initialState/authInitial';

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

    default: {
      return state;
    }
  }
};

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
