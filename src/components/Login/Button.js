import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({
  onPress,
  style,
  label,
  labelStyle
}) => (
  <TouchableOpacity
    style={[styles.buttonStyle, style]}
    onPress={onPress}
  >
    <Text style={[styles.labelDefaultStyle, labelStyle]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 35,
    marginHorizontal: 60,
    backgroundColor: 'rgb(65, 156, 248)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelDefaultStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500'
  }
});

Button.defaultProps = {
  onPress: () => {},
  style: {},
  label: '',
  labelStyle: {}
};

Button.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.shape(),
  label: PropTypes.string,
  labelStyle: PropTypes.shape()
};

export default Button;
