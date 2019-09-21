import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import ExcerciseTabHeaderItem from '../ExcerciseTabHeaderItem';

const ExerciseTabHeader = ({ tabs, goToPage, activeTab, pickSessionAction, selectedSession }) => {
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
    const [findFirstUndone] = elementsFromScrollView.filter(item => !item.done);
    if (elementsFromScrollView.length === tabs.length && !scrolled && findFirstUndone) {
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
