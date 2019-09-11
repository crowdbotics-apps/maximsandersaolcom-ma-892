import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import i18n from '../../i18n/i18n';
import ProteinBar from '../../components/ProteinBar';
import NutritionMenuContainer from '../../components/NutritionMenuContainer';
import MealItem from '../../components/MealItem';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
import Fonts from '../../assets/fonts';

const dateTime = new Date();
const formatedDate = moment(dateTime).format('YYYY-MM-DD');

class NutrationContainer extends Component {
  componentWillMount() {
    const { getMealsByDateAction } = this.props;
    getMealsByDateAction(formatedDate);
  }

  renderItem = ({
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
    />
  );

  emptyList = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.emptyListLabel}>
        {`${i18n.t('nutritionContainer.emptyMeals')} ${moment().format('MMM DD')}`}
      </Text>
    </View>
  )

  render() {
    const { navigation, meals = [], getMealsByDateAction } = this.props;
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
            fetchListAction={() => getMealsByDateAction(formatedDate)}
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
  },
  emptyListLabel: {
    fontSize: 16,
    fontFamily: Fonts.HELVETICA_MEDIUM
  }
});

export default NutrationContainer;
