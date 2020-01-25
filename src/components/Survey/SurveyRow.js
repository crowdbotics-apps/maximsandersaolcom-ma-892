import React from 'react';
import { View, StyleSheet } from 'react-native';


const SurveyRow = props => (
  <View style={[styles.row, props.style]}>{props.children}</View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default SurveyRow;
