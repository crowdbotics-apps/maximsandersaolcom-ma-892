import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Routes from '../../Routes';
import Fonts from '../../assets/fonts';
import ModalButton from '../../components/ModalButton';
import i18n from '../../i18n/i18n';

const defaultImage = require('../../assets/logoSplashScreen.png');
const arrowBack = require('../../assets/arrow_back.png');

const renderModal = (
  {
    modalVisible,
    selectedObjectId,
    itemId
  },
  closeModal,
  swapExercisesAction
) => (
  <Modal
    isVisible={modalVisible}
    animationOutTiming={1}
    onBackdropPress={() => {
      closeModal();
    }}
  >
    <View style={styles.content}>
      <Text
        style={styles.titleSwipeModal}
      >
        {i18n.t('swipeScreen.modal.replaceTitle')}
      </Text>
      <ModalButton
        onPress={() => {
          closeModal();
          const restOfProgram = false;
          return swapExercisesAction(selectedObjectId, itemId, restOfProgram);
        }}
        label={i18n.t('swipeScreen.modal.buttons.thisDayOnly')}
        buttonStyle={styles.buttonStyleModal}
        labelStyle={styles.buttonModalLabelStyle}
      />
      <ModalButton
        onPress={() => {
          closeModal();
          const restOfProgram = true;
          return swapExercisesAction(selectedObjectId, itemId, restOfProgram);
        }}
        label={i18n.t('swipeScreen.modal.buttons.restOfProgram')}
        buttonStyle={styles.buttonStyleModal}
        labelStyle={styles.buttonModalLabelStyle}
      />
    </View>
  </Modal>
);

const SwapExerciseContainer = ({
  navigation: {
    getParam,
    navigate
  },
  selectedSwapObj,
  allExercises,
  swapExercisesAction,
  getAllExercisesAction,
  exerciseSwapped
}) => {
  const [selectedObjectState, setSelectedObjectState] = useState({
    modalVisible: false,
    selectedObjectId: '',
    itemId: ''
  });
  useEffect(() => {
    if (allExercises.results && !allExercises.results.length) {
      getAllExercisesAction();
    }
  }, [allExercises]);

  useEffect(() => {
    if (exerciseSwapped) {
      const prevScreen = getParam('prevScreen', false);
      if (prevScreen === Routes.TodayScreen) {
        navigate(Routes.TodayScreen);
        return;
      }
      navigate(Routes.ProgramScreen);
    }
  }, [exerciseSwapped]);

  const { exercise: { name = '' } } = selectedSwapObj;
  const exerciseName = name.charAt(0).toUpperCase() + name.slice(1);
  const { modalVisible } = selectedObjectState;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={styles.customHeaderWrapper}
      >
        <TouchableOpacity
          onPress={() => {
            const prevScreen = getParam('prevScreen', false);
            if (prevScreen === Routes.TodayScreen) {
              return navigate(Routes.TodayScreen);
            }
            return navigate(Routes.ExerciseScreen);
          }}
        >
          <Image
            source={arrowBack}
            style={{
              width: 25,
              height: 25
            }}
            resizeMode="center"
          />
        </TouchableOpacity>
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.exerciseTitle}
          >
            {`${exerciseName} Exercise Swap`}
          </Text>
          <Text style={styles.alternativeTitle}>{i18n.t('swipeScreen.alernativeText')}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <FlatList
            data={(allExercises && allExercises.results) || []}
            numColumns={1}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  const restOfProgram = getParam('restOfProgram', false);
                  const prevScreen = getParam('prevScreen', false);
                  if (prevScreen === Routes.TodayScreen) {
                    return swapExercisesAction(selectedSwapObj.id, item.id, restOfProgram);
                  }
                  return setSelectedObjectState({ modalVisible: true, selectedObjectId: selectedSwapObj.id, itemId: item.id });
                }}
                style={styles.itemTouchable}
              >
                <View
                  style={styles.itemWrapper}
                >
                  <View style={styles.imageItemWrapper}>
                    <Image
                      source={item.pictures[0] ? { uri: item.pictures[0].image_url } : defaultImage}
                      style={{ width: 100, height: 70 }}
                      resizeMode="center"
                    />
                  </View>
                  <View style={styles.textItemWrapper}>
                    <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      style={styles.textItem}
                    >
                      {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#3180BD', '#6EC2FA']}
                        style={styles.lineraGradientWrapper}
                      >
                        <Text style={styles.categoryText}>{item.exercise_type.name}</Text>
                      </LinearGradient>
                      <View style={styles.categoryWrapper}>
                        <Text style={styles.categoryText}>
                          Barbell
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        {
          modalVisible
            ? renderModal(selectedObjectState, () => setSelectedObjectState({ modalVisible: false }), swapExercisesAction)
            : null
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemTouchable: {
    width: '100%',
    borderBottomColor: 'rgb(158,158,158);',
    borderBottomWidth: 1
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  imageItemWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  textItemWrapper: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70
  },
  textItem: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: Fonts.HELVETICA_MEDIUM,
    marginTop: 15
  },
  lineraGradientWrapper: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 15
  },
  categoryWrapper: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'rgb(200,200,200);'
  },
  categoryText: {
    color: 'white',
    fontFamily: Fonts.HELVETICA_BOLD
  },
  customHeaderWrapper: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgb(55,55,55);',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exerciseTitle: {
    fontFamily: Fonts.HELVETICA_BOLD,
    fontSize: 14,
    color: 'white',
    textAlign: 'right'
  },
  alternativeTitle: {
    fontFamily: Fonts.HELVETICA_NORMAL,
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'right'
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  titleSwipeModal: {
    fontSize: 20,
    fontFamily: Fonts.HELVETICA_BOLD,
    color: 'rgb(0,84,248)',
    marginBottom: 5
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
  }
});

export default SwapExerciseContainer;
