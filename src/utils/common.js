import { Dimensions, Platform } from 'react-native';

export function isIphoneX() {
  const { width, height } = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((height === 812 || width === 812) || (height === 896 || width === 896))
  );
}

export function getNumberOfDayByString(dateString) {
  switch (dateString) {
    case 'Monday': {
      return {
        numberOfDayForBackend: 2,
        numberOfDayForFrontend: 1,
      };
    }
    case 'Tuesday': {
      return {
        numberOfDayForBackend: 3,
        numberOfDayForFrontend: 2,
      };
    }
    case 'Wednesday': {
      return {
        numberOfDayForBackend: 4,
        numberOfDayForFrontend: 3,
      };
    }
    case 'Thursday': {
      return {
        numberOfDayForBackend: 5,
        numberOfDayForFrontend: 4,
      };
    }
    case 'Friday': {
      return {
        numberOfDayForBackend: 6,
        numberOfDayForFrontend: 5,
      };
    }
    case 'Saturday': {
      return {
        numberOfDayForBackend: 7,
        numberOfDayForFrontend: 6,
      };
    }
    case 'Sunday': {
      return {
        numberOfDayForBackend: 1,
        numberOfDayForFrontend: 7,
      };
    }
    default: return 0;
  }
}

export function sortSessionBySets(arraySession) {
  const newSessionsSorted = arraySession.map((item) => {
    const workouts = item.workouts.map((itemWorkout) => {
      const sortedSets = itemWorkout.sets.sort((a, b) => a.set_no - b.set_no);
      return {
        ...itemWorkout,
        sets: sortedSets,
      };
    }).sort((a, b) => a.order - b.order); // eslint-disable-line;
    return {
      ...item,
      workouts
    };
  });
  return newSessionsSorted;
}
