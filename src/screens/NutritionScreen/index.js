import React from 'react';
import { View, StyleSheet } from 'react-native';
// import BarcodeScanner from '../../components/BarcodeScanner';
import NutrationContainer from '../../containers/NutrationContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center'
  }
});
const NutritionScreen = props => (
  <View style={styles.container}>
    <NutrationContainer {...props} />
  </View>
);

export default NutritionScreen;
