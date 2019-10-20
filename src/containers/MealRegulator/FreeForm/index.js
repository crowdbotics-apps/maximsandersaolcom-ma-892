import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Voice from 'react-native-voice';
import Routes from '../../../Routes';
import GradientButton from '../../../components/GradientButton';
import Fonts from '../../../assets/fonts';
import i18n from '../../../i18n/i18n';

const imageMicrophone = require('../../../assets/voice_microphone.png');

const FreeFormContainer = ({
  navigation
}) => {
  const [freeFormText, setFreeFormText] = useState('');
  const [voiceStart, setVoiceStart] = useState(false);
  const onSpeechStart = e => {
    // eslint-disable-next-line
    setVoiceStart(true);
    console.log('onSpeechStart: ', e);
  };

  const onSpeechRecognized = (e) => {
    // eslint-disable-next-line
    console.log('onSpeechRecognized: ', e);
    const { isFinale } = e;
    if (isFinale) {
      setVoiceStart(!isFinale);
    }
  };

  const onSpeechEnd = e => {
    // eslint-disable-next-line
    console.log('onSpeechEnd: ', e);
  };

  const onSpeechError = (e) => {
    // eslint-disable-next-line
    console.log('onSpeechError: ', e);
    console.log('eer meesage', JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechResults: ', e, e.value);
    const [first] = e.value;
    setFreeFormText(first)
  };

  const onSpeechPartialResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechPartialResults: ', e, e.value);
  };

  const onSpeechVolumeChanged = e => {
    // eslint-disable-next-line
    console.log('onSpeechVolumeChanged: ', e, e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setVoiceStart(true);
      console.log('start');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      console.log('stop');
      setVoiceStart(false)
    } catch (e) {
      console.error(e);
    }
  };
  Voice.onSpeechStart = onSpeechStart;
  Voice.onSpeechRecognized = onSpeechRecognized;
  Voice.onSpeechEnd = onSpeechEnd;
  Voice.onSpeechError = onSpeechError;
  Voice.onSpeechResults = onSpeechResults;
  Voice.onSpeechPartialResults = onSpeechPartialResults;
  Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
  // eslint-disable-next-line arrow-body-style
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
        <TouchableOpacity
          style={styles.microphoneButton}
          onPress={() => {
            if (!voiceStart) {
              return startRecognizing();
            }
            return stopRecognizing();
          }}
        >
          <View>
            <Image style={styles.micImg} source={imageMicrophone} />
          </View>
          <View>
            <Text style={{ textAlignVertical: 'center' }}>{!voiceStart ? "Start" : "Finish"}</Text>
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
            const prevScreen = navigation.getParam('prevScreen', false);
            if (prevScreen === Routes.MealRegulatorNutritionScreen) {
              return navigation.navigate(Routes.LogFoodsNutritionScreen);
            }
            return navigation.navigate(Routes.LogFoodsScreen);
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
