import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import FindFoodAndRecipesContainer from '../../containers/FindFoodAndRecipesContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }
});
const FindFoodAndRecipesScreen = props => (
  <SafeAreaView style={styles.container}>
    <FindFoodAndRecipesContainer {...props} />
  </SafeAreaView>
);

export default FindFoodAndRecipesScreen;
