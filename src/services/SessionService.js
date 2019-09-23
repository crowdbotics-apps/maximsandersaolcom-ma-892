import Api from '../api';

export default class SessionService {
  api = Api.getInstance();

  getAllSessions() {
    return this.api.fetch('GET', '/session/', {})
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  getSessionByDay(day) {
    return this.api.fetch('GET', `/session/get_by_day/?day=${day}`, { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  getAllExercises() {
    return this.api.fetch('GET', '/exercise/', {})
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  markSetAsDone(setId) {
    return this.api.fetch('POST', '/session/mark_set_done/', { data: { id: setId } })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  swapExercises(workoutId, exerciseId) {
    return this.api.fetch('POST', '/session/swap_exercise/', { data: { workout_id: workoutId, exercise_id: exerciseId }})
      .then(response => ({
        data: response.data,
        status: response.status
      }))
      .catch((err) => { throw err; });
  }
}
