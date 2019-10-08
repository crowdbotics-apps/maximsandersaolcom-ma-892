import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import i18n from '../../i18n/i18n';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import TodayContainerHorizontal from './TodayContainerHorizontal';
import TodayInfo from '../../components/TodayInfo';
import GradientButton from '../../components/GradientButton';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
// import MealItem from '../../components/MealItem';
import MealItemNew from '../../components/MealItemNew';
import { getNumberOfDayByString } from '../../utils/common';
import Routes from '../../Routes';
import ModalButton from '../../components/ModalButton';
import Fonts from '../../assets/fonts';

const dateTime = new Date();
const formatedDate = moment(dateTime).format('YYYY-MM-DD');
const todayDayString = moment(dateTime).format('dddd');
const { numberOfDayForBackend, numberOfDayForFrontend } = getNumberOfDayByString(todayDayString);


const emptyList = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={styles.emptyListLabel}>
      {`${i18n.t('nutritionContainer.emptyMeals')} ${moment().format('MMM DD')}`}
    </Text>
  </View>
);

const renderItem = ({
  date_time: clock,
  food_items: mealItems,
  carbohydrate: numberOfCarbs,
  protein: numberOfProtein,
  fat: numberOfFat,
  pieArray,
}, index, navigation) => (
  <MealItemNew
    clock={clock}
    mealItems={mealItems}
    numberOfProtein={numberOfProtein}
    numberOfCarbs={numberOfCarbs}
    numberOfFat={numberOfFat}
    pieArray={pieArray}
    titleContainerStyle={{
      paddingTop: 0
    }}
    index={index}
    navigation={navigation}
  />
);

const renderModalContent = showSwipeModal => (
  <View style={styles.content}>
    <ModalButton
      onPress={() => {
        console.log('show details');
      }}
      label={i18n.t('todayScreen.modal.buttons.details')}
      buttonStyle={styles.buttonStyleModal}
      labelStyle={styles.buttonModalLabelStyle}
    />
    <ModalButton
      onPress={() => {
        showSwipeModal();
      }}
      label={i18n.t('todayScreen.modal.buttons.swapExercise')}
      buttonStyle={styles.buttonStyleModal}
      labelStyle={styles.buttonModalLabelStyle}
    />
  </View>
);

const renderModalContentSwipe = (navigate, closeModal) => (
  <View style={styles.content}>
    <Text
      style={styles.titleSwipeModal}
    >
      {i18n.t('todayScreen.modal.replaceTitle')}
    </Text>
    <ModalButton
      onPress={() => {
        closeModal();
        navigate(Routes.SwapExerciseScreen, { prevScreen: Routes.TodayScreen });
      }}
      label={i18n.t('todayScreen.modal.buttons.thisDayOnly')}
      buttonStyle={styles.buttonStyleModal}
      labelStyle={styles.buttonModalLabelStyle}
    />
    <ModalButton
      onPress={() => {
        console.log('replace rest of program');
      }}
      label={i18n.t('todayScreen.modal.buttons.restOfProgram')}
      buttonStyle={styles.buttonStyleModal}
      labelStyle={styles.buttonModalLabelStyle}
    />
  </View>
);

const renderModal = (
  isVisible,
  closeModal,
  showSwipeModal,
  isSwipeModalVisible,
  navigate
) => (
  <Modal
    isVisible={isVisible}
    animationOutTiming={1}
    onBackdropPress={() => {
      closeModal();
    }}
  >
    {
      !isSwipeModalVisible ? renderModalContent(showSwipeModal) : renderModalContentSwipe(navigate, closeModal)
    }
  </Modal>
);

const IngredientRecipeContainer = ({
  navigation,
  getMealsByDateAction,
  meals = [],
  getSessionByDayAction,
  todaySession,
  pickSessionAction,
  numberOfWeek,
  exerciseSwapped,
  selectSwapObjectAction,
  navigation: {
    navigate
  }
}) => {
  const [selectedObject, setSelectedObject] = useState({
    isModalVisble: false,
    isSwipeModalVisible: false
  });
  useEffect(() => {
    getSessionByDayAction(numberOfDayForBackend);
  }, [exerciseSwapped]);

  const { isModalVisble, isSwipeModalVisible } = selectedObject;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', flex: 1 }}>
        <HeaderForDrawer hideHamburger />
        <TodayInfo
          description={todaySession.name || ''}
          dayNumber={numberOfDayForFrontend}
          weekNumber={numberOfWeek}
        />
        <TodayContainerHorizontal
          sliderTitle={todaySession.name || ''}
          navigation={navigation}
          data={todaySession.workouts}
          routeName={Routes.ExerciseScreen}
          onSelectItem={(item) => {
            selectSwapObjectAction(item);
            setSelectedObject({
              isModalVisble: true
            });
          }}
        />
        <View
          style={styles.buttonContainer}
        >
          <GradientButton
            buttonContainerText="Start Workout"
            buttonContainerStyleProp={styles.findRecipesButtonContainer}
            buttonContainerTextStyle={styles.buttonContainerTextStyle}
            colorsGradient={['#3180BD', '#6EC2FA']}
            onPress={() => {
              if (typeof todaySession.workouts !== 'undefined') {
                const [firstUnDone, nextWorkout] = todaySession.workouts.filter(item => !item.done);
                if (typeof firstUnDone !== 'undefined') {
                  pickSessionAction(firstUnDone, todaySession.workouts, nextWorkout);
                  return navigation.navigate(Routes.ExerciseScreen);
                }
                pickSessionAction(todaySession.workouts[todaySession.workouts.length - 1], todaySession.workouts, nextWorkout);
                return navigation.navigate(Routes.ExerciseScreen);
              }
              return null;
            }}
          />
        </View>
        <View style={styles.lastContainer}>
          <SearchablePaginatedList
            style={{ flex: 1 }}
            ListEmptyComponent={emptyList}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10, paddingVertical: 0 }}
            list={meals}
            fetchListAction={() => getMealsByDateAction(formatedDate)}
            renderItem={({ item, index }) => renderItem(item, index, navigation)}
            search=""
            filter=""
          />
        </View>
      </View>
      {
        renderModal(
          isModalVisble,
          () => setSelectedObject(prevState => ({
            ...prevState,
            isModalVisble: !prevState.isModalVisble,
            isSwipeModalVisible: false
          })),
          () => setSelectedObject(prevState => ({
            ...prevState,
            isSwipeModalVisible: !prevState.isSwipeModalVisible
          })),
          isSwipeModalVisible,
          navigate
        )
      }
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
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 0,
    paddingBottom: 18,
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
  lastContainer: {
    borderTopColor: 'gray',
    flex: 1,
    width: '100%'
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

export default IngredientRecipeContainer;
