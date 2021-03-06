import React from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import ProfileMenuItem from '../ProfileMenuItem';
import Routes from '../../Routes';
import i18n from '../../i18n/i18n';
import {useDispatch} from "react-redux";
import {withNavigation} from 'react-navigation';
import {
    logOut
} from '../../redux/modules/authReducer';

const findMyProgramIcon = require('../../assets/icon_find_my_program.png');
const myFavoritesIcon = require('../../assets/icon_my_favorites.png');
const myProgressAndDataIcon = require('../../assets/icon_my_progress.png');
const learnIcon = require('../../assets/icon_learn.png');
const settingsIcon = require('../../assets/icon_settings.png');
import logoutIcon from '../../assets/SignOut-icon.png';

const ProfileMenu = (props) => {

    const dispatch = useDispatch();

    const signOut = async () => {
        try {
            await dispatch(logOut());
        } catch(err) {console.log(err)}
    };

    return(
        <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
            <ProfileMenuItem
                menuIcon={findMyProgramIcon}
                menuText={i18n.t('profileScreen.profileMenuItems.findMyProgram')}
                route={Routes.SurveyScreen}
            />
            <ProfileMenuItem
                menuIcon={myFavoritesIcon}
                menuText={i18n.t('profileScreen.profileMenuItems.myFavorites')}
                route={Routes.FavoritesScreen}
            />
            <ProfileMenuItem
                menuIcon={myProgressAndDataIcon}
                menuText={i18n.t('profileScreen.profileMenuItems.myProgressAndData')}
                route={Routes.MyProgressAndData}
            />
            {/*<ProfileMenuItem*/}
            {/*  menuIcon={learnIcon}*/}
            {/*  menuText={i18n.t('profileScreen.profileMenuItems.learn')}*/}
            {/*  route={Routes.TestScreen}*/}
            {/*/>*/}
            {/*<ProfileMenuItem*/}
            {/*    //Settings open Drawer*/}
            {/*  menuIcon={settingsIcon}*/}
            {/*  menuText={i18n.t('profileScreen.profileMenuItems.settings')}*/}
            {/*  openDrawer*/}
            {/*/>*/}
            <ProfileMenuItem
                menuIcon={logoutIcon}
                menuText={i18n.t('profileScreen.profileMenuItems.logout')}
                onPress={() => {
                    signOut();
                    props.navigation.navigate(Routes.IntroScreen);
                }}
            />
        </ScrollView>
    );
};

export default withNavigation(ProfileMenu);
