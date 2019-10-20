import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Routes from '../../Routes';

const addIcon = require('../../assets/add_icon_meal.png');

const MealEmptyItem = ({
  clock,
  mealItems,
  numberOfCarbs,
  numberOfProtein,
  numberOfFat,
  index,
  titleContainerStyle,
  navigation,
  setSelectedMealAction,
  prevScreen
}) => (
  <View key={index}>
    <View style={[styles.titleWrapper, titleContainerStyle]}>
      <Text style={styles.mealText}>{`Meal ${index + 1}`}</Text>
    </View>
    <View
      style={styles.itemContainer}
    >
      <View
        style={styles.innerContainer}
      >
        <View style={styles.proteinBarContainer}>
          <Text style={styles.clockContainer}>{moment(clock).format('h:mm a')}</Text>
        </View>
        <View style={styles.chartMainContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedMealAction({
                date_time: clock,
                food_items: mealItems,
                carbohydrate: numberOfCarbs,
                protein: numberOfProtein,
                fat: numberOfFat,
              });
              if (prevScreen === Routes.NutritionScreen) {
                return navigation.navigate(Routes.MealRegulatorNutritionScreen, { prevScreen: Routes.MealRegulatorNutritionScreen });
              }
              return navigation.navigate(Routes.MealRegulatorScreen);
            }}
          >
            <Image style={{ width: 35, height: 35 }} source={addIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mealText: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingLeft: 10
  },
  itemContainer: {
    borderColor: 'rgb(214,213,213);',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.50,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 1
    },
    elevation: 1,
    marginBottom: 10
  },
  innerContainer: {
    flexDirection: 'row',
    // borderBottomColor: 'rgb(214,213,213);',
    // borderBottomWidth: 1,
    paddingLeft: 15,
    paddingVertical: 15,
  },
  proteinBarContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  clockContainer: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  chartMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  titleWrapper: {
    paddingVertical: 10
  }
});

MealEmptyItem.defaultProps = {
  clock: '',
  mealItems: [],
  numberOfProtein: 0,
  numberOfCarbs: 0,
  numberOfFat: 0,
  index: 0,
};

MealEmptyItem.propTypes = {
  clock: PropTypes.string,
  mealItems: PropTypes.arrayOf(PropTypes.shape({})),
  numberOfProtein: PropTypes.number,
  numberOfCarbs: PropTypes.number,
  numberOfFat: PropTypes.number,
  index: PropTypes.number
};

export default MealEmptyItem;
