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
      return 2;
    }
    case 'Tuesday': {
      return 3;
    }
    case 'Wednesday': {
      return 4;
    }
    case 'Thursday': {
      return 5;
    }
    case 'Friday': {
      return 6;
    }
    case 'Saturday': {
      return 7;
    }
    case 'Sunday': {
      return 1;
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
    });
    return {
      ...item,
      workouts
    };
  });
  return newSessionsSorted;
}
