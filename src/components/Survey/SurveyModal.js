import React from 'react';
import {
  Text, Modal, View, StyleSheet, Image
} from 'react-native';
import SurveyButton from './SurveyButton';
import SurveyRow from './SurveyRow';
import Logo from '../../assets/survey-modal-logo.png';
import DoneIcon from '../../assets/icon-survey-done.png';
import Fonts from "../../assets/fonts";


const SurveyModal = (props) => {

  let modalContent;
  switch (props.contentType) {
    case 'firstModal':
      modalContent = (
        <>
          <Text style={styles.title}>Welcome to Orum Training, UserName !</Text>
          <Text style={styles.subTitle}>
Next, we are going to ask you
                    questions regarding your exercise
                    goals then nutrition preferences
          </Text>
          <SurveyButton
            onPress={props.closeModal}
          />
        </>
      );
      break;
    case 'secondModal':
      modalContent = (
        <>
          <Text style={styles.title}>Almost Done!</Text>
          <Text style={styles.subTitle}>Our AI is customizing your exercise</Text>
          <Text style={styles.subTitle}>and nutrition program</Text>
            <SurveyButton
                onPress={props.closeModal}
            />
        </>
      );
      break;

    default: modalContent = (
      <>
        <Text style={styles.title}>Thanks UserName !</Text>
        <Text style={styles.subTitle}>
Our AI is customizing your exercise
              and nutrition program
        </Text>



          <Text style={styles.title}>Almost Done!</Text>
        <SurveyRow style={styles.programItem}>
          <Text style={styles.subTitle}>Exercise program</Text>
          <Image
            style={styles.icon}
            source={DoneIcon}
            resizeMode="contain"
          />
        </SurveyRow>
        <SurveyRow style={styles.programItem}>
          <Text style={styles.subTitle}>Nutrition program</Text>
          <Image
              style={styles.icon}
            source={DoneIcon}
            resizeMode="contain"
          />
        </SurveyRow>

          <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: 'http://www.clicktorelease.com/code/gif/1.gif' }}
              resizeMode="contain"
          />
      </>
    );
      break;
  }

  return (
    <Modal
      visible={props.visible}
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
    flex: 1,
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
