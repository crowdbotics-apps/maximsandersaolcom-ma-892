import {
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';

import Routes from './Routes';
import {
  IntroScreen,
  TestScreen,
  LoginScreen,
  RegisterScreen
} from './screens';

const DrawerNavigatior = createDrawerNavigator({
  [Routes.IntroScreen]: {
    screen: IntroScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLockMode: 'locked-closed'
    }),
  },
  [Routes.TestScreen]: { screen: TestScreen },
  [Routes.LoginScreen]: { screen: LoginScreen },
  [Routes.RegisterScreen]: { screen: RegisterScreen }
}, {
  initialRouteName: 'IntroScreen',
  drawerPosition: 'right',
});

export default MainStack = createAppContainer(DrawerNavigatior)
