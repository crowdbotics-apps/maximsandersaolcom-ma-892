import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const MenuItemButton = ({ icon, onPress, linkText }) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View style={styles.mainView}>
      <View>
        <Image source={icon} style={styles.iconStyle} />
      </View>
      <View style={styles.textStyle}>
        <Text style={{ textAlign: 'center' }}>{linkText}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainView: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    width: 35,
    height: 35,
    resizeMode: 'center'
  },
  textStyle: {
    alignItems: 'center',
    paddingLeft: 10
  }
});

MenuItemButton.defaultProps = {
  icon: '',
  onPress: () => {},
  linkText: ''
};

MenuItemButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onPress: PropTypes.func,
  linkText: PropTypes.string
};

export default MenuItemButton;
