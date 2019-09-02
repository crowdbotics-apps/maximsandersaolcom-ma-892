import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import ProteinBar from '../../components/ProteinBar';
import NutritionMenuContainer from '../../components/NutritionMenuContainer';
import MealItem from '../../components/MealItem';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
import Fonts from '../../assets/fonts';

const mealList = [
  {
    id: '1',
    title: 'Meal 1',
    clock: '8:00am',
    mealItems: [
      { title: 'KS Egg White', size: '3/4 Cup', image: '' },
      { title: 'Old Fashion Oatmeal', size: '1/2 Cup', image: '' },
    ],
    numberOfProtein: 150,
    numberOfCarbs: 30,
    numberOfFat: 11
  },
  {
    id: '2',
    title: 'Meal 2',
    clock: '10:00am',
    mealItems: [
      { title: 'KS Egg White', size: '3/4 Cup', image: '' },
      { title: 'Old Fashion Oatmeal', size: '1/2 Cup', image: '' },
    ],
    numberOfProtein: 120,
    numberOfCarbs: 10,
    numberOfFat: 21
  },
  {
    id: '3',
    title: 'Meal 3',
    clock: '14:00pm',
    mealItems: [
      { title: 'KS Egg White', size: '3/4 Cup', image: '' },
      { title: 'Old Fashion Oatmeal', size: '1/2 Cup', image: '' },
    ],
    numberOfProtein: 200,
    numberOfCarbs: 20,
    numberOfFat: 33
  },
];

class NutrationContainer extends Component {
  componentWillMount() {
    const { getMealsByDateAction } = this.props;
    const dateTime = new Date();
    const formatedDate = moment(dateTime).format('YYYY-MM-DD');
    getMealsByDateAction(formatedDate);
  }

  renderItem = ({
    item: {
      title,
      date_time: clock,
      food_items: mealItems,
      carbohydrate: numberOfCarbs,
      protein: numberOfProtein,
      fat: numberOfFat
    }
  }) => (
    <MealItem
      title={title}
      clock={clock}
      mealItems={mealItems}
      numberOfProtein={numberOfProtein}
      numberOfCarbs={numberOfCarbs}
      numberOfFat={numberOfFat}
    />
  );

  emptyList = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Meal and/or Food not found for date:
        {` ${moment().format('MMM DD')}`}
      </Text>
    </View>
  )

  render() {
    const { navigation, meals = [] } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.proteinBarWrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', fontFamily: Fonts.HELVETICA_BOLD }}>{moment().format('MMM DD')}</Text>
          </View>
          <ProteinBar
            numberOfCarbs={meals.reduce((total, current) => total + current.carbohydrate, 0)}
            numberOfFat={meals.reduce((total, current) => total + current.fat, 0)}
            numberOfProtein={meals.reduce((total, current) => total + current.protein, 0)}
          />
        </View>
        <View style={{ flex: 2, marginTop: 5 }}>
          <NutritionMenuContainer navigation={navigation} />
        </View>
        <View style={styles.lastContainer}>
          <SearchablePaginatedList
            style={{ flex: 1 }}
            ListEmptyComponent={this.emptyList}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10, paddingVertical: 0 }}
            list={meals}
            fetchListAction={() => {}}
            renderItem={item => this.renderItem(item)}
            search={''}
            filter={''}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  proteinBarWrapper: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'rgb(229,228,230);'
  },
  lastContainer: {
    flex: 6,
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  }
});

export default NutrationContainer;
