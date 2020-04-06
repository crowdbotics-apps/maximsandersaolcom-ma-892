import React from 'react';
import {
  TouchableOpacity,
  Image,
  Platform,
  Text,
} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Routes from './Routes';
import {
  StartupScreen,
  IntroScreen,
  TestScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  EditProfileScreen,
  NotificationScreen,
  SavedProgramsScreen,
  NutritionScreen,
  FeedScreen,
  BarCodeScreen,
  FindFoodAndRecipesScreen,
  IndividualRecipeScreen,
  IngredientScreen,
  IngredientRecipeScreen,
  TodayScreen,
  ProgramScreen,
  ExerciseScreen,
  SwapExerciseScreen,
  MealRegulatorScreen,
  LogFoodsScreen,
  SurveyScreen,
  FavoritesScreen,
  MyProgressAndData
} from './screens';
import DrawerContent from './containers/DrawerContent';
import regularHeaderStyle from './components/regularHeaderStyle';
// Packages
import i18n from './i18n/i18n';

import {
  drawerConfiguration,
  TAB_ICONS_ENUM,
  drawerConfigurationForProgram
} from './routerConfig';
import Fonts from './assets/fonts';


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

  [Routes.SurveyScreen]: {
    screen: SurveyScreen,
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
  [Routes.TodayScreen]: {
    screen: TodayScreen,
    navigationOptions: () => ({
      header: null,
      drawerLabel: () => null,
    })
  },
  [Routes.MyProgressAndData]: {
    screen: MyProgressAndData,
    navigationOptions: () => ({
      drawerLabel: () => null,
      headerTitle: (
          <Text
              style={{
                fontFamily: Fonts.NOTE_NORMAL,
                fontSize: 28,
                textShadowColor: 'rgba(0, 0, 0, 0.50)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 4,
                textAlignVertical: 'center'
              }}
          >
            My progress
          </Text>
      ),
      headerStyle: Platform.select({
        ios: {
          borderBottomWidth: 0,
          shadowOpacity: 0,
        },
        android: {
          elevation: 0,
          backgroundColor: '#fff',
        }
      }),
    })
  },
  [Routes.MealRegulatorScreen]: {
    screen: MealRegulatorScreen,
    navigationOptions: () => ({
      header: null,
      drawerLabel: () => null,
    })
  },
  [Routes.LogFoodsScreen]: {
    screen: LogFoodsScreen,
    navigationOptions: () => ({
      header: null,
      drawerLabel: () => null,
    })
  },
}, {
  cardStyle: {
    backgroundColor: 'white',
  }
});

