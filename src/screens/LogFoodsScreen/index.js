import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogFoodsContainer from '../../containers/LogFoodsContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const LogFoodsScreen = () => (
  <View style={styles.container}>
    <LogFoodsContainer />
  </View>
);
export default LogFoodsScreen;
