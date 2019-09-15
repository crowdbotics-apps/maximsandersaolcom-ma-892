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
