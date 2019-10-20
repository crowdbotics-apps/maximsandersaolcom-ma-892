import React from 'react';
import { View, StyleSheet } from 'react-native';
import MealRegulator from '../../containers/MealRegulator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const MealRegulatorScreen = () => (
  <View style={styles.container}>
    <MealRegulator />
  </View>
);
export default MealRegulatorScreen;
