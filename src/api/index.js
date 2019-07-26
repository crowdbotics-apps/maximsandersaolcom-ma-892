import { AsyncStorage } from 'react-native';

/* Packages */
import axios from 'axios';
import i18n from 'i18n-js';

// import { reduxStore } from '../Root';

class Api {
    token = null;

    refreshToken = null;

    fetch(method, url, options) {
      const data = options || {};

      data.url = url;
      data.method = method;
      data.baseURL = 'http://maximfitness-admin-p-6116.botics.co/api/v1';
      data.headers = data.headers || {};

      if (this.token !== null) {
        data.headers.Authorization = this.token;
      }
      return axios(data)
        .then((response) => {
          if (__DEV__ && console && typeof console.groupCollapsed === 'function' && !url.includes('/!url')) { // eslint-disable-line
            console.groupCollapsed(`%c API --> ${url}`, 'color: green');
            console.log('data: ', data);
            console.log('response: ', response);
            console.groupEnd();
          }
          if (response.status < 400) {
            return {
              status: response.status,
              data: response.data,
              headers: response.headers
            };
          }
          return response.data;
        })
        .catch((response) => {
          if (__DEV__ && console && typeof console.groupCollapsed === 'function' && !url.includes('/!url')) { // eslint-disable-line
            console.groupCollapsed(`%c API --> ${url}`, 'color: red');
            console.log('data: ', data);
            console.log('response: ', response.message, response.data);
            console.groupEnd();
          }
          if (response.message === 'Network Error') {
            throw new Error({
              status: null,
              data: {
                code: 'network_error',
                message: response.message
              }
            });
          }

          if (typeof response.data === 'undefined') {
            if (response.response.status === 401) {
              return this._refreshToken(this.refreshToken, { method, url, options });
            }

            throw {
              status: response.response.status,
              data: response.response.data,
              headers: response.response.headers
            };
          } else {
            throw {
              status: null,
              data: {
                code: 'internal_error',
                message: i18n.t('api.error.somethingWentWrong')
              }
            };
          }
        });
    }

    addToken(token, refreshToken) {
      this.token = `Token ${token}`;
      this.refreshToken = refreshToken;
    }

    removeToken() {
      this.token = null;
    }

    _refreshToken(refreshToken, { method, url, options }) {
      const data = {
        grant_type: 'refresh_token',
        audience: Config.OAUTH_AUDIENCE,
        scope: 'offline_access',
        client_id: Config.OAUTH_CLIENT_ID,
        refresh_token: refreshToken
      };

      return this.fetch('POST', `${Config.OAUTH_DOMAIN}/oauth/token`, { data })
        .then((response) => {
          const auth = {
            token: response.data.access_token,
            refreshToken,
            tokenType: response.data.token_type,
            scopeList: response.data.scope.split(' ')
          };

          this.addToken(`${auth.tokenType} ${auth.token}`, auth.refreshToken);

          AsyncStorage.setItem('auth', JSON.stringify(data));

          //reduxStore.dispatch({ type: 'AUTH_REFRESH', payload: auth });

          return this.fetch(method, url, options);
        });
      // .catch({}) //@todo Missing CATCH?!
    }
}

let instance = null;
Api.getInstance = () => {
  if (instance === null) {
    instance = new Api();
  }
  return instance;
};

export default Api;
