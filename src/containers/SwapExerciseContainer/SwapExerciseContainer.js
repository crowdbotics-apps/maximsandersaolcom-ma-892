import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
} from 'react-native';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import VideoExercise from '../../components/VideoExercise';

const SwapExerciseContainer = ({
  navigation,
  navigation: {
    toggleDrawer
  },
  exercisesObj,
  selectedSession,
  allExercises,
  getAllExercisesAction
}) => {
  useEffect(() => {
    if (allExercises.results && !allExercises.results.length) {
      getAllExercisesAction();
    }
  }, [allExercises]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderForDrawer
        navigation={navigation}
        headerNavProp={{ paddingBottom: 50 }}
        onDrawerButtonPress={() => {
          toggleDrawer();
        }}
      />
      <View style={{ flex: 1 }}>
        <VideoExercise videoUrl={exercisesObj.exercise.video_url} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
          <Text>JOJO</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SwapExerciseContainer;
