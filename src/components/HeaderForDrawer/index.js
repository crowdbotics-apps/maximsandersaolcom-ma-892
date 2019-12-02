import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const defaultIconBurger = require('../../assets/hamburger.png');
const logoMaxim = require('../../assets/logoSplashScreen.png');

const HeaderForDrawer = ({
  onDrawerButtonPress,
  headerNavProp,
  hideHamburger = false,
  iconBurger = defaultIconBurger
}) => (
  <View style={[styles.headerNav, headerNavProp]}>
    <View style={{ flex: 1 }}>
      {
        !hideHamburger ? (
          <TouchableOpacity
            onPress={() => onDrawerButtonPress()}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={iconBurger}
            />
          </TouchableOpacity>
        ) : null
      }
    </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ width: 100, height: 30 }}
        source={logoMaxim}
        resizeMode="cover"
      />
    </View>
    <View style={{ flex: 1 }} />
  </View>
);

const styles = StyleSheet.create({
  headerNav: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(214,214,214)',
    width: '100%'
  }
});

export default HeaderForDrawer;
