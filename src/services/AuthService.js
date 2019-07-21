import Api from '../api';

export default class AuthService {
    api = Api.getInstance();

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
}
