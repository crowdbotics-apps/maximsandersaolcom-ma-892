import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import ExerciseTabHeader from '../../components/ExerciseTabHeader';
import SetButton from '../../components/SetButton';
import VideoExercise from '../../components/VideoExercise';
import FatExerciseButton from '../../components/FatExerciseButton';
import FatExerciseIconButton from '../../components/FatExerciseIconButton';
import FatGradientIconButton from '../../components/FatGradientIconButton';
import RestContainer from '../../components/RestContainer';
import Routes from '../../Routes';

const ExerciseContainer = ({
  navigation,
  navigation: {
    toggleDrawer
  },
  exercisesObj,
  selectedSession,
  markSetAsDoneAction,
  findAndMarkAsDoneSetAction,
  pickSessionAction
}) => (
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
      renderTabBar={props => (
        <ExerciseTabHeader
          {...props}
          exercisePicked={exercisesObj.id}
          selectedSession={selectedSession}
          pickSessionAction={pickSessionAction}
        />
      )}
    >
      {
        selectedSession.map(item => (
          <View tabLabel={item} style={{ flex: 1 }}>
            <VideoExercise videoUrl={exercisesObj.exercise.video_url} />
            <View style={styles.scrollWrapper}>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                horizontal
              >
                { item.sets.map(setItem => (
                  <SetButton onClick={() => markSetAsDoneAction(setItem.id, item.id)} setItem={setItem} />
                ))
                }
              </ScrollView>
            </View>
            <ScrollView>
              <View style={styles.buttonWrapper}>
                <FatExerciseButton buttonLabel="Reps" buttonText="12" onClick={() => null} />
                <FatExerciseButton buttonLabel="Weight" buttonText="32" onClick={() => null} />
              </View>
              <View style={styles.buttonWrapper}>
                <FatExerciseIconButton buttonText="Details" onClick={() => null} />
                <FatExerciseIconButton buttonText="Swap Exercises" onClick={() => navigation.navigate(Routes.SwapExerciseScreen)} />
                <FatGradientIconButton
                  buttonText="Done"
                  colorsGradient={['#3180BD', '#6EC2FA']}
                  onClick={() => findAndMarkAsDoneSetAction()}
                />
              </View>
              <View>
                <RestContainer
                  // startCount
                  secondsRest={90}
                />
              </View>
            </ScrollView>
          </View>
        ))
      }
    </ScrollableTabView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 10
  },
  scrollWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 2,
    paddingHorizontal: 5
  }
});

export default ExerciseContainer;
