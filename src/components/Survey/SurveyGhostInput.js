import React from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback
} from 'react-native';


const SurveyGhostInput = ({ onPress, value, placeholder }) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.inputContainer}>
        <View style={[styles.inputWrap, value.length && { borderBottomColor: '#3180BD'}]}>
          <Text style={[styles.input, value.length && { color: '#000'}]}>{!value ? placeholder : value }</Text>
        </View>

        {value.length > 0
            && (
            <View style={styles.placeholderWrap}>
              <Text style={styles.placeholder}>{placeholder}</Text>
            </View>
            )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative'
  },
  inputWrap: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  input: {
    fontSize: 25,
    paddingVertical: 15,
    color: '#d3d3d3',
  },
  placeholderWrap: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  placeholder: {
    color: '#d3d3d3',
    fontSize: 25
  }
});

export default SurveyGhostInput;
