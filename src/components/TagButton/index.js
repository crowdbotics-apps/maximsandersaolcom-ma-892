import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';

const TagButton = ({ buttonContainerStyleProp, buttonContainerText, buttonContainerTextStyle }) => (
  <TouchableOpacity>
    <View
      style={[styles.buttonContainerStyle, buttonContainerStyleProp]}
    >
      <Text style={[styles.buttonTextStyle, buttonContainerTextStyle]}>
        {buttonContainerText}
      </Text>
    </View>
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

export default TagButton;
