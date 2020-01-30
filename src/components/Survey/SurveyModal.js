import React, { useState, useEffect } from 'react';
import {
  Text, Modal, View, StyleSheet, Image, Animated, Easing
} from 'react-native';
import SurveyButton from './SurveyButton';
import SurveyRow from './SurveyRow';
import Logo from '../../assets/survey-modal-logo.png';
import Loader from '../../assets/survey-loader.png';
import DoneIcon from '../../assets/icon-survey-done.png';
import Fonts from '../../assets/fonts';


const SurveyModal = ({ contentType, visible, closeModal }) => {
  const [isExcercise, setIsExcercise] = useState(false);
  const [isNutrition, setIsNutrition] = useState(false);

  useEffect(() => {
    if (contentType === 'thirdModal') {
      showProgress();
    }
    return () => clearTimeout(showProgress);
  }, [contentType]);

  const showProgress = () => {
    setTimeout(() => {
      setIsExcercise(true);

      setTimeout(() => {
        setIsNutrition(true);
      }, 1500);
    }, 1500);
  };


  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.timing(
    spinValue,
    {
      toValue: 5,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true
    }
  ).start();

  // Second interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });


  let modalContent;
  switch (contentType) {
    case 'firstModal':
      modalContent = (
        <>
          <Text style={styles.title}>Welcome to Orum Training, UserName !</Text>
          <Text style={styles.subTitle}>
Next, we are going to ask you
                    questions regarding your exercise
                    goals then nutrition preferences
          </Text>
        </>
      );
      break;
    case 'secondModal':
      modalContent = (
        <>
          <Text style={styles.title}>Almost Done!</Text>
          <Text style={styles.subTitle}>Let’s talk about your food and nutrition preferences</Text>
        </>
      );
      break;

    case 'thirdModal':
      modalContent = (
        <>
          <Text style={styles.title}>Thanks UserName !</Text>
          <Text style={styles.subTitle}>
                      Our AI is customizing your exercise
                      and nutrition program
          </Text>


          <Text style={styles.title}>Almost Done!</Text>

          {isExcercise
            && (
            <SurveyRow style={styles.programItem}>
              <Text style={styles.subTitle}>Exercise program</Text>
              <Image
                style={styles.icon}
                source={DoneIcon}
                resizeMode="contain"
              />
            </SurveyRow>
            )
            }

          {isNutrition
            && (
            <SurveyRow style={styles.programItem}>
              <Text style={styles.subTitle}>Nutrition program</Text>
              <Image
                style={styles.icon}
                source={DoneIcon}
                resizeMode="contain"
              />
            </SurveyRow>
            )
            }

          <Animated.Image
            style={{ width: 50, height: 50, marginTop: 30, transform: [{ rotate: spin }] }}
            source={Loader}
            resizeMode="contain"
          />
        </>
      );
      break;

    default:
      break;
  }

  return (
    <Modal
      visible={visible}
      transparent
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <Image
            style={{ width: 150, height: 135, marginBottom: 25 }}
            source={Logo}
            resizeMode="contain"
          />
          {modalContent}
        </View>

        {contentType !== 'thirdModal'
          && (
          <SurveyButton
            onPress={closeModal}
          />
          )
          }
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  modalContent: {
    position: 'relative',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 23,
    fontFamily: Fonts.HELVETICA_BOLD,
    textAlign: 'center',
    marginBottom: 25,
    color: '#fff'
  },
  subTitle: {
    fontSize: 18,
    fontFamily: Fonts.HELVETICA_MEDIUM,
    textAlign: 'center',
    maxWidth: 280,
    color: '#fff'
  },
  icon: {
    width: 25,
    height: 25
  },
  programItem: {
    maxWidth: 195,
    width: '100%',
    marginBottom: 15
  }
});

export default SurveyModal;
