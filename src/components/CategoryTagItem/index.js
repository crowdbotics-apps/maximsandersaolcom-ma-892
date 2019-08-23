import React from 'react';
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native';

const CategoryTagItem = ({
  onPresFunc,
  key,
  tagText,
  tagTextStyle = {},
  tagTextContainerStyle = {},
  touchableContainerStyle
}) => (
  <TouchableOpacity
    key={key}
    onPress={() => onPresFunc()}
    style={touchableContainerStyle}
  >
    <View style={tagTextContainerStyle}>
      <Text style={tagTextStyle}>{tagText}</Text>
    </View>
  </TouchableOpacity>
);

export default CategoryTagItem;
