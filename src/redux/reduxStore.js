import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Reducers
import auth from './modules/authReducer';

let middlewares = [thunk];

if (__DEV__) { //Include logger only in dev builds.
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error //Only show errors as non collapsed logs
  });

  middlewares.push(logger);
};

const store = createStore(
  combineReducers({
    auth,
  }),
  applyMiddleware(...middlewares)
);

export default () => store;