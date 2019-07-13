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
      };
    }

    default: {
      return state;
    }
  }
};

export const testAction = () => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS });
};
