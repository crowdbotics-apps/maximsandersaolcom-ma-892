import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgramContainer from '../../containers/ProgramContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const ProgramScreen = () => (
  <View style={styles.container}>
    <ProgramContainer />
  </View>
);
export default ProgramScreen;
