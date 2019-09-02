import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {
  PieChart,
} from 'react-native-chart-kit';
import moment from 'moment';
import ProteinBar from '../ProteinBar';
import IngredientsItem from '../IngredientsItem';

const data = [
  { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: 8538000, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
];

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};

const mockMilkImage = require('../../assets/mock-milk.png');

const MealItem = ({
  title,
  clock,
  mealItems,
  numberOfProtein,
  numberOfCarbs,
  numberOfFat
}) => (
  <View>
    <View style={{ paddingVertical: 10 }}>
      <Text style={styles.mealText}>{title}</Text>
    </View>
    <View
      style={styles.itemContainer}
    >
      <View
        style={styles.innerContainer}
      >
        <View style={styles.proteinBarContainer}>
          <View style={{ paddingLeft: 3, paddingTop: 3 }}>
            <Text style={styles.clockContainer}>{moment(clock).format('h:mm a')}</Text>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <ProteinBar
              styleProps={{ justifyContent: 'space-between' }}
              numberOfProtein={numberOfProtein}
              numberOfCarbs={numberOfCarbs}
              numberOfFat={numberOfFat}
            />
          </View>
        </View>
        <View style={styles.chartMainContainer}>
          <PieChart
            data={data}
            width={80}
            height={80}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="25"
            absolute={false}
          />
        </View>
      </View>
      <View style={{ padding: 5 }}>
        {
          mealItems.length ? mealItems.map(item => (
            <IngredientsItem
              ingredientName={item.food.name}
              ingredientSize={item.portion}
              ingredientImage={item.food.thumb}
            />
          )) : null
        }
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
    borderBottomColor: 'rgb(214,213,213);',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingVertical: 15,
  },
  proteinBarContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between'
  },
  clockContainer: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  chartMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

MealItem.defaultProps = {
  title: '',
  clock: '',
  mealItems: [],
  numberOfProtein: 0,
  numberOfCarbs: 0,
  numberOfFat: 0,
};

MealItem.propTypes = {
  title: PropTypes.string,
  clock: PropTypes.string,
  mealItems: PropTypes.arrayOf(PropTypes.shape({})),
  numberOfProtein: PropTypes.number,
  numberOfCarbs: PropTypes.number,
  numberOfFat: PropTypes.number
};

export default MealItem;
