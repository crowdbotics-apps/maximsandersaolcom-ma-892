import Api from '../api';

export default class SessionService {
  api = Api.getInstance();

  getSessionByDay(day) {
    return this.api.fetch('GET', `/session/get_by_day/?day=${day}`, { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }
}
