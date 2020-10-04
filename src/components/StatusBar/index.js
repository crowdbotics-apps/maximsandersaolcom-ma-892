import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const gradient = {
  1: ['#ffb029', '#ffe16b'],
  2: ['#00c417', '#52ff66'],
  3: ['#008dc4', '#4af3ff'],
};

const statusText = {
  1: 'Superset',
  2: 'Dropset',
  3: 'Triple Dropset',
};

const StatusBar = ({statusKey}) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={gradient[statusKey]}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <View style={styles.buttonWrapper}>
        <Text style={styles.buttonText}>{statusText[statusKey]}</Text>
      </View>
    </LinearGradient>
  );
};

export default StatusBar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  buttonWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});
