import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Reducers
import auth from './modules/authReducer';
import nutrition from './modules/nutritionReducer';

let middlewares = [thunk];

if (__DEV__) { // eslint-disable-line
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error // Only show errors as non collapsed logs
  });

  middlewares.push(logger);
}

const store = createStore(
  combineReducers({
    auth,
    nutrition
  }),
  applyMiddleware(...middlewares)
);

export default () => store;
