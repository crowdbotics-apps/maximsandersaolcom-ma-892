import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

const IntroScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HI! from another screen</Text>
    </View>
  );
}

export default IntroScreen;