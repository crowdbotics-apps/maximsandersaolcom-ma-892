import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {withNavigation} from 'react-navigation';
import Routes from '../../Routes';
import Api from '../../api';
import moment from 'moment';

const StartupScreen = props => {
  const dispatch = useDispatch();

  const store = useSelector(state => state);
  console.log('STORE ', store);
  const api = Api.getInstance();

  const fetchBE = async () => {
    try {
      const fetchGetSubscriptions = await api.fetch(
        'GET',
        '/payment/get_subs/',
      );
      return fetchGetSubscriptions;
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log('TOKEN INSIDE STARTUP ', userData);
      if (!userData) {
        props.navigation.navigate(Routes.IntroScreen);
        return;
      }

      const transformedData = JSON.parse(userData);
      const {token} = transformedData;

      if (!token) {
        api.removeToken();
        props.navigation.navigate(Routes.IntroScreen);
        return;
      } else {
        api.addToken(token, '');
        const subsctiptions = await fetchBE();
        console.log('subsctiptions', subsctiptions);
        if (!subsctiptions.data.data.length) {
          props.navigation.navigate(Routes.SubscriptionScreen);
        } else {
          const {
            data: {
              data: {current_period_end},
            },
          } = subsctiptions;
          if (moment().unix() > current_period_end) {
            props.navigation.navigate(Routes.SubscriptionScreen);
            return;
          }
          props.navigation.navigate(Routes.ProfileScreen);
        }
      }
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={'#3180BD'} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withNavigation(StartupScreen);
