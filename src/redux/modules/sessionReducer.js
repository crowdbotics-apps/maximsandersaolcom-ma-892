import moment from 'moment';
import initialStateSession from '../initialState/sessionInitial';
import SessionService from '../../services/SessionService';
import { sortSessionBySets, getNumberOfDayByString } from '../../utils/common';
import WeekHelper from '../../utils/WeekHelper';

export const GET_SESSION_BY_DAY = 'sessions/GET_SESSION_BY_DAY';
export const GET_SESSIONS_ALL = 'sessions/GET_SESSIONS_ALL';
export const PICK_SESSION = 'sessions/PICK_SESSION';
export const GET_EXERCISES_ALL = 'sessions/GET_EXERCISES_ALL';
export const MARK_SET_AS_DONE = 'sessions/MARK_SET_AS_DONE';
export const START_COUNT = 'sessions/START_COUNT';
export const ACTIVE_SET = 'sessions/ACTIVE_SET';
export const SWAP_EXERCISE = 'sessions/SWAP_EXERCISE';
export const SWAP_EXERCISE_ERROR = 'sessions/SWAP_EXERCISE_ERROR';
export const NUMBER_OF_WEEK = 'sessions/NUMBER_OF_WEEK';

export default (state = { ...initialStateSession }, { type, payload }) => {
  switch (type) {
    case GET_SESSIONS_ALL: {
      return {
        ...state,
        allSessions: payload,
        exerciseSwapped: false,
      };
    }
    case PICK_SESSION: {
      return {
        ...state,
        exercisesObj: payload.exercisesObj,
        selectedSession: payload.selectedSession,
        nextWorkout: payload.nextWorkout,
        startCount: false,
        activeSet: payload.activeSet
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
        exercisesObj: payload.newExercisesObj,
        startCount: true,
        activeSet: payload.activeSet
      };
    }
    case START_COUNT: {
      return {
        ...state,
        startCount: payload
      };
    }
    case SWAP_EXERCISE: {
      return {
        ...state,
        exerciseSwapped: true,
      };
    }
    case SWAP_EXERCISE_ERROR: {
      return {
        ...state,
        exerciseSwapError: true
      };
    }
    case NUMBER_OF_WEEK: {
      return {
        ...state,
        numberOfWeek: payload
      };
    }
    default: return state;
  }
};

export const setStartCount = payload => ({
  type: START_COUNT,
  payload
});

export const pickSession = (exercisesObj, selectedSession, nextWorkout) => ({
  type: PICK_SESSION,
  payload: {
    selectedSession,
    exercisesObj,
    nextWorkout
  }
});

export const pickExerciseObject = (exercisesObj, selectedSession) => ({
  type: PICK_SESSION,
  payload: {
    selectedSession,
    exercisesObj
  }
});

export const swapExercises = (workoutId, exerciseId) => (dispatch) => {
  const sessionService = new SessionService();
  return sessionService.swapExercises(workoutId, exerciseId)
    .then((payload) => {
      if (payload.data === 'Exercise swapped' && payload.status === 200) {
        return dispatch({
          type: SWAP_EXERCISE
        });
      }
      return dispatch({
        type: SWAP_EXERCISE_ERROR
      });
    });
};

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

export const resetSession = numberOfDayForBackend => (dispatch) => {
  const sessionService = new SessionService();
  return sessionService.resetSession()
    .then(() => sessionService.getReportForDay(numberOfDayForBackend))
    .then((result) => {
      const { data } = result;
      dispatch({ type: NUMBER_OF_WEEK, payload: data.length + 1 });
    })
    .catch((err) => { throw err; });
};

export const calculateWeekNumberAction = isExisting => (dispatch) => {
  const sessionService = new SessionService();
  const dateTime = moment(new Date());
  const todayDayString = moment(dateTime).format('dddd');
  const { numberOfDayForBackend } = getNumberOfDayByString(todayDayString);
  const { date: lastUpdatedDate } = isExisting;
  const diffDays = dateTime.diff(moment(lastUpdatedDate), 'days');
  if (diffDays >= 7) {
    const weekHelper = new WeekHelper();
    weekHelper.addToStorage(isExisting.id, isExisting.userEmail, new Date());
    return dispatch(resetSession(numberOfDayForBackend));
  }
  return sessionService.getReportForDay(numberOfDayForBackend)
    .then((result) => {
      const { data } = result;
      dispatch({ type: NUMBER_OF_WEEK, payload: data.length + 1 });
    });
};
