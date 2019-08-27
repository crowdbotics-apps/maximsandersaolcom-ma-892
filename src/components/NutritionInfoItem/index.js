import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  infoItemsCentered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemTitle: {
    color: 'rgb(146, 146, 146)',
    fontSize: 12
  },
  itemQuantity: {
    fontSize: 22,
    fontWeight: '300'
  }
});

const NutritionInfoItem = ({
  infoItemsContainerStyle,
  itemQuantityStyle,
  itemTitleStyleProp,
  itemTitle,
  itemQuantity
}) => (
  <View style={[styles.infoItemsCentered, infoItemsContainerStyle]}>
    <View style={{ paddingBottom: 5 }}>
      <Text style={[styles.itemTitle, itemTitleStyleProp]}>{itemTitle}</Text>
    </View>
    <View style={{ paddingBottom: 10 }}>
      <Text style={[styles.itemQuantity, itemQuantityStyle]}>{itemQuantity}</Text>
    </View>
  </View>
);

export default NutritionInfoItem;
