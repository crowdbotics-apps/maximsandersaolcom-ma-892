import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
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
  navigation
}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate(route)}
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

export default withNavigation(ProfileMenuItem);
