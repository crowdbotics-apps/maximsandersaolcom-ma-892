import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import IndividualRecipeContainer from '../../containers/IndividualRecipeContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }
});
const IndividualRecipeScreen = props => (
  <SafeAreaView style={styles.container}>
    <IndividualRecipeContainer {...props} />
  </SafeAreaView>
);

export default IndividualRecipeScreen;
