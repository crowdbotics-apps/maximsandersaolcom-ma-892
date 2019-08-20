import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FindFoodAndRecipesContainer } from '../../containers/FindFoodAndRecipesContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }
});
const FindFoodAndRecipesScreen = props => (
  <View style={styles.container}>
    <FindFoodAndRecipesContainer {...props} />
  </View>
);

export default FindFoodAndRecipesScreen;
