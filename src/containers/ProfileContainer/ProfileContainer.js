import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    width: '100%'
  },
});

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.containerCenter}>
        <SafeAreaView style={{ backgroundColor: 'white' }} />
        <ProfileHeader
          imageUrl="https://picsum.photos/150/150"
          backgroundUrl="https://picsum.photos/350/150"
        />
      </View>
    );
  }
}

export default ProfileContainer;
