import React from 'react';
import { View, StyleSheet } from 'react-native';
import SwapExerciseContainer from '../../containers/SwapExerciseContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

const SwapExerciseScreen = props => (
  <View style={styles.container}>
    <SwapExerciseContainer {...props} />
  </View>
);
export default SwapExerciseScreen;
