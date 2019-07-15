import React from 'react';
import {
  createDrawerNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import Routes from './Routes';
import {
  IntroScreen,
  TestScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  EditProfileScreen,
  NotificationScreen,
  SavedProgramsScreen
} from './screens';
import DrawerContent from './containers/DrawerContent';
// Packages
import i18n from './i18n/i18n';

const drawerConfiguration = {
  initialRouteName: 'ProfileScreen',
  drawerPosition: 'right',
};

const DrawerNavigatior = createDrawerNavigator({
  [Routes.ProfileScreen]: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      drawerLabel: () => null,
    })
  },
  [Routes.TestScreen]: {
    screen: TestScreen,
    navigationOptions: () => ({
      drawerLabel: () => null,
    })
  },
  [Routes.EditProfileScreen]: {
    screen: EditProfileScreen,
    navigationOptions: () => ({
      drawerLabel: () => i18n.t('drawerNavigation.editProfile'),
    })
  },
  [Routes.NotificationScreen]: {
    screen: NotificationScreen,
    navigationOptions: () => ({
      drawerLabel: () => i18n.t('drawerNavigation.notificaitons')
    })
  },
  [Routes.SavedProgramsScreen]: {
    screen: SavedProgramsScreen,
    navigationOptions: () => ({
      drawerLabel: () => i18n.t('drawerNavigation.savedPrograms')
    })
  },
}, {
  ...drawerConfiguration,
  contentComponent: props => <DrawerContent {...props} />
});

const AuthStack = createStackNavigator({
  [Routes.IntroScreen]: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
    }
  },
  [Routes.LoginScreen]: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  [Routes.RegisterScreen]: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null
    }
  }
},
{
  initialRouteName: 'IntroScreen',
  cardStyle: {
    backgroundColor: 'white',
  },
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const ApplicationRouter = createStackNavigator({
  App: createSwitchNavigator({
    AuthStack,
    DrawerStack: DrawerNavigatior
  }, {
    navigationOptions: {
      header: null
    },
  })
},
{
  navigationOptions: {
    header: null
  },
  cardStyle: {
    backgroundColor: 'white',
  },
});

export default createAppContainer(ApplicationRouter);
