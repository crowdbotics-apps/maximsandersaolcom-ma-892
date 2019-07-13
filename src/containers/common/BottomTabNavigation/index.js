import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Routes from '../../../Routes';

import { isIphoneX } from '../../../utils/common';

const parentListIcon = require('../../../assets/Icon_user.png');
const parentListSelectedIcon = require('../../../assets/Icon_user.png');


export default class BottomTabNavigationContainer extends Component {
  state = {
    menuItemList: [
      {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        onClick: () => {
          const { navigation } = this.props;
          navigation.replace(Routes.ProParentsListScreen);
        }
      }, {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        onClick: () => {
          const { navigation } = this.props;
          navigation.replace(Routes.ProParentsListScreen);
        }
      }, {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        onClick: () => {
          const { navigation } = this.props;
          navigation.replace(Routes.ProParentsListScreen);
        },
        indicator: this.props.unreadMessages // eslint-disable-line
      }, {
        normal: parentListIcon,
        active: parentListSelectedIcon,
        onClick: () => {
          const { navigation } = this.props;
          navigation.replace(Routes.ProParentsListScreen);
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
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity
            activeOpacity={isActive ? 1 : 0.35}
            onPress={isActive ? () => null : menuItem.onClick}
          >
            <Image
              style={{ width: 35, height: 35 }}
              source={isActive ? menuItem.active : menuItem.normal}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View
        style={
          !isIphoneX() ? ({
            flexDirection: 'row',
            height: 60,
            backgroundColor: '#FAFAFA',
            borderColor: '#BFBFBF',
            borderTopWidth: 1
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
