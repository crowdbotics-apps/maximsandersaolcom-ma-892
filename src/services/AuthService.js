import AsyncStorage from '@react-native-community/async-storage';
import Api from '../api';


const saveDataToStorage = (token) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
  }));
};

export default class AuthService {
    api = Api.getInstance();

    loginOrRegisterViaSocialGoogle(token) {
      return this.api.fetch('POST', '/login/google/', { data: { access_token: token } })
        .then((response) => {
          const { data: { key } } = response;
          this.api.addToken(key, '');
          return response.data;
        })
        .catch((err) => { throw err; });
    }

    loginOrRegisterViaSocialFacebook(token) {
      console.log('token - - - > ', token);
      return this.api.fetch('POST', '/oauth/facebook/signin/', { data: { access_token: token, timezone: 'UTC', ref: 'fb' } })
        .then((response) => {
          console.log('Login API response is here - - > facebook ', response);
          const { data: { key } } = response;
          this.api.addToken(key, '');
          return response.data;
        })
        .catch((err) => { throw err; });
    }

    login(data) {
      return this.api.fetch('POST', '/login/', { data })
        .then((response) => {
          const { data: { token } } = response;
          saveDataToStorage(token);
          this.api.addToken(token, '');
          return response.data;
        })
        .catch((err) => { throw err; });
    }

    register(data) {
      return this.api.fetch('POST', '/signup/', { data })
        .then(res => res)
        .catch((err) => { throw err; });
    }

    getProfile() {
      return this.api.fetch('GET', '/profile/')
        .then(res => res)
        .catch((err) => { throw err; });
    }
}
