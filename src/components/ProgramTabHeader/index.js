import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import ProgramTabHeaderItem from '../ProgramTabHeaderItem';

const ProgramTabHeader = ({ tabs, goToPage, activeTab }) => (
  <View style={{
    flexDirection: 'row',
    backgroundColor: 'rgb(214,214,214)',
    height: 75
  }}
  >
    <ScrollView
      horizontal
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
          <ProgramTabHeaderItem
            item={item}
            index={index}
            goToPage={goToPage}
            activeTab={activeTab}
          />
        ))
      }
    </ScrollView>
  </View>
);

export default ProgramTabHeader;
