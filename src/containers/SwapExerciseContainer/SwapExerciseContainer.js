import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import VideoExercise from '../../components/VideoExercise';
import Routes from '../../Routes';

const SwapExerciseContainer = ({
  navigation,
  navigation: {
    toggleDrawer,
    getParam
  },
  selectedSwapObj,
  allExercises,
  swapExercisesAction,
  getAllExercisesAction,
  exerciseSwapped
}) => {
  useEffect(() => {
    if (allExercises.results && !allExercises.results.length) {
      getAllExercisesAction();
    }
  }, [allExercises]);
  useEffect(() => {
    if (exerciseSwapped) {
      const prevScreen = getParam('prevScreen', false);
      if (prevScreen === 'TodayScreen') {
        navigation.navigate(Routes.TodayScreen);
        return;
      }
      navigation.goBack();
    }
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
      <View style={{ flex: 1 }}>
        <VideoExercise
          videoUrl={selectedSwapObj.exercise.video_url}
          containterStyle={{ paddingHorizontal: 5 }}
        />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}>
          <FlatList
            data={(allExercises && allExercises.results) || []}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  const restOfProgram = getParam('restOfProgram', false);
                  swapExercisesAction(selectedSwapObj.id, item.id, restOfProgram);
                }}
                style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}
              >
                <View>
                  <Image
                    source={{ uri: item.pictures[0] ? item.pictures[0].image_url : '' }}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SwapExerciseContainer;
