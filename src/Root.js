import React from 'react';
// Redux
import { Provider } from 'react-redux';
import reduxStore from './redux/reduxStore';
// Router
import Router from './Router';
// Provider
import ProfileProvider from './containers/ProfileProvider';

const store = reduxStore();

const Root = () => (
  <Provider store={store}>
    <ProfileProvider>
      <Router />
    </ProfileProvider>
  </Provider>
);

export default Root;
