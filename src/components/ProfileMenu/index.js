import React from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import ProfileMenuItem from '../ProfileMenuItem';
import Routes from '../../Routes';
import i18n from '../../i18n/i18n';

const menuItemIconPlaceholder = require('../../assets/Icon_user.png');

const ProfileMenu = () => (
  <View style={{ width: '100%', marginTop: 20, marginBottom: 300 }}>
    <ScrollView>
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText={i18n.t('profileScreen.profileMenuItems.findMyProgram')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText={i18n.t('profileScreen.profileMenuItems.myFavorites')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText={i18n.t('profileScreen.profileMenuItems.myProgressAndData')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText={i18n.t('profileScreen.profileMenuItems.learn')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={menuItemIconPlaceholder}
        menuText={i18n.t('profileScreen.profileMenuItems.settings')}
        route={Routes.TestScreen}
      />
    </ScrollView>
  </View>
);

export default ProfileMenu;
