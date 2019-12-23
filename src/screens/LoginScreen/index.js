import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from '../../i18n/i18n';
import Input from '../../components/Input';
import Routes from '../../Routes';
import {
  loginActionViaFacebook,
  loginActionViaGmail,
  regularLogin,
  resetErrors,
  setError
} from '../../redux/modules/authReducer';
import AuthService from '../../services/AuthService';

const mainActions = {
  loginActionViaFacebookAction: loginActionViaFacebook,
  loginActionViaGmailAction: loginActionViaGmail,
  regularLoginAction: regularLogin,
  resetErrorsAction: resetErrors,
  setErrorAction: setError
};

const logoImage = require('../../assets/logoSplashScreen.png');

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain'
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
    const { resetErrorsAction } = this.props;
    resetErrorsAction();
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      forceConsentPrompt: true,
      webClientId: '122090316140-er5oevo3ek39e8hvq6egc2f6brrvme1b.apps.googleusercontent.com',
    });
  }

  handleInputChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value
    });
  }

  handleLoginViaFacebook = async () => {
    const { loginActionViaFacebookAction, navigation } = this.props;
    try {
      const result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
      if (result.isCancelled) {
        console.log('Login cancelled', result);
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        await loginActionViaFacebookAction(data.accessToken.toString());
        navigation.navigate(Routes.ProfileScreen);
      }
    } catch (err) {
      console.log('error on login via facebook', err);
      throw err;
    }
  }

  signInGoogle = async () => {
    const { navigation, loginActionViaGmailAction } = this.props;
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens(); // to get tokens
      await loginActionViaGmailAction(accessToken);
      navigation.navigate(Routes.ProfileScreen);
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
      throw error;
    }
  };

  regularLogin = async (email, password) => {
    const {
      regularLoginAction,
      navigation,
      resetErrorsAction,
      setErrorAction
    } = this.props;
    try {
      const authService = new AuthService();
      const data = await authService.login({ username: email, password });
      const { user, token } = data;
      regularLoginAction(user, token);
      navigation.navigate(Routes.ProfileScreen);
    } catch (err) {
      resetErrorsAction();
      const arrayErrors = Object.entries(err.data);
      const arrayWithMessages = arrayErrors.map(item => ({
        field: `${item[0]}`,
        message: item[1].toString(),
      }));
      arrayWithMessages.map(item => setErrorAction({ field: item.field, message: item.message }));
    }
  }

  render() {
    const {
      email,
      password
    } = this.state;
    const {
      usernameErrorText,
      passwordErrorText,
      nonFieldErrorText
    } = this.props;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding' })}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
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
                  <View style={{ width: '100%' }}>
                    <Input
                      inputStyle={styles.input}
                      keyboardType="email-address"
                      onChangeText={value => this.handleInputChange('email', value)}
                      value={email}
                      error={usernameErrorText || nonFieldErrorText}
                      placeholder={i18n.t('loginScreen.emailPlaceholder')}
                      titleTextStyle={{
                        fontSize: 10
                      }}
                    />
                  </View>
                  <View style={{ width: '100%' }}>
                    <Input
                      inputStyle={styles.input}
                      secureTextEntry
                      onChangeText={value => this.handleInputChange('password', value)}
                      value={password}
                      error={passwordErrorText}
                      placeholder={i18n.t('loginScreen.passwordPlaceholder')}
                      titleTextStyle={{
                        fontSize: 10
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.containerCenter}>
                <TouchableOpacity
                  onPress={() => this.regularLogin(email, password)}
                  style={styles.letsStartButton}
                >
                  <Text style={{ fontSize: 15 }}>
                    {i18n.t('loginScreen.loginButton')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  ({
    auth: {
      authenticated,
      usernameErrorText,
      passwordErrorText,
      non_field_errorsError: nonFieldError,
      non_field_errorsErrorText: nonFieldErrorText
    }
  }) => ({
    authenticated,
    usernameErrorText,
    passwordErrorText,
    nonFieldError,
    nonFieldErrorText
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(withNavigation(LoginScreen));
