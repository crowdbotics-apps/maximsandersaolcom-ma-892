import React from 'react';
import { View, Text } from 'react-native';


const NoMoreItems = () => (
  <View
    style={{
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Text style={{ fontSize: 22, fontWeight: '500' }}>No more items</Text>
  </View>
);

export default NoMoreItems;
