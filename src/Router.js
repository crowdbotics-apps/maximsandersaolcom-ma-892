import {
  createDrawerNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Routes from './Routes';
import {
  IntroScreen,
  TestScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen
} from './screens';

const DrawerNavigatior = createDrawerNavigator({
  [Routes.ProfileScreen]: { screen: ProfileScreen },
  [Routes.TestScreen]: { screen: TestScreen },
}, {
  initialRouteName: 'ProfileScreen',
  drawerPosition: 'right',
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
