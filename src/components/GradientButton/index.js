import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({
  buttonContainerStyleProp,
  buttonContentContainerProp,
  buttonContainerText,
  buttonContainerTextStyle,
  onPress,
  colorsGradient = [],
  isDone,
  colorsGradientDisable
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isDone}
    style={[styles.buttonContainerStyle, buttonContainerStyleProp, buttonContentContainerProp]}
  >
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={isDone ? colorsGradientDisable : colorsGradient}
      style={[styles.buttonContainerStyle, buttonContainerStyleProp]}
    >
      <Text style={[styles.buttonTextStyle, buttonContainerTextStyle]}>
        {buttonContainerText}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainerStyle: {
    marginBottom: 15,
    marginRight: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(214, 214, 214)'
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700'
  }
});

export default GradientButton;