const NutritionTabStack = createStackNavigator({
  [Routes.NutritionScreen]: {
    screen: NutritionScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  [Routes.BarCodeScreen]: {
    screen: BarCodeScreen,
    navigationOptions: () => ({
      headerStyle: Platform.select({
        ios: {
          borderBottomWidth: 0,
          shadowOpacity: 0,
        },
        android: {
          elevation: 0,
          backgroundColor: '#fff',
        }
      }),
    })
  },
      [Routes.FavoritesScreen]: {
        screen: FavoritesScreen,
        navigationOptions: () => ({
          drawerLabel: () => null,
          headerTitle: (
              <Text
                  style={{
                    fontFamily: Fonts.NOTE_NORMAL,
                    fontSize: 28,
                    textShadowColor: 'rgba(0, 0, 0, 0.50)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 4,
                    textAlignVertical: 'center'
                  }}
              >
                My Favorites
              </Text>
          ),
          headerStyle: Platform.select({
            ios: {
              borderBottomWidth: 0,
              shadowOpacity: 0,
            },
            android: {
              elevation: 0,
              backgroundColor: '#fff',
            }
          }),
        })
      },
  [Routes.FindFoodAndRecipesScreen]: {
    screen: FindFoodAndRecipesScreen,
    navigationOptions: () => ({
      headerTitle: (
        <Text
          style={{
            fontFamily: Fonts.NOTE_NORMAL,
            fontSize: 28,
            textShadowColor: 'rgba(0, 0, 0, 0.50)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 4,
            textAlignVertical: 'center'
          }}
        >
          Recipes
        </Text>
      ),
      headerStyle: Platform.select({
        ios: {
          borderBottomWidth: 0,
          shadowOpacity: 0,
        },
        android: {
          elevation: 0,
          backgroundColor: '#fff',
        }
      }),
    })
  },
  [Routes.IngredientRecipeScreen]: {
    screen: IngredientRecipeScreen,
    navigationOptions: () => ({
      headerTitle: (
        <Text
          style={{
            fontFamily: Fonts.NOTE_NORMAL,
            fontSize: 28,
            textShadowColor: 'rgba(0, 0, 0, 0.50)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 4,
            textAlignVertical: 'center'
          }}
        >
          Recipes
        </Text>
      ),
      headerStyle: Platform.select({
        ios: {
          borderBottomWidth: 0,
          shadowOpacity: 0,
        },
        android: {
          elevation: 0,
          backgroundColor: '#fff',
        }
      }),
    })
  },
  [Routes.IndividualRecipeScreen]: {
    screen: IndividualRecipeScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  [Routes.IngredientScreen]: {
    screen: IngredientScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  [Routes.MealRegulatorNutritionScreen]: {
    screen: MealRegulatorScreen,
    navigationOptions: () => ({
      header: null,
      drawerLabel: () => null,
    })
  },
  [Routes.LogFoodsNutritionScreen]: {
    screen: LogFoodsScreen,
    navigationOptions: () => ({
      header: null,
      drawerLabel: () => null,
    })
  },
},
{
  cardStyle: {
    backgroundColor: 'white',
  }
});

const FeedTabStack = createStackNavigator({
  [Routes.FeedScreen]: {
    screen: FeedScreen,
    navigationOptions: () => ({
      header: null
    })
  },
});

const ProgramsTabStack = createDrawerNavigator({
  [Routes.ProgramScreen]: {
    screen: ProgramScreen,
    navigationOptions: () => ({
      header: null,
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
  [Routes.ExerciseScreen]: {
    screen: ExerciseScreen,
    navigationOptions: () => ({
      header: null,
      drawerLabel: () => null,
    })
  },
  [Routes.SwapExerciseScreen]: {
    screen: SwapExerciseScreen,
    navigationOptions: () => ({
      header: null,
      drawerLabel: () => null,
    })
  }
}, {
  ...drawerConfigurationForProgram,
  contentComponent: props => <DrawerContent {...props} />,
  unmountInactiveRoutes: true
});

ProgramsTabStack.navigationOptions = () => ({
  tabBarVisible: true
});

NutritionTabStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes.length
    && navigation.state.routes[navigation.state.routes.length - 1].routeName === 'BarCodeScreen') {
    return ({
      tabBarVisible: false
    });
  }
  return ({
    tabBarVisible: true
  });
};

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
      };
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: (props) => {
        const { focused } = props;
        const { routeName } = navigation.state;
        const source = TAB_ICONS_ENUM[routeName][focused];
        return <Image source={source} style={{ width: 30, height: 30 }} />;
      },
      tabBarOnPress: ({ navigation: navigationOnPress }) => {
        navigationOnPress.navigate(navigationOnPress.state.routeName);
      }
    }),
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
    resetOnBlur: true,
  },
);

const AuthStack = createStackNavigator({
  [Routes.StartupScreen]: {
    screen: StartupScreen,
    navigationOptions: {
      header: null
    }
  },
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
  [Routes.SurveyScreen]: {
    screen: SurveyScreen,
    navigationOptions: {
      header: null
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
  //initialRouteName: 'IntroScreen',
  initialRouteName: 'StartupScreen',
  cardStyle: {
    backgroundColor: 'white',
  },
});

export default createAppContainer(createSwitchNavigator({
  [Routes.StartupScreen]: StartupScreen,
  // [Routes.IntroScreen]: IntroScreen,
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
  }),
  //initialRouteName: 'IntroScreen',
  initialRouteName: 'StartupScreen',
}));
