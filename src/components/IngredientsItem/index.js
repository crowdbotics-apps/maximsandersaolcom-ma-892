import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const IngredientsItem = ({ ingredientSize, ingredientImage, ingredientName }) => (
  <View style={styles.mainContainer}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: ingredientImage }} style={styles.imageStyle} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>{ingredientName}</Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>{ingredientSize}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 3
  },
  textStyle: {
    color: 'rgb(94, 94, 94)',
    fontSize: 14
  },
  textContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1
  },
  imageStyle: {
    width: 50,
    height: 50
  },
  imageContainer: {
    justifyContent: 'flex-start',
    flex: 1
  }
});

export default IngredientsItem;
