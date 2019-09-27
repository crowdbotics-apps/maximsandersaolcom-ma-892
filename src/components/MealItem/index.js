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

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};

const MealItem = ({
  clock,
  mealItems,
  numberOfProtein,
  numberOfCarbs,
  numberOfFat,
  pieArray,
  index,
  titleContainerStyle
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
            data={pieArray}
            width={80}
            height={80}
            chartConfig={chartConfig}
            accessor="procentage"
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
  },
  titleWrapper: {
    paddingVertical: 10
  }
});

MealItem.defaultProps = {
  clock: '',
  mealItems: [],
  numberOfProtein: 0,
  numberOfCarbs: 0,
  numberOfFat: 0,
  key: 0,
};

MealItem.propTypes = {
  clock: PropTypes.string,
  mealItems: PropTypes.arrayOf(PropTypes.shape({})),
  numberOfProtein: PropTypes.number,
  numberOfCarbs: PropTypes.number,
  numberOfFat: PropTypes.number,
  key: PropTypes.number
};

export default MealItem;
