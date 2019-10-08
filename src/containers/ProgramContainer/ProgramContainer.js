import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import GradientButton from '../../components/GradientButton';
import ProgramTabHeader from '../../components/ProgramTabHeader';
import CustomProgramTabs from './CustomProgramTabs';
import i18n from '../../i18n/i18n';
import Routes from '../../Routes';

const ProgramContainer = ({
  navigation,
  navigation: {
    toggleDrawer
  },
  allSessions,
  getAllSessionsAction,
  pickSessionAction,
  exerciseSwapped
}) => {
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
                    isDone={!itemWorkoutUndone}
                    buttonContainerText={i18n.t('programScreen.startWorkoutButton')}
                    buttonContainerStyleProp={styles.findRecipesButtonContainer}
                    buttonContainerTextStyle={styles.buttonContainerTextStyle}
                    buttonContentContainerProp={{ paddingBottom: 0 }}
                    colorsGradient={['#3180BD', '#6EC2FA']}
                    colorsGradientDisable={['#d3d3d3', '#838383']}
                    onPress={() => {
                      if (itemWorkoutUndone) {
                        pickSessionAction(itemWorkoutUndone, item.workouts, nextWorkout);
                        navigation.navigate(Routes.ExerciseScreen);
                      }
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
});

export default ProgramContainer;
