import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Modal from 'react-native-modal';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import GradientButton from '../../components/GradientButton';
import ProgramTabHeader from '../../components/ProgramTabHeader';
import CustomProgramTabs from './CustomProgramTabs';
import i18n from '../../i18n/i18n';
import Routes from '../../Routes';
import ModalButton from '../../components/ModalButton';
import Fonts from '../../assets/fonts';


const renderModal = (isVisible, closeModal, navigate) => (
  <Modal
    isVisible={isVisible}
    animationOutTiming={1}
    onBackdropPress={() => {
      closeModal();
    }}
  >
    <View style={styles.modalContent}>
      <Text
        style={styles.titleModal}
      >
        {i18n.t('programScreen.finishModal.title')}
      </Text>
      <ModalButton
        onPress={() => {
          closeModal();
          navigate(Routes.WorkoutSummaryScreen);
        }}
        label={i18n.t('programScreen.finishModal.buttons.yes')}
        buttonStyle={styles.buttonStyleModal}
        labelStyle={styles.buttonModalLabelStyle}
      />
      <ModalButton
        onPress={() => {
          closeModal();
        }}
        label={i18n.t('programScreen.finishModal.buttons.no')}
        buttonStyle={styles.buttonStyleModal}
        labelStyle={styles.buttonModalLabelStyle}
      />
    </View>
  </Modal>
);


const ProgramContainer = ({
  navigation,
  navigation: {
    toggleDrawer,
    navigate
  },
  allSessions,
  getAllSessionsAction,
  pickSessionAction,
  exerciseSwapped
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getAllSessionsAction();
  }, [exerciseSwapped]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderForDrawer
        navigation={navigation}
        headerNavProp={{ paddingBottom: 50 }}
        onDrawerButtonPress={() => {
          toggleDrawer();
        }}
      />
      <ScrollableTabView
        style={{ backgroundColor: 'white', flex: 1 }}
        renderTabBar={props => <ProgramTabHeader {...props} allSessions={allSessions} />}
      >
        {
          allSessions && allSessions.map((item, index) => {
            const [itemWorkoutUndone, nextWorkout] = item.workouts
              .filter(workoutItem => !workoutItem.done);
            return (
              <View tabLabel={item} style={{ flex: 1 }}>
                <View
                  style={styles.buttonContainer}
                >
                  <GradientButton
                    // isDone={!itemWorkoutUndone}
                    buttonContainerText={itemWorkoutUndone ? i18n.t('programScreen.startWorkoutButton') : i18n.t('programScreen.finishWorkoutButton')}
                    buttonContainerStyleProp={styles.findRecipesButtonContainer}
                    buttonContainerTextStyle={styles.buttonContainerTextStyle}
                    buttonContentContainerProp={{ paddingBottom: 0 }}
                    colorsGradient={['#3180BD', '#6EC2FA']}
                    colorsGradientDisable={['#d3d3d3', '#838383']}
                    onPress={() => {
                      if (itemWorkoutUndone) {
                        pickSessionAction(itemWorkoutUndone, item.workouts, nextWorkout);
                        return navigate(Routes.ExerciseScreen);
                      }
                      return setModalVisible(true);
                    }}
                  />
                </View>
                <View
                  tabLabel={index}
                  style={{ flex: 1 }}
                >
                  <CustomProgramTabs
                    navigation={navigation}
                    overviewData={item.workouts}
                    pickSession={pickSessionAction}
                  />
                  {
                    modalVisible
                      ? renderModal(modalVisible, () => setModalVisible(false), navigate)
                      : null
                  }
                </View>
              </View>
            );
          })
        }
      </ScrollableTabView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white'
  },
  findRecipesButtonContainer: {
    width: '90%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 0,
    paddingBottom: 15,
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonStyleModal: {
    width: '80%',
    height: 60,
    borderColor: 'rgb(230,230,230)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 15
  },
  buttonModalLabelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HELVETICA_MEDIUM
  },
  titleModal: {
    fontSize: 20,
    fontFamily: Fonts.HELVETICA_BOLD,
    color: 'rgb(0,84,248)',
    marginBottom: 5
  },
});

export default ProgramContainer;
