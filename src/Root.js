import React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
// Redux
import { Provider } from 'react-redux';
import reduxStore from './redux/reduxStore';
import { crowdboticsTheme } from './config/crowdboticsTheme';
// Router
import Router from './Router';
// Provider
import ProfileProvider from './containers/ProfileProvider';

const store = reduxStore();
const Root = () => (
  <Provider store={store}>
    <ApplicationProvider mapping={mapping} theme={crowdboticsTheme}>
      <ProfileProvider>
        <Router />
      </ProfileProvider>
    </ApplicationProvider>
  </Provider>
);

export default Root;
