import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Packages
import Video from 'react-native-video';
import i18n from '../../i18n/i18n';
import { testAction } from '../../redux/modules/authReducer';
// Components
import { Button } from '../../components/Login';
import Routes from '../../Routes';

const logoImage = require('../../assets/logoSplashScreen.png');
const videoFile = require('../../assets/video/SplashScreen.mp4');

const mainActions = {
  testAction
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgb(178, 179, 181)',
    opacity: 0.5,
  },
  conteiner: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    width
  },
  logo: {
    width,
    height: 150,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column'
  }
});

const IntroScreen = ({ navigation: { navigate } }) => (
  <View style={styles.conteiner}>
    <Video
      source={videoFile}
      style={styles.backgroundVideo}
      repeat
      rate={1.0}
      resizeMode="cover"
    />
    <View style={{ flex: 1 }} />
    <View style={styles.logoContainer}>
      <Image
        source={logoImage}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
    <View style={styles.buttonsContainer}>
      <Button
        style={{
          marginBottom: 35,
        }}
        label={i18n.t('loginScreen.login')}
        onPress={() => navigate(Routes.LoginScreen)}
      />
      <Button
        style={{
          marginBottom: 35,
        }}
        label={i18n.t('loginScreen.register')}
        onPress={() => navigate(Routes.RegisterScreen)}
      />
    </View>
  </View>
);

export default connect(
  ({ auth: { authenticated } }) => ({
    authenticated
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(IntroScreen);
