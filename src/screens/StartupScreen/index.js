import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {withNavigation} from 'react-navigation';
import Routes from '../../Routes';
import Api from '../../api';

const StartupScreen = props => {
  const dispatch = useDispatch();

  const store = useSelector(state => state);
  console.log('STORE ', store);
  const api = Api.getInstance();

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
        if (true) {
          api.addToken(token, '');
          props.navigation.navigate(Routes.SubscriptionScreen);
        } else {
          api.addToken(token, '');
          props.navigation.navigate(Routes.FeedScreen);
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
