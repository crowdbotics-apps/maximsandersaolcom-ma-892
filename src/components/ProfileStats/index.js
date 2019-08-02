import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import i18n from '../../i18n/i18n';

const styles = StyleSheet.create({
  statsRowContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  statsRowInner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
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

const ProfileStats = ({
  followers = 0,
  following = 0,
  friends = 0
}) => (
  <View style={{ width: '100%' }}>
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

ProfileStats.defaultProps = {
  followers: 0,
  following: 0,
  friends: 0
};

ProfileStats.propTypes = {
  followers: PropTypes.number,
  following: PropTypes.number,
  friends: PropTypes.number
};

export default ProfileStats;
