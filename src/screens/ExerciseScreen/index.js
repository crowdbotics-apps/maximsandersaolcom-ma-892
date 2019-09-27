import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseContainter from '../../containers/ExerciseContainter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

const ExerciseScreen = props => (
  <View style={styles.container}>
    <ExerciseContainter {...props} />
  </View>
);
export default ExerciseScreen;
