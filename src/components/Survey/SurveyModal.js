import React, { useState, useEffect } from 'react';
import {
  Text, Modal, View, StyleSheet, Image, Animated, Easing
} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import { withNavigation } from 'react-navigation';
import SurveyButton from './SurveyButton';
import SurveyRow from './SurveyRow';
import Logo from '../../assets/survey-modal-logo.png';
import Loader from '../../assets/survey-loader.png';
import DoneIcon from '../../assets/icon-survey-done.png';
import Fonts from '../../assets/fonts';
import Routes from "../../Routes";
import * as profileActions from '../../redux/actions/profile'
import { useDispatch } from "react-redux";
import { sendSurveyData } from "../../redux/actions/profile";


const saveSurveyPassedToStorage = bool => {
    AsyncStorage.setItem('isSurvey', JSON.stringify({
        isPassed: bool,
    }))
};

const SurveyModal = ({
  contentType, visible, closeModal, userName, navigation, answers
}) => {

  const dispatch = useDispatch();
  const [isExcercise, setIsExcercise] = useState(false);
  const [isNutrition, setIsNutrition] = useState(false);

  useEffect(() => {
    if (contentType === 'thirdModal') {
      showProgress();
    }
    return () => clearTimeout(showProgress);
  }, [contentType]);


  const sendAnswers = async (answersObj) => {
      try {
        await dispatch(profileActions.sendSurveyData(answersObj))
      }catch(err) {console.log(err)}
  };

  const showProgress = () => {
    setTimeout(() => {
      setIsExcercise(true);

      setTimeout(() => {
        setIsNutrition(true);

          setTimeout(() => {
              closeModal();
              saveSurveyPassedToStorage(true);
              navigation.navigate(Routes.SubscriptionScreen);
          }, 1500);

      }, 1500);

      sendAnswers(answers);

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
          <Text style={styles.title}>
Welcome to Orum Training, {userName}!
          </Text>
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
          <Text style={styles.title}>
            Thanks {userName}!
          </Text>
          <Text style={[styles.subTitle, {marginBottom: 25}]}>
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
            style={{
              width: 50, height: 50, marginTop: 30, transform: [{ rotate: spin }]
            }}
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

export default withNavigation(SurveyModal);
