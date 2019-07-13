import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { withNavigation } from 'react-navigation';
import i18n from '../../i18n/i18n';
import Routes from '../../Routes';

const logoImage = require('../../assets/logoSplashScreen.png');

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 100,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  paddingHor: {
    paddingHorizontal: 20,
  },
  buttonLoginFb: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
  },
  input: {
    height: Platform.select({ ios: 30, android: 40 }),
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 5
  },
  letsStartButton: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  orContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  orText: {
    fontSize: 17,
    color: '#000',
    fontWeight: '500'
  },
  buttonLoginTextStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  }
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      forceConsentPrompt: true,
      // Repleace with your webClientId generated from Firebase console
      webClientId: '122090316140-er5oevo3ek39e8hvq6egc2f6brrvme1b.apps.googleusercontent.com',
    });
  }

  handleInputChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value
    });
  }

  handleLoginViaFacebook = async () => {
    const { navigation } = this.props;
    try {
      const result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log('Login success with permissions: ', result.grantedPermissions.toString(), 'result:', result);
        const data = await AccessToken.getCurrentAccessToken();
        this.getUserDataFacebook(data.accessToken.toString());
        navigation.navigate(Routes.ProfileScreen);
      }
    } catch (err) {
      console.log('error on login via facebook', err);
    }
  }

  getUserDataFacebook = (token) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture&access_token=' + token)
      .then(response => response.json())
      .then((json) => {
        console.log('profile Data facebook:', json);
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK')
      });
  }

  signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user info', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("SIGN IN CANCEL ", error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("SIGN IN IN PROGRESS ", error);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("SIGN IN IN NOT AVAILABLE ", error);
        // play services not available or outdated
      } else {
        console.log("OTHER ERROR ", error);
        // some other error happened
      }
    }
  };

  render() {
    const {
      email,
      password
    } = this.state;
    return (
      <View style={styles.containerCenter}>
        <SafeAreaView style={{ backgroundColor: 'white' }} />
        <View style={styles.containerCenter}>
          <View style={styles.imageContainer}>
            <Image
              source={logoImage}
              style={styles.logo}
            />
          </View>
          <View style={[styles.containerCenter, styles.paddingHor]}>
            <View style={{ width: '100%', marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.buttonLoginFb}
                onPress={this.handleLoginViaFacebook}
              >
                <Text
                  style={styles.buttonLoginTextStyle}
                >
                  {i18n.t('loginScreen.facebookButton')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                style={styles.buttonLoginFb}
                onPress={() => this.signInGoogle()}
              >
                <Text
                  style={styles.buttonLoginTextStyle}
                >
                  {i18n.t('loginScreen.googleButton')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.orContainer}>
            <View style={styles.containerCenter}>
              <Text style={styles.orText}>{i18n.t('loginScreen.or')}</Text>
            </View>
            <View style={[styles.containerCenter, styles.paddingHor]}>
              <View style={{ width: '100%', paddingBottom: 15 }}>
                <TextInput
                  style={styles.input}
                  onChangeText={value => this.handleInputChange('email', value)}
                  value={email}
                  placeholder={i18n.t('loginScreen.emailPlaceholder')}
                />
              </View>
              <View style={{ width: '100%' }}>
                <TextInput
                  style={styles.input}
                  onChangeText={value => this.handleInputChange('password', value)}
                  value={password}
                  placeholder={i18n.t('loginScreen.passwordPlaceholder')}
                />
              </View>
            </View>
          </View>
          <View style={styles.containerCenter}>
            <TouchableOpacity style={styles.letsStartButton}>
              <Text style={{ fontSize: 15 }}>
                {i18n.t('loginScreen.loginButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(LoginScreen);
