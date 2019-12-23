import React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectSubscriptionContainer from '../../containers/SelectSubscriptionContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

const SelectSubscriptionScreen = props => (
  <View style={styles.container}>
    <SelectSubscriptionContainer {...props} />
  </View>
);
export default SelectSubscriptionScreen;
