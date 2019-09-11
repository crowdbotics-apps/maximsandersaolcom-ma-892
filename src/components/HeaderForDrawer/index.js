import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const iconBurger = require('../../assets/hamburger.png');
const logoMaxim = require('../../assets/logo.png');

const HeaderForDrawer = ({ onDrawerButtonPress }) => (
  <View style={styles.headerNav}>
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => onDrawerButtonPress()}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={iconBurger}
        />
      </TouchableOpacity>
    </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ width: 70, height: 30 }}
        source={logoMaxim}
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