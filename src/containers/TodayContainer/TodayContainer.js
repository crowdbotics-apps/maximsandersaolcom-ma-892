import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import moment from 'moment';
import i18n from '../../i18n/i18n';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import TodayContainerHorizontal from './TodayContainerHorizontal';
import TodayInfo from '../../components/TodayInfo';
import GradientButton from '../../components/GradientButton';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
import MealItem from '../../components/MealItem';
import { getNumberOfDayByString } from '../../utils/common';
import Routes from '../../Routes';

const dateTime = new Date();
const formatedDate = moment(dateTime).format('YYYY-MM-DD');
const todayDayString = moment(dateTime).format('dddd');
const todayDayNumber = getNumberOfDayByString(todayDayString);

const emptyList = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={styles.emptyListLabel}>
      {`${i18n.t('nutritionContainer.emptyMeals')} ${moment().format('MMM DD')}`}
    </Text>
  </View>
);

const renderItem = ({
  item: {
    title,
    date_time: clock,
    food_items: mealItems,
    carbohydrate: numberOfCarbs,
    protein: numberOfProtein,
    fat: numberOfFat,
    pieArray
  },
}) => (
  <MealItem
    title={title}
    clock={clock}
    mealItems={mealItems}
    numberOfProtein={numberOfProtein}
    numberOfCarbs={numberOfCarbs}
    numberOfFat={numberOfFat}
    pieArray={pieArray}
    titleContainerStyle={{
      paddingTop: 0
    }}
  />
);

const IngredientRecipeContainer = ({
  navigation,
  getMealsByDateAction,
  meals = [],
  getSessionByDayAction,
  navigation: {
    toggleDrawer
  },
  todaySession
}) => {
  useEffect(() => {
    console.log('today', navigation);
    getSessionByDayAction(todayDayNumber);
  }, []);
  console.log('stigao je today session', todaySession);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', flex: 1 }}>
        <HeaderForDrawer
          onDrawerButtonPress={() => {
            toggleDrawer();
          }}
        />
        <TodayInfo
          description="Strength and Cardio"
          dayNumber={todayDayNumber}
          weekNumber="1" // need to implement
        />
        <TodayContainerHorizontal
          sliderTitle="Biceps and Triceps"
          navigation={navigation}
          data={todaySession.workouts}
          routeName={Routes.TestScreen}
          onSelectItem={() => {}}
        />
        <View
          style={styles.buttonContainer}
        >
          <GradientButton
            buttonContainerText="Start Workout"
            buttonContainerStyleProp={styles.findRecipesButtonContainer}
            buttonContainerTextStyle={styles.buttonContainerTextStyle}
            colorsGradient={['#3180BD', '#6EC2FA']}
            onPress={() => navigation.navigate(Routes.TestScreen)}
          />
        </View>
        <View style={styles.lastContainer}>
          <SearchablePaginatedList
            style={{ flex: 1 }}
            ListEmptyComponent={emptyList}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10, paddingVertical: 0 }}
            list={meals}
            fetchListAction={() => getMealsByDateAction(formatedDate)}
            renderItem={item => renderItem(item)}
            search=""
            filter=""
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white'
  },
  findRecipesButtonContainer: {
    width: '90%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 0,
    paddingBottom: 18,
    borderRadius: 10,
    marginRight: 0,
    marginBottom: 0
  },
  buttonContainerTextStyle: {
    fontSize: 21,
    fontWeight: 'normal',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  lastContainer: {
    borderTopColor: 'gray',
    flex: 1,
    width: '100%'
  },
});

export default IngredientRecipeContainer;
