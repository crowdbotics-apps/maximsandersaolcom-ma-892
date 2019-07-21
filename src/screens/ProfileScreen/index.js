import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileContainer from '../../containers/ProfileContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const ProfileScreen = () => (
  <View style={styles.container}>
    <ProfileContainer />
  </View>
);
export default ProfileScreen;
