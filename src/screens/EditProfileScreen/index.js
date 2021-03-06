import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

const EditScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Edit Screen</Text>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'blue' }}
    >
      <Text style={{ color: 'white' }}>GO BACK!</Text>
    </TouchableOpacity>
  </View>
);

export default withNavigation(EditScreen);
