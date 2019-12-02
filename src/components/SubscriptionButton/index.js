import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../assets/fonts';

const SubscriptionButton = ({
  onPress,
  buttonStyle,
  imageBackground = { uri: 'http://www.planetgym.rs/assets/images/oglogo3.jpg'},
  imageBackgroundStyle,
  leftContainter,
  buttonLabel = 'Default Text',
  textStyle,
  textWrapper,
  colorsGradient = ['black', '#00000000'],
  gradientConainerStyle,
  rightContainer
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[defaultStyle.buttonStyle, buttonStyle]}
  >
    <ImageBackground
      source={imageBackground}
      style={[defaultStyle.imageBackground, imageBackgroundStyle]}
    >
      <View style={[defaultStyle.leftContainter, leftContainter]}>
        <View style={[defaultStyle.textWrapper, textWrapper]}>
          <Text style={[defaultStyle.textStyle, textStyle]}>
            {buttonLabel}
          </Text>
        </View>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colorsGradient}
        style={[defaultStyle.gradientConainerStyle, gradientConainerStyle]}
      />
      <View style={[defaultStyle.rightContainer, rightContainer]} />
    </ImageBackground>
  </TouchableOpacity>
);

const defaultStyle = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 162,
    flexDirection: 'row'
  },
  leftContainter: {
    width: '50%',
    backgroundColor: 'black',
    height: 162,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: Fonts.HELVETICA_BOLD
  },
  textWrapper: {
    width: '70%'
  },
  gradientConainerStyle: {
    width: '7%',
    height: 162
  },
  rightContainer: {
    width: '43%',
    backgroundColor: 'transparent',
    height: 162
  },
  buttonStyle: {
    marginBottom: 30
  }
});

export default SubscriptionButton;
