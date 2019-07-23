import { Platform } from 'react-native';

const headerForAndroid = {
  elevation: 0,
  shadowOpacity: 0
};

const headerForIOS = {
  backgroundColor: '#fff',
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
  shadowColor: 'transparent',
  shadowRadius: 0,
  shadowOffset: {
    height: 0,
  }
};

const regularHeaderStyle = Platform.OS !== 'ios' ? headerForAndroid : headerForIOS;

export default regularHeaderStyle;
