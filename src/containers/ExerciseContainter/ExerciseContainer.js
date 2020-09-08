import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet, Text} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import ExerciseTabHeader from '../../components/ExerciseTabHeader';
import SetButton from '../../components/SetButton';
import VideoExercise from '../../components/VideoExercise';
import FatExerciseButton from '../../components/FatExerciseButton';
import FatExerciseIconButton from '../../components/FatExerciseIconButton';
import FatGradientIconButton from '../../components/FatGradientIconButton';
import RestContainer from '../../components/RestContainer';
import StatusBar from '../../components/StatusBar';
import Routes from '../../Routes';

const iconDetails = require('../../assets/icon_details_ex.png');
const iconSwap = require('../../assets/icon_swap.png');
const iconDoneStartRest = require('../../assets/icon_done_start_rest.png');

const ExerciseContainer = ({
  navigation,
  navigation: {toggleDrawer},
  exercisesObj,
  selectedSession,
  findAndMarkAsDoneSetAction,
  pickSessionAction,
  nextWorkout,
}) => {
  const [activeSet, setActiveSet] = useState({});
  const [isClickedOnActive, setIsClickedOnActive] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const [firstDoneTimer, setFirstDoneTimer] = useState(null);
  const [allDone, setAllDone] = useState(false);
  const [freeToGoToNext, setFreeToGoToNext] = useState(false);

  useEffect(() => {
    const [activeSetFind] =
      exercisesObj.sets && exercisesObj.sets.filter(item => !item.done);
    setAllDone(!activeSetFind);
    if (activeSetFind) {
      if (!firstDoneTimer) {
        setFirstDoneTimer(activeSetFind.timer);
      }
      setActiveSet(activeSetFind);
    }
  }, [exercisesObj, activeSet]);

  useEffect(() => {
    if (isClickedOnActive) {
      setStartCount(true);
    }
  }, [isClickedOnActive]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderForDrawer
        navigation={navigation}
        headerNavProp={{paddingBottom: 50}}
        onDrawerButtonPress={() => {
          toggleDrawer();
        }}
      />
      <ScrollableTabView
        style={{backgroundColor: 'white', flex: 1}}
        renderTabBar={props => (
          <ExerciseTabHeader
            {...props}
            navigation={navigation}
            goToNext={freeToGoToNext}
            exercisePicked={exercisesObj.id}
            selectedSession={selectedSession}
            pickSessionAction={pickSessionAction}
            setFreeToGoToNext={setFreeToGoToNext}
            setFirstDoneTimer={setFirstDoneTimer}
          />
        )}>
        {selectedSession.map(item => (
          <View tabLabel={item} style={{flex: 1}}>
            <VideoExercise videoUrl={exercisesObj.exercise.video_url} />
            <View style={styles.statusBarWrapper}>
              <StatusBar statusKey={3} />
            </View>
            <View style={styles.scrollWrapper}>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                horizontal>
                {item.sets.map(setItem => (
                  <SetButton
                    onClick={() => {
                      // markSetAsDoneAction(setItem.id, item.id);
                      // setIsClickedOnActive(true);
                    }}
                    setItem={setItem}
                  />
                ))}
              </ScrollView>
            </View>
            {activeSet && (
              <ScrollView>
                <View style={styles.buttonWrapper}>
                  <FatExerciseButton
                    buttonLabel="Reps"
                    buttonText={activeSet.reps}
                    onClick={() => null}
                  />
                  <FatExerciseButton
                    buttonLabel="Weight"
                    buttonText={activeSet.weight}
                    onClick={() => null}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <FatExerciseIconButton
                    buttonText="Details"
                    onClick={() => null}
                    buttonIcon={iconDetails}
                  />
                  <FatExerciseIconButton
                    buttonText="Swap Exercises"
                    onClick={() =>
                      navigation.navigate(Routes.SwapExerciseScreen, {
                        prevScreen: Routes.ExerciseScreen,
                      })
                    }
                    buttonIcon={iconSwap}
                  />
                  <FatGradientIconButton
                    buttonText={item.done ? 'Done' : 'Done, Start Rest'}
                    buttonIcon={iconDoneStartRest}
                    colorsGradient={['#3180BD', '#6EC2FA']}
                    colorsGradientDisable={['#d3d3d3', '#838383']}
                    disabled={startCount || item.done}
                    onClick={() => {
                      findAndMarkAsDoneSetAction();
                      setIsClickedOnActive(true);
                    }}
                  />
                </View>
                <View>
                  <RestContainer
                    upNext={nextWorkout ? nextWorkout.name : '-'}
                    activeSet={activeSet}
                    startCount={startCount}
                    secondsRest={firstDoneTimer}
                    stopCountFunc={setSeconds => {
                      if (allDone) {
                        setFreeToGoToNext(true);
                      }
                      setSeconds(activeSet.timer);
                      setStartCount(false);
                      setIsClickedOnActive(false);
                    }}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        ))}
      </ScrollableTabView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  scrollWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 2,
    paddingHorizontal: 5,
  },
  statusBarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default ExerciseContainer;
