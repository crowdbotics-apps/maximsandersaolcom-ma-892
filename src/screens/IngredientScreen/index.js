import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import IngredientContainer from '../../containers/IngredientContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }
});
const IngredientScren = props => (
  <SafeAreaView style={styles.container}>
    <IngredientContainer {...props} />
  </SafeAreaView>
);

export default IngredientScren;
