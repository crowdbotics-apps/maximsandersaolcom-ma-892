import initialStateSession from '../initialState/sessionInitial';
import SessionService from '../../services/SessionService';
import { sortSessionBySets } from '../../utils/common';

export const GET_SESSION_BY_DAY = 'sessions/GET_SESSION_BY_DAY';
export const GET_SESSIONS_ALL = 'sessions/GET_SESSIONS_ALL';
export const PICK_SESSION = 'sessions/PICK_SESSION';
export const GET_EXERCISES_ALL = 'sessions/GET_EXERCISES_ALL';
export const MARK_SET_AS_DONE = 'sessions/MARK_SET_AS_DONE';

export default (state = { ...initialStateSession }, { type, payload }) => {
  switch (type) {
    case GET_SESSIONS_ALL: {
      return {
        ...state,
        allSessions: payload,
      };
    }
    case PICK_SESSION: {
      return {
        ...state,
        exercisesObj: payload.exercisesObj,
        selectedSession: payload.selectedSession
      };
    }
    case GET_SESSION_BY_DAY: {
      return {
        ...state,
        todaySession: payload,
      };
    }
    case GET_EXERCISES_ALL: {
      return {
        ...state,
        allExercises: payload
      };
    }
    case MARK_SET_AS_DONE: {
      return {
        ...state,
        selectedSession: payload.newSelectedSession,
        exercisesObj: payload.newExercisesObj
      };
    }
    default: return state;
  }
};

export const pickSession = (exercisesObj, selectedSession) => ({
  type: PICK_SESSION,
  payload: {
    selectedSession,
    exercisesObj
  }
});

export const getAllSessions = () => (dispatch) => {
  const sessionService = new SessionService();
  return sessionService.getAllSessions()
    .then((payload) => {
      const makeSessionSotredBySets = sortSessionBySets(payload);
      dispatch({ type: GET_SESSIONS_ALL, payload: makeSessionSotredBySets });
    });
};

export const getSessionByDay = day => (dispatch) => {
  const sessionService = new SessionService();
  sessionService.getSessionByDay(day)
    .then(res => dispatch({ type: GET_SESSION_BY_DAY, payload: res }))
    .catch(err => console.log('err', err));
};

export const getAllExercises = () => (dispatch) => {
  const sessionService = new SessionService();
  return sessionService.getAllExercises()
    .then(payload => dispatch({ type: GET_EXERCISES_ALL, payload }));
};

export const markSetAsDoneAction = (setId, selectedSessionId) => (dispatch, getState) => {
  const sessionService = new SessionService();
  return sessionService.markSetAsDone(setId)
    .then(() => {
      const { sessions: { selectedSession } } = getState();
      let newExercisesObj = {};
      const newSelectedSession = selectedSession.map((item) => {
        if (item.id === selectedSessionId) {
          const arrayHowManyDone = item.sets.filter(countSetsDone => countSetsDone.done);
          let countHowManyDone = arrayHowManyDone.length;
          const newSetForSession = item.sets.map((itemSet) => {
            if (itemSet.id === setId) {
              countHowManyDone += 1;
              return {
                ...itemSet,
                done: true,
              };
            }
            return itemSet;
          });
          if (countHowManyDone === item.sets.length) {
            newExercisesObj = {
              ...item,
              sets: newSetForSession,
              done: true
            };
            return {
              ...item,
              sets: newSetForSession,
              done: true
            };
          }
          newExercisesObj = {
            ...item,
            sets: newSetForSession,
          };
          return {
            ...item,
            sets: newSetForSession
          };
        }
        return item;
      });
      dispatch({ type: MARK_SET_AS_DONE, payload: { newSelectedSession, newExercisesObj } });
    })
    .catch((err) => { throw err; });
};


export const findAndMarkAsDoneSet = () => (dispatch, getState) => {
  const sessionService = new SessionService();
  const { sessions: { exercisesObj } } = getState();
  const [findFirstNotDoneSet] = exercisesObj.sets.filter(item => !item.done);
  return sessionService.markSetAsDone(findFirstNotDoneSet.id)
    .then(() => {
      const { sessions: { selectedSession } } = getState();
      let newExercisesObj = {};
      const newSelectedSession = selectedSession.map((item) => {
        if (item.id === exercisesObj.id) {
          const arrayHowManyDone = item.sets.filter(countSetsDone => countSetsDone.done);
          let countHowManyDone = arrayHowManyDone.length;
          const newSetForSession = item.sets.map((itemSet) => {
            if (itemSet.id === findFirstNotDoneSet.id) {
              countHowManyDone += 1;
              return {
                ...itemSet,
                done: true,
              };
            }
            return itemSet;
          });
          if (countHowManyDone === item.sets.length) {
            newExercisesObj = {
              ...item,
              sets: newSetForSession,
              done: true
            };
            return {
              ...item,
              sets: newSetForSession,
              done: true
            };
          }
          newExercisesObj = {
            ...item,
            sets: newSetForSession,
          };
          return {
            ...item,
            sets: newSetForSession
          };
        }
        return item;
      });
      dispatch({ type: MARK_SET_AS_DONE, payload: { newSelectedSession, newExercisesObj } });
    })
    .catch((err) => { throw err; });
};
