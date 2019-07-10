import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

import Routes from './Routes';
import {
  IntroScreen,
  TestScreen
} from './screens';

const DrawerNavigatior = createDrawerNavigator({
  [Routes.IntroScreen]: { screen: IntroScreen },
  [Routes.TestScreen]: {
    screen: TestScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  }
}, {
  initialRouteName: 'IntroScreen',
  drawerPosition: 'right'
});

export default MainStack = createAppContainer(DrawerNavigatior)
