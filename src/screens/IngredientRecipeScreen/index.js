import React from 'react';
import { View, StyleSheet } from 'react-native';
import IngredientRecipeContainer from '../../containers/IngredientRecipeContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }
});
const FindFoodAndRecipesScreen = props => (
  <View style={styles.container}>
    <IngredientRecipeContainer {...props} />
  </View>
);

export default FindFoodAndRecipesScreen;
