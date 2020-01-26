import React, { useState } from 'react';
import {
  Text, View, TextInput, StyleSheet
} from 'react-native';


const SurveyInput = (props) => {
  const [isFocus, setIsFocus] = useState(false);


  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, props.style, isFocus && { borderBottomColor: '#3180BD' }]}
        placeholder={props.placeholder}
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => !props.value.length && setIsFocus(false)}
      />

      {props.value.length > 0
                && (
                <View style={styles.placeholderWrap}>
                  <Text style={styles.placeholder}>{props.placeholder}</Text>
                </View>
                )
            }

    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  input: {
    fontSize: 25,
    paddingVertical: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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

export default SurveyInput;
