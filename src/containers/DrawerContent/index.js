import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { DrawerItems } from 'react-navigation';
import i18n from '../../i18n/i18n';
import Routes from '../../Routes';

const styles = StyleSheet.create({
  fullNameLabel: {
    fontSize: 20,
    fontWeight: '500'
  },
  logOutButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  logOutButtonLabel: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  advancedSettingButton: {
    padding: 16,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  advancedSettingButtonLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold'
  },
  scrollViewStyle: {
    flexGrow: 8.5
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30
  },
  headerWrapper: {
    flex: 1.5,
    padding: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  main: {
    flex: 1
  }
});

const DrawerContent = (props) => {
  const {
    screenProps: {
      profile = {},
      logOutAction = () => {}
    },
    navigation: {
      navigate
    }
  } = props || {};
  return (
    <View style={styles.main}>
      <View
        style={styles.headerWrapper}
      >
        <Text style={styles.fullNameLabel}>{profile && profile.name}</Text>
      </View>
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View>
          <DrawerItems
            activeTintColor="#2196f3"
            activeBackgroundColor="rgba(0, 0, 0, .04)"
            inactiveTintColor="rgba(0, 0, 0, .87)"
            inactiveBackgroundColor="transparent"
            style={{ backgroundColor: '#fff' }}
            labelStyle={{ color: 'black' }}
            itemStyle={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
            itemsContainerStyle={{
              paddingVertical: 0
            }}
            {...props}
          />
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              navigate(Routes.IntroScreen);
              logOutAction();
            }}
          >
            <Text
              style={styles.logOutButtonLabel}
            >
              {i18n.t('drawerNavigation.logOut')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.advancedSettingButton}
          onPress={() => console.log('advanced settings')}
        >
          <Text
            style={styles.advancedSettingButtonLabel}
          >
            {i18n.t('drawerNavigation.advancedSetting')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

DrawerContent.defaultProps = {
  screenProps: {
    logOutAction: () => {},
    profile: {
      name: ''
    }
  },
};

DrawerContent.propTypes = {
  screenProps: PropTypes.shape({
    logOutAction: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrawerContent;
