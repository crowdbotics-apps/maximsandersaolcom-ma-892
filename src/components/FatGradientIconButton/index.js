import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const iconPlaceholder = require('../../assets/icon_program_done.png');

const FatGradientIconButton = ({
  buttonIcon,
  buttonText,
  onClick,
  colorsGradient,
  buttonContainerStyleProp
}) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={colorsGradient}
    style={[styles.buttonContainer, buttonContainerStyleProp]}
  >
    <TouchableOpacity style={styles.buttonContainer} onPress={() => onClick()}>
      <View style={styles.iconContainer}>
        <Image source={buttonIcon || iconPlaceholder} style={styles.iconStyle} />
      </View>
      <View style={styles.buttonText}>
        <Text style={styles.buttonLabelStyle}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  </LinearGradient>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: { width: 40, height: 40 },
  buttonText: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  styleButtonText: {
    fontSize: 26,
    color: 'white',
    fontWeight: '800'
  },
  buttonLabelStyle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  }
});

export default FatGradientIconButton;
