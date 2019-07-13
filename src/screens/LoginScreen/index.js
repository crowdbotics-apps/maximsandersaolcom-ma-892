import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import i18n from '../../i18n/i18n';

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
    height: 30,
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
    fontSize: 15
  }
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleInputChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value
    })
  }

  handleLoginViaFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log('Login success with permissions: ' + result.grantedPermissions.toString(), 'result:', result);
        const data = await AccessToken.getCurrentAccessToken();
        console.log("token:",data.accessToken.toString(), "otherData:", data);
      }
    } catch (err) {
      console.log('error on login via facebook', err);
    }
  }

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
              >
                <Text
                  style={styles.buttonLoginTextStyle}
                >
                  {i18n.t('loginScreen.facebookButton')}
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

export default LoginScreen;
