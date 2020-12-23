import Api from '../api';
import AsyncStorage from "@react-native-community/async-storage";


const saveDataToStorage = token => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
    }))
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

      console.log("token - - - > ", token);
      return this.api.fetch('POST', '/login/facebook/', { data: { access_token: token } })
        .then((response) => {
          console.log("Login API response is here - - > ", response)
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
