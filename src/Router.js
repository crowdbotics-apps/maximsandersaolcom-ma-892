import React from 'react';
import {
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import {
  createDrawerNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
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
  SavedProgramsScreen,
  NutritionScreen,
  FeedScreen
} from './screens';
import DrawerContent from './containers/DrawerContent';
import regularHeaderStyle from './components/regularHeaderStyle';
// Packages
import i18n from './i18n/i18n';

import { drawerConfiguration, TAB_ICONS_ENUM } from './routerConfig';


const ProfileTabStack = createDrawerNavigator({
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

const TodayTabStack = createStackNavigator({
  [Routes.TestScreen]: {
    screen: TestScreen,
    navigationOptions: () => ({
      header: null
    })
  },
});

const NutritionTabStack = createStackNavigator({
  [Routes.NutritionScreen]: {
    screen: NutritionScreen,
    navigationOptions: () => ({
      header: null
    })
  },
});

const FeedTabStack = createStackNavigator({
  [Routes.FeedScreen]: {
    screen: FeedScreen,
    navigationOptions: () => ({
      header: null
    })
  },
});

const ProgramsTabStack = createStackNavigator({
  [Routes.TestScreen]: {
    screen: TestScreen,
    navigationOptions: () => ({
      header: null
    })
  },
});

const BottomAppStack = createBottomTabNavigator(
  {
    Today: TodayTabStack,
    Profile: ProfileTabStack,
    Feed: FeedTabStack,
    Nutrition: NutritionTabStack,
    Programs: ProgramsTabStack,
  },
  {
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = true;

      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
        tabBarButtonComponent: (props) => {
          switch (props.accessibilityLabel) {
            default: {
              return <TouchableOpacity {...props} />;
            }
          }
        },
        tabBarIcon: (props) => {
          const { focused } = props;
          const { routeName } = navigation.state;
          const source = TAB_ICONS_ENUM[routeName][focused];
          return <Image source={source} style={{ width: 30, height: 30 }} />;
        },
        tabBarOnPress: () => {
          navigation.navigate(navigation.state.routeName);
        }
      };
    },
    tabBarOptions: {
      style: {
        backgroundColor: 'white'
      },
      showIcon: true,
      showLabel: true,
      lazy: true,
      activeTintColor: 'black',
      inactiveTintColor: 'black',
      activeBackgroundColor: 'lightgray'
    },
  }
);

const AuthStack = createStackNavigator({
  [Routes.IntroScreen]: {
    screen: IntroScreen,
    navigationOptions: {
      header: null
    }
  },
  [Routes.LoginScreen]: {
    screen: LoginScreen,
    navigationOptions: {
      header: Platform.select({ ios: undefined, android: null }),
      headerStyle: regularHeaderStyle,
    }
  },
  [Routes.RegisterScreen]: {
    screen: RegisterScreen,
    navigationOptions: {
      header: Platform.select({ ios: undefined, android: null }),
      headerStyle: regularHeaderStyle,
    }
  }
},
{
  initialRouteName: 'IntroScreen',
  cardStyle: {
    backgroundColor: 'white',
  },
  // headerMode: 'none',
  // navigationOptions: {
  //   headerVisible: false,
  // }
});

export default createStackNavigator({
  App: createSwitchNavigator({
    AuthStack,
    BottomAppStack
  },
  {
    navigationOptions: () => ({
      cardStyle: {
        backgroundColor: 'white',
      },
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    })
  })
}, {
  cardStyle: {
    backgroundColor: 'white',
  },
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});
