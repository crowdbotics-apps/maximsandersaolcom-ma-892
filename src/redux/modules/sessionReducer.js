import initialStateSession from '../initialState/sessionInitial';
import SessionService from '../../services/SessionService';

export const GET_SESSION_BY_DAY = 'sessions/GET_SESSION_BY_DAY';

export default (state = { ...initialStateSession }, { type, payload }) => {
  switch (type) {
    case GET_SESSION_BY_DAY: {
      return {
        ...state,
        todaySession: payload,
      };
    }
    default: return state;
  }
};


export const getSessionByDay = day => (dispatch) => {
  const sessionService = new SessionService();
  sessionService.getSessionByDay(day)
    .then(res => dispatch({ type: GET_SESSION_BY_DAY, payload: res }))
    .catch(err => console.log('err', err));
};
