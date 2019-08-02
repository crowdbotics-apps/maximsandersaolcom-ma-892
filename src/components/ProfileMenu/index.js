import React from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import ProfileMenuItem from '../ProfileMenuItem';
import Routes from '../../Routes';
import i18n from '../../i18n/i18n';

const findMyProgramIcon = require('../../assets/icon_find_my_program.png');
const myFavoritesIcon = require('../../assets/icon_my_favorites.png');
const myProgressAndDataIcon = require('../../assets/icon_my_progress.png');
const learnIcon = require('../../assets/icon_learn.png');
const settingsIcon = require('../../assets/icon_settings.png');
const costcoIcon = require('../../assets/costco.jpg');

const ProfileMenu = () => (
  <View style={{ width: '100%', marginTop: 20, marginBottom: 300 }}>
    <ScrollView>
      <ProfileMenuItem
        menuIcon={costcoIcon}
        menuText={i18n.t('profileScreen.profileMenuItems.costco')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={findMyProgramIcon}
        menuText={i18n.t('profileScreen.profileMenuItems.findMyProgram')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={myFavoritesIcon}
        menuText={i18n.t('profileScreen.profileMenuItems.myFavorites')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={myProgressAndDataIcon}
        menuText={i18n.t('profileScreen.profileMenuItems.myProgressAndData')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={learnIcon}
        menuText={i18n.t('profileScreen.profileMenuItems.learn')}
        route={Routes.TestScreen}
      />
      <ProfileMenuItem
        menuIcon={settingsIcon}
        menuText={i18n.t('profileScreen.profileMenuItems.settings')}
        openDrawer
      />
    </ScrollView>
  </View>
);

export default ProfileMenu;
