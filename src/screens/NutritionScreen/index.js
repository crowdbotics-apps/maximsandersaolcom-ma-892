import React from 'react';
import { View, StyleSheet } from 'react-native';
import BarcodeScanner from '../../components/BarcodeScanner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const NutritionScreen = () => (
  <View style={styles.container}>
    <BarcodeScanner />
  </View>
);

export default NutritionScreen;
