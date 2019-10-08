import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import MealRegulatorSearchWithIcon from '../MealRegulatorSearchWithIcon';

const iconArrowLeft = require('../../assets/arrow-left-white.png');

const HeaderWithSearch = ({
  headerNavProp,
  setSearchString,
  setSelectedItems,
  resetValue,
  productItems,
  unsetSearchActive,
  searchStringState,
  navigation
}) => (
  <View style={[styles.headerNav, headerNavProp]}>
    <View style={styles.navIconStyle}>
      <TouchableOpacity
        style={styles.iconStyle}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.iconStyle}
          source={iconArrowLeft}
        />
      </TouchableOpacity>
    </View>
    <View style={styles.searchContainer}>
      <View>
        <MealRegulatorSearchWithIcon
          searchStringState={searchStringState}
          productItems={productItems}
          searchForProducts={searchString => setSearchString(searchString)}
          setSelectedItems={item => setSelectedItems(item)}
          unsetSearchActive={unsetSearchActive}
          resetValue={resetValue}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flex: 6,
    justifyContent: 'center'
  },
  headerNav: {
    paddingTop: 15,
    paddingBottom: 10,
    height: 70,
    backgroundColor: 'rgb(55, 55, 55)',
    flexDirection: 'row'
  },
  navIconStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  iconStyle: {
    width: 30,
    height: 30
  }
});

export default withNavigation(HeaderWithSearch);
