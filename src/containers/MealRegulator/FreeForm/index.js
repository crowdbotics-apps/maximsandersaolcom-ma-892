import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Routes from '../../../Routes';
import GradientButton from '../../../components/GradientButton';
import Fonts from '../../../assets/fonts';
import i18n from '../../../i18n/i18n';

const imageMicrophone = require('../../../assets/voice_microphone.png');

const FreeFormContainer = ({
  navigation
}) => {
  const [freeFormText, setFreeFormText] = useState('');
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          numberOfLines={4}
          style={{ height: 100, paddingLeft: 5 }}
          onChangeText={text => setFreeFormText(text)}
          value={freeFormText}
        />
      </View>
      <View style={{ width: '100%' }}>
        <TouchableOpacity style={styles.microphoneButton}>
          <View>
            <Image style={styles.micImg} source={imageMicrophone} />
          </View>
          <View>
            <Text style={{ textAlignVertical: 'center' }}>Start</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', paddingTop: 10 }}>
        <GradientButton
          buttonContainerText="Review Foods"
          buttonContainerStyleProp={styles.findRecipesButtonContainer}
          buttonContainerTextStyle={styles.buttonContainerTextStyle}
          colorsGradient={['#3180BD', '#6EC2FA']}
          onPress={() => {
            navigation.navigate(Routes.LogFoodsScreen);
          }}
        />
      </View>
      <View style={{ width: '100%', paddingHorizontal: 15, }}>
        <View style={{ paddingTop: 15, paddingBottom: 10 }}>
          <Text style={styles.fatFont}>{i18n.t('freeForm.title')}</Text>
        </View>
        <View>
          <Text style={styles.normalFont}>{i18n.t('freeForm.descriptionPart1')}</Text>
        </View>
        <View style={{ paddingTop: 15, paddingBottom: 15 }}>
          <Text style={styles.normalFont}>{i18n.t('freeForm.descriptionPart2')}</Text>
        </View>
        <View>
          <Text style={styles.normalFont}>{i18n.t('freeForm.descriptionPart3')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  micImg: {
    width: 25,
    height: 25
  },
  normalFont: {
    color: 'black',
    fontSize: 14,
    fontFamily: Fonts.HELVETICA_MEDIUM
  },
  fatFont: {
    color: 'black',
    fontSize: 15,
    fontFamily: Fonts.HELVETICA_BOLD
  },
  inputContainer: {
    width: '100%',
    borderColor: 'rgb(234,234,234);',
    borderWidth: 1
  },
  mainContainer: {
    flex: 1,
    margin: 10,
    marginTop: 15
  },
  microphoneButton: {
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5
  },
  findRecipesButtonContainer: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    paddingBottom: 13,
    borderRadius: 10,
    marginRight: 0,
    marginBottom: 0
  },
  buttonContainerTextStyle: {
    fontSize: 21,
    fontWeight: 'normal',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});

export default withNavigation(FreeFormContainer);
