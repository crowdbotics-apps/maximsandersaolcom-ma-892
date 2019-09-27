const initialSession = {
  todaySession: {},
  exercisesObj: {
    sets: []
  },
  selectedSession: {},
  allSessions: [],
  allExercises: {
    results: []
  },
  startCount: false,
  activeSet: {},
  nextWorkout: null,
  exerciseSwapped: false,
  exerciseSwapError: false,
  numberOfWeek: 0
};

export default initialSession;
