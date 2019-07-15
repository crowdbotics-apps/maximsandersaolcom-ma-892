import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import i18n from '../../i18n/i18n';

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
      <Text>{i18n.t('profileScreen.profileStats.myProfile')}</Text>
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
              {i18n.t('profileScreen.profileStats.friends')}
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
              {i18n.t('profileScreen.profileStats.following')}
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
              {i18n.t('profileScreen.profileStats.followers')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default ProfileStats;
