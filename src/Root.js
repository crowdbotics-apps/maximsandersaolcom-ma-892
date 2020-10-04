import React, {useEffect, createRef} from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {mapping} from '@eva-design/eva';
import {ApplicationProvider} from 'react-native-ui-kitten';
import * as NavigationService from './services/navigationService';
// Redux
import {Provider} from 'react-redux';
import reduxStore from './redux/reduxStore';
import {crowdboticsTheme} from './config/crowdboticsTheme';
// Router
import Router from './Router';
// Provider
import ProfileProvider from './containers/ProfileProvider';

const store = reduxStore();
const Root = () => {
  const naviReference = createRef();
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('9b88d83b-6431-4415-8227-0011e42bcce4', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    NavigationService.setNavigator(naviReference.current);
    NavigationService.setStore(store);
    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  const onReceived = notification => {
    console.log("Notification received: ", notification);
  };

  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = device => {
    console.log('Device info: ', device);
  };

  const myiOSPromptCallback = permission => {
    console.log("permisiions", permission);
    // do something with permission value
  }

  return (
    <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={crowdboticsTheme}>
        <ProfileProvider>
          <Router ref={naviReference} />
        </ProfileProvider>
      </ApplicationProvider>
    </Provider>
  );
};

export default Root;
