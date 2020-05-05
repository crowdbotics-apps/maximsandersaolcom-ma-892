import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressBarItem from './ProgressBarItem';


const ProgressBar = ({ percentage }) => (
  <View style={styles.container}>

    <ProgressBarItem
      percentage={percentage}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 320,
    height: 12,
    marginBottom: 30,
    backgroundColor: '#d3d3d3',
  }
});

export default ProgressBar;
