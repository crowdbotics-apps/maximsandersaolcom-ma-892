import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import ExcerciseTabHeaderItem from '../ExcerciseTabHeaderItem';
import Routes from '../../Routes';

const ExerciseTabHeader = ({
  tabs,
  goToPage,
  activeTab,
  pickSessionAction,
  selectedSession,
  exercisePicked,
  goToNext,
  setFreeToGoToNext,
  setFirstDoneTimer,
  navigation
}) => {
  const scrollViewRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [elementsFromScrollView, setElementsFromScrollView] = useState([]);

  function setElementForScrollHelp(element) {
    const scrollViewRemoveCurrent = elementsFromScrollView
      .filter(elementItem => elementItem.item.id !== element.item.id);
    const sortedElements = [...scrollViewRemoveCurrent, element]
      .sort((a, b) =>  (a.index > b.index) ? 1 : -1); // eslint-disable-line
    setElementsFromScrollView(sortedElements);
  }

  useEffect(() => {
    const [findFirstUndone, nextWorkout] = selectedSession.filter(item => !item.done);
    if (goToNext) {
      if (findFirstUndone) {
        pickSessionAction(findFirstUndone, selectedSession, nextWorkout);
        setFreeToGoToNext(false);
        setFirstDoneTimer(null);
        setTimeout(() => {
          goToPage(activeTab + 1);
        }, 300);
      } else {
        navigation.navigate(Routes.ProgramScreen);
      }
    }
  }, [goToNext]);

  useEffect(() => {
    if (exercisePicked && !scrolled) {
      const [getPicked] = elementsFromScrollView
        .filter(exerciseItem => exerciseItem.item.id === exercisePicked);
      if (getPicked && !scrolled) {
        goToPage(getPicked.index);
        setScrolled(true);
      }
    }
  }, [exercisePicked, elementsFromScrollView]);

  useEffect(() => {
    const [findFirstUndone] = elementsFromScrollView.filter(item => !item.done);
    if (elementsFromScrollView.length === tabs.length && !exercisePicked && !scrolled && findFirstUndone) {  // eslint-disable-line
      scrollViewRef.current.scrollTo({
        x: findFirstUndone.x,
        y: findFirstUndone.y
      });
      setScrolled(true);
    }
  }, [elementsFromScrollView]);

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: 'rgb(214,214,214)',
      height: 75
    }}
    >
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled
        bounces={false}
        scrollsToTop={false}
        contentContainerStyle={{
          flexDirection: 'row',
          backgroundColor: 'rgb(214,214,214)',
          height: 75
        }}
      >
        {
          tabs.map((item, index) => (
            <ExcerciseTabHeaderItem
              setElemetForParent={setElementForScrollHelp}
              item={item}
              index={index}
              goToPage={goToPage}
              activeTab={activeTab}
              pickSessionAction={pickSessionAction}
              selectedSession={selectedSession}
            />
          ))
        }
      </ScrollView>
    </View>
  );
};

export default ExerciseTabHeader;
