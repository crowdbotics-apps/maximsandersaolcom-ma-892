import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';

const FatExerciseButton = ({ buttonLabel, buttonText, onClick }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={() => onClick()}>
    <View style={styles.iconContainer}>
      <Text style={styles.styleButtonText}>{buttonText}</Text>
    </View>
    <View style={styles.separator} />
    <View style={styles.buttonText}>
      <Text style={styles.buttonLabelStyle}>{buttonLabel}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  separator: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    width: 50,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 20,
    backgroundColor: 'rgb(242, 242, 242)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: { width: 20, height: 20 },
  buttonText: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  styleButtonText: {
    fontSize: 26,
    color: 'black',
    fontWeight: '800'
  },
  buttonLabelStyle: {
    color: 'black',
    fontSize: 14
  }
});

export default FatExerciseButton;
