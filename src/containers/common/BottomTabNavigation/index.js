import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { withNavigation } from 'react-navigation';

import Routes from '../../../Routes';

import { isIphoneX } from '../../../utils/common';

const parentListIcon = require('../../../assets/Icon_user.png');
const parentListSelectedIcon = require('../../../assets/Icon_user.png');


class BottomTabNavigationContainer extends Component {
  state = {
    menuItemList: [
      {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        text: 'Today',
        onClick: () => {
          const { navigation } = this.props;
          navigation.navigate(Routes.ProfileScreen);
        }
      }, {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        text: 'Profile',
        onClick: () => {
          const { navigation } = this.props;
          navigation.navigate(Routes.ProfileScreen);
        }
      }, {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        text: 'Feed',
        onClick: () => {
          const { navigation } = this.props;
          navigation.navigate(Routes.TestScreen);
        },
      }, {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        text: 'Recipes',
        onClick: () => {
          const { navigation } = this.props;
          navigation.navigate(Routes.TestScreen);
        }
      }, {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        text: 'Programs',
        onClick: () => {
          const { navigation } = this.props;
          navigation.navigate(Routes.TestScreen);
        }
      }
    ]
  }

  render() {
    let { active } = this.props;
    const { menuItemList } = this.state;
    if (typeof active !== 'number') active = 0;
    if (active >= menuItemList.length) active = 0;
    const menuItems = [];
    for (let index = 0; index < menuItemList.length; index += 1) {
      const menuItem = menuItemList[index];

      const isActive = index === active;

      menuItems.push(
        <View
          key={index}
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isActive ? 'gray' : '#fff',
            height: !isIphoneX() ? 55 : 75
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={isActive ? 1 : 0.35}
            onPress={isActive ? () => null : menuItem.onClick}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={isActive ? menuItem.active : menuItem.normal}
            />
            <Text style={{ fontSize: 12 }}>
              {menuItem.text}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View
        style={
          !isIphoneX() ? ({
            flexDirection: 'row',
            height: 55,
            backgroundColor: '#FAFAFA',
            borderColor: '#BFBFBF',
            borderTopWidth: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }) : ({
            flexDirection: 'row',
            height: 75,
            backgroundColor: '#FAFAFA',
            borderColor: '#BFBFBF',
            borderTopWidth: 1,
            paddingBottom: 15,
            alignItems: 'center'
          })}
      >
        {menuItems}
      </View>
    );
  }
}

export default withNavigation(BottomTabNavigationContainer);
