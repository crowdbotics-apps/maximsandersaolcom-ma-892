import React from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import ProfileMenuItem from '../ProfileMenuItem';
import Routes from '../../Routes';

const menuItemIconPlaceholder = require('../../assets/Icon_user.png');

const ProfileMenu = () => (
  <View style={{ width: '100%', marginTop: 20, marginBottom: 300 }}>
    <ScrollView>
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText="Find My Program"
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText="My Favorites"
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText="My Progress and Data"
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText="Learn"
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText="Settings"
        route={Routes.TestScreen}
      />
    </ScrollView>
  </View>
);

export default ProfileMenu;
