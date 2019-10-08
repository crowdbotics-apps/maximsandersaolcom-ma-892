import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

const ModalButton = ({
  onPress,
  buttonStyle,
  label,
  labelStyle
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={buttonStyle}
  >
    <Text style={labelStyle}>{label}</Text>
  </TouchableOpacity>
);

export default ModalButton;
