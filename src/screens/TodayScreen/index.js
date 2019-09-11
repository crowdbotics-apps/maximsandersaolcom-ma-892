import React from 'react';
import { View, StyleSheet } from 'react-native';
import TodayContainer from '../../containers/TodayContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const TodayScreen = () => (
  <View style={styles.container}>
    <TodayContainer />
  </View>
);
export default TodayScreen;
