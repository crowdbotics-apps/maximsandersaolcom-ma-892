import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  menuItemRow: {
    marginLeft: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    width: 30,
    height: 30
  }
});

const ProfileMenuItem = ({
  menuIcon,
  menuText = '',
  route = '',
  navigation,
  onPress,
  openDrawer
}) => (
  <TouchableOpacity
    onPress={() => {
      if (openDrawer) {
        return navigation.openDrawer();
      }
      if (route === '') {
        return onPress();
      }
      return navigation.navigate(route);
    }}
  >
    <View style={styles.menuItemRow}>
      <View style={{ marginRight: 20 }}>
        <Image
          style={styles.iconStyle}
          source={menuIcon}
        />
      </View>
      <View>
        <Text style={{ fontSize: 14 }}>
          {menuText}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

ProfileMenuItem.defaultProps = {
  menuIcon: '',
  route: '',
  menuText: '',
  onPress: () => {},
  openDrawer: false
};

ProfileMenuItem.propTypes = {
  menuIcon: PropTypes.number,
  menuText: PropTypes.string,
  route: PropTypes.string,
  navigation: PropTypes.shape().isRequired,
  onPress: PropTypes.func,
  openDrawer: PropTypes.bool
};

export default withNavigation(ProfileMenuItem);
