import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileContainer from '../../containers/ProfileContainer';
import BottomTabNavigationContainer from '../../containers/common/BottomTabNavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const ProfileScreen = () => (
  <View style={styles.container}>
    <ProfileContainer />
    <BottomTabNavigationContainer active={1} />
  </View>
);
export default ProfileScreen;
