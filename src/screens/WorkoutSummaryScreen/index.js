import React from 'react';
import { View, StyleSheet } from 'react-native';
import WorkoutSummaryContainer from '../../containers/WorkoutSummaryContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const WorkoutSummaryScreen = props => (
  <View style={styles.container}>
    <WorkoutSummaryContainer {...props} />
  </View>
);
export default WorkoutSummaryScreen;
