import Api from '../api';


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
      return this.api.fetch('POST', '/login/facebook/', { data: { access_token: token } })
        .then((response) => {
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
        .then(res => console.log(res))
        .catch((err) => { throw err; });
    }
}
