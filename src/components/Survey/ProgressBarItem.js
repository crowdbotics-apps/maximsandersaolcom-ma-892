import React from 'react';
import { View, StyleSheet } from 'react-native';


const ProgressBarItem = ({ percentage }) => (
  <>
    <View style={[styles.item, { width: `${percentage}%` }]}>
      <View style={styles.pin} />
    </View>
  </>
);

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    height: '100%',
    backgroundColor: 'gray'
  },
  pin: {
    position: 'absolute',
    right: -4,
    top: 0,
    width: 4,
    height: 12,
    backgroundColor: '#3180BD'
  }
});

export default ProgressBarItem;
