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
import CheckBox from 'react-native-check-box';
import i18n from '../../i18n/i18n';
import Routes from '../../Routes';
import Input from '../../components/Input';
import {
  loginActionViaFacebook,
  loginActionViaGmail,
  register,
  resetErrors,
} from '../../redux/modules/authReducer';

const mainActions = {
  loginActionViaFacebookAction: loginActionViaFacebook,
  loginActionViaGmailAction: loginActionViaGmail,
  registerAction: register,
  resetErrorsAction: resetErrors
};

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

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      termsAndConditions: false,
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
    const { termsAndConditions } = this.state;
    const { loginActionViaFacebookAction, navigation } = this.props;
    if (!termsAndConditions) return;
    try {
      const result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
      if (result.isCancelled) {
        console.log('Login cancelled');
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
    const { termsAndConditions } = this.state;
    if (!termsAndConditions) return;
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

  render() {
    const {
      email,
      password,
      termsAndConditions
    } = this.state;
    const {
      registerAction,
      emailErrorText,
      passwordErrorText,
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
                      {i18n.t('registerScreen.facebookButton')}
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
                      {i18n.t('registerScreen.googleButton')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.loginContainer}>
              <View style={styles.orContainer}>
                <View style={styles.containerCenter}>
                  <Text style={styles.orText}>{i18n.t('registerScreen.or')}</Text>
                </View>
                <View style={[styles.containerCenter, styles.paddingHor]}>
                  <View style={{ width: '100%' }}>
                    <Input
                      inputStyle={styles.input}
                      keyboardType="email-address"
                      onChangeText={value => this.handleInputChange('email', value)}
                      value={email}
                      error={emailErrorText}
                      placeholder={i18n.t('registerScreen.emailPlaceholder')}
                    />
                  </View>
                  <View style={{ width: '100%' }}>
                    <Input
                      inputStyle={styles.input}
                      secureTextEntry
                      onChangeText={value => this.handleInputChange('password', value)}
                      value={password}
                      error={passwordErrorText}
                      placeholder={i18n.t('registerScreen.passwordPlaceholder')}
                    />
                  </View>
                  <CheckBox
                    style={{ width: '100%', height: 50, marginTop: 25 }}
                    onClick={() => {
                      this.setState(prevState => ({
                        termsAndConditions: !prevState.termsAndConditions
                      }));
                    }}
                    isChecked={termsAndConditions}
                    rightText={i18n.t('registerScreen.termsAndCond')}
                  />
                </View>
              </View>
              <View style={styles.containerCenter}>
                <TouchableOpacity
                  onPress={() => {
                    if (!termsAndConditions) return;
                    registerAction(email, password);
                  }}
                  style={styles.letsStartButton}
                >
                  <Text style={{ fontSize: 15 }}>
                    {i18n.t('registerScreen.registerButton')}
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
  ({ auth: { authenticated, emailErrorText, passwordErrorText } }) => ({
    authenticated,
    emailErrorText,
    passwordErrorText
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(withNavigation(RegisterScreen));
