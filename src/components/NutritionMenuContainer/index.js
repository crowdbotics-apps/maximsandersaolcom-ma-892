import React from 'react';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';
import MenuItemButton from '../MenuItemButton';
import Routes from '../../Routes';

const findFoodIcon = require('../../assets/findFoodIcon.png');
const barcodeIcon = require('../../assets/barcode.png');

const NutritionMenuContainer = ({ navigation: { navigate } }) => (
  <View style={{ flex: 1, justifyContent: 'space-between' }}>
    <MenuItemButton
      onPress={() => navigate(Routes.FindFoodAndRecipesScreen)}
      linkText="Find Foods and Recipes"
      icon={findFoodIcon}
    />
    <MenuItemButton
      onPress={() => navigate(Routes.BarCodeScreen)}
      linkText="Scan Barcode"
      icon={barcodeIcon}
    />
  </View>
);

MenuItemButton.defaultProps = {
  navigation: {
    navigate: () => {}
  }
};

MenuItemButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

export default NutritionMenuContainer;
