import React from 'react';
import { View, StyleSheet } from 'react-native';
import BarcodeScanner from '../../containers/BarcodeContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const BarCodeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <BarcodeScanner navigation={navigation} />
  </View>
);

export default BarCodeScreen;
