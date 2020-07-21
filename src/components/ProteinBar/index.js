import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const ProteinBar = ({
  numberOfProtein,
  numberOfCarbs,
  numberOfFat,
  styleProps
}) => (
  <View style={[styles.contentWrapper, styleProps]}>
    <View style={styles.classWrapper}>
      <Text style={styles.proteinLabel}>{`${parseFloat(Math.round(numberOfProtein)).toFixed(1)}g`}</Text>
      <Text style={styles.classLabel}>Protein</Text>
    </View>
    <View style={styles.classWrapper}>
      <Text style={styles.carbsLabel}>{`${parseFloat(Math.round(numberOfCarbs)).toFixed(1)}g`}</Text>
      <Text style={styles.classLabel}>Carbs</Text>
    </View>
    <View style={styles.classWrapper}>
      <Text style={styles.fatLabel}>{`${parseFloat(Math.round(numberOfFat)).toFixed(1)}g`}</Text>
      <Text style={styles.classLabel}>Fat</Text>
    </View>
  </View>
);

ProteinBar.defaultProps = {
  numberOfProtein: 0,
  numberOfCarbs: 0,
  numberOfFat: 0
};

ProteinBar.propTypes = {
  numberOfProtein: PropTypes.number,
  numberOfCarbs: PropTypes.number,
  numberOfFat: PropTypes.number
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  classLabel: {
    color: 'rgb(95,94,94);',
    fontSize: 16
  },
  classWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  proteinLabel: {
    color: 'rgb(68,161,248);',
    fontSize: 16
  },
  carbsLabel: {
    color: 'rgb(240,187,64);',
    fontSize: 16
  },
  fatLabel: {
    color: 'rgb(220,58,38);',
    fontSize: 16
  }
});
export default ProteinBar;
