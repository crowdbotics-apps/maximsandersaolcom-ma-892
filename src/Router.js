import {
  createDrawerNavigator,
  createAppContainer,
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
  [Routes.IntroScreen]: {
    screen: IntroScreen,
    navigationOptions: () => ({
      drawerLockMode: 'locked-closed'
    }),
  },
  [Routes.ProfileScreen]: { screen: ProfileScreen },
  [Routes.LoginScreen]: {
    screen: LoginScreen,
    navigationOptions: () => ({
      drawerLockMode: 'locked-closed'
    }),
  },
  [Routes.TestScreen]: { screen: TestScreen },
  [Routes.RegisterScreen]: { screen: RegisterScreen }
}, {
  initialRouteName: 'IntroScreen',
  drawerPosition: 'right',
});

export default createAppContainer(DrawerNavigatior);
