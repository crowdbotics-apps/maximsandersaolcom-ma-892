import React from 'react';
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native';

const CategoryTagItem = ({
  onPresFunc,
  index,
  tagText,
  tagTextStyle = {},
  tagTextContainerStyle = {},
  touchableContainerStyle,
}) => (
  <TouchableOpacity
    key={index}
    onPress={() => onPresFunc()}
    style={touchableContainerStyle}
  >
    <View style={tagTextContainerStyle}>
      <Text style={tagTextStyle}>{tagText}</Text>
    </View>
  </TouchableOpacity>
);

export default CategoryTagItem;
