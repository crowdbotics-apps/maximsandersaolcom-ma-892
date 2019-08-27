import React from 'react';
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height / 3;

const backArrowIcon = require('../../assets/arrow-back.png');

const ImageContainer = ({
  imageBackgroundUri,
  imageBackgroundStyleProp,
  leftIconFunc,
  rightIconFunc,
  leftIconStyleProp,
  rightIconStyleProp,
  leftIcon,
  rightIcon,
  iconContainerStyleProp,
  goBack,
  navigation: { goBack: goBackAction }
}) => (
  <ImageBackground
    source={{ uri: imageBackgroundUri }}
    style={[styles.imageBackgroundStyle, imageBackgroundStyleProp]}
  >
    <View>
      { goBack && (
        <TouchableOpacity onPress={() => goBackAction()}>
          <Image source={backArrowIcon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      )}
    </View>
    <View style={[styles.iconContainerStyle, iconContainerStyleProp]}>
      {
        leftIconFunc && (
          <TouchableOpacity onPress={() => leftIconFunc()}>
            <Image source={leftIcon} style={[{ width: 30, height: 30 }, leftIconStyleProp]} />
          </TouchableOpacity>
        )
      }
      {
        rightIconFunc && (
          <TouchableOpacity onPress={() => rightIconFunc()}>
            <Image source={rightIcon} style={[{ width: 30, height: 30 }, rightIconStyleProp]} />
          </TouchableOpacity>
        )
      }
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  iconContainerStyle: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between'
  }
});

export default ImageContainer;
