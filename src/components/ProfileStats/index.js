import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const iconArrow = require('../../assets/icon_arrow.png');

const styles = StyleSheet.create({
  myProfileContainer: {
    width: '100%',
    marginLeft: 15,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center'
  },
  statsRowContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  statsRowInner: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  statsNum: {
    paddingRight: 5,
    fontWeight: '500',
    fontSize: 14
  },
  statsText: {
    fontWeight: '500',
    fontSize: 14,
    color: 'gray'
  }
});

const ProfileStats = ({ followers = 0, following = 0, friends = 0 }) => (
  <View style={{ width: '100%' }}>
    <View style={styles.myProfileContainer}>
      <Text>My Profile</Text>
      <TouchableOpacity>
        <Image
          style={{ width: 25, height: 25 }}
          source={iconArrow}
        />
      </TouchableOpacity>
    </View>
    <View style={styles.statsRowContainer}>
      <View style={styles.statsRowInner}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={styles.statsNum}>
              {friends}
            </Text>
          </View>
          <View>
            <Text style={styles.statsText}>
              Friends
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={styles.statsNum}>
              {following}
            </Text>
          </View>
          <View>
            <Text style={styles.statsText}>
              Following
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={styles.statsNum}>
              {followers}
            </Text>
          </View>
          <View>
            <Text style={styles.statsText}>
              Followers
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default ProfileStats;
