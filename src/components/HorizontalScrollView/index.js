import React from 'react';
import {
  ScrollView
} from 'react-native';

const HorizontalScrollView = ({ children, containerStyle = {} }) => (
  <ScrollView
    showsHorizontalScrollIndicator={false}
    horizontal
    style={containerStyle}
  >
    {children}
  </ScrollView>
);

export default HorizontalScrollView;
