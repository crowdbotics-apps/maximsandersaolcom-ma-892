import React from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import Font from '../../assets/fonts';
import Dropdown from './SubComponents/Dropdown';
import { getNumber } from '../../redux/modules/nutritionReducer'

const infoOtlineIcon = require('../../assets/infoOutlineIcon.png');

const recalculateMeasureCalories = item => {
  if (item.measure === null) {
    return item.calories * item.portion;
  }
  if (item.food) {
    return (
      // eslint-disable-next-line radix
      (getNumber(item.measure.weight) / getNumber(parseFloat(item.food.weight))) *
      item.food.calories *
      (item.portion / getNumber(item.measure.quantity))
    );
  }
  return (
    // eslint-disable-next-line radix
    (getNumber(item.measure.weight) / getNumber(parseFloat(item.weight))) *
    item.calories *
    (item.portion / getNumber(item.measure.quantity))
  );
}

const SwipeListItem = ({ item, editSelectedProductsAction, index }) => {
  console.log("item", item);
  const parseValToFixed = e => parseFloat(e).toFixed(1);
  const isEventValueNum = e => !isNaN(parseValToFixed(e)) && parseValToFixed(e) || 0;
  return (
    <View style={styles.containerSwipeItem} key={index}>
      <View style={styles.imageSwipeItem}>
        <Image style={styles.imageSwipe} source={{ uri: item.thumb }} resizeMode="center"/>
      </View>
      <View style={styles.mainSwipeContainer}>
        <View style={styles.mainUpperContainer}>
          <View style={styles.inputWrapperContainer}>
            <TextInput
              keyboardType="numeric"
              maxLength={3}
              value={item.portion === 0 ? '' : item.portion.toString()}
              placeholder="0"
              style={styles.inputStyle}
              onChangeText={(e) => editSelectedProductsAction(item, 'portion', isEventValueNum(e))}
            />
          </View>
          <View>
            <Dropdown
              onSelect={editSelectedProductsAction}
              measure={item.measure}
              item={item}
              options={item.units}
            />
          </View>
          <View style={styles.infoContainer}>
            <Image source={infoOtlineIcon} style={styles.infoIconStyle} />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.caloriesContainer}>
        <View>
        <Text style={styles.caloriesText}>{Math.round(recalculateMeasureCalories(item))}</Text>
        </View>
        <View>
          <Text style={styles.caloriesTextStatic}>Cal</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoIconStyle: {
    width: 30,
    height: 30,
    marginTop: 15
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
    fontFamily: Font.HELVETICA_NORMAL,
    fontSize: 15,
    color: 'black'
  },
  caloriesTextStatic: {
    fontFamily: Font.HELVETICA_MEDIUM,
    color: 'black',
    fontSize: 16
  },
  caloriesText: {
    fontFamily: Font.HELVETICA_MEDIUM,
    color: 'rgb(68, 161, 250)',
    fontSize: 14,
    fontWeight: '500'
  },
  modalButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  dropdownTextStyle: {
    fontSize: 14,
    color: 'black'
  },
  dropdownStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    flexDirection: 'row'
  },
  dropdownContainer: {
    width: 110,
    maxWidth: 110,
    borderColor: 'gray',
    borderWidth: 1,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
  },
  caloriesContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  inputWrapperContainer: {
    width: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainUpperContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainSwipeContainer: {
    flex: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  containerSwipeItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'rgb(200,200,200)',
    borderTopColor: 'rgb(200,200,200)',
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  imageSwipeItem: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSwipe: {
    width: 50,
    height: 50,
  },
});

export default SwipeListItem
