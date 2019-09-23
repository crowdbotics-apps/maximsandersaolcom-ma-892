import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    }}
  >
    <ActivityIndicator size="large" color="#3180BD" />
  </View>
);

export default Loading;
