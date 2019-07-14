import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileStats from '../../components/ProfileStats';
import ProfileMenu from '../../components/ProfileMenu';

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    width: '100%'
  },
});

const ProfileContainer = ({ profile: { imageUrl = '' } }) => (
  <View style={styles.containerCenter}>
    <SafeAreaView style={{ backgroundColor: 'white' }} />
    <ProfileHeader
      imageUrl={imageUrl}
      backgroundUrl="https://picsum.photos/350/150"
    />
    <ProfileStats followers={0} following={0} friends={0} />
    <ProfileMenu />
  </View>
);

export default ProfileContainer;
