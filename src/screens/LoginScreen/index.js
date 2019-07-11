import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

const LoginScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Login Screen</Text>
    <LoginButton
      onLoginFinished={
        (error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                console.log(data.accessToken.toString())
              }
            )
          }
        }
      }
      onLogoutFinished={() => console.log("logout.")}/>
  </View>
);

export default LoginScreen;