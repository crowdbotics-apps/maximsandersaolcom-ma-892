import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileContainer from '../../containers/ProfileContainer';
import BottomTabNavigationContainer from '../../containers/common/BottomTabNavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default class ProfileScreen extends Component {
    render () {
        return (
            <View style={styles.container}>
                <ProfileContainer />
                <BottomTabNavigationContainer  active={1} />
            </View>
        )
    }
}
