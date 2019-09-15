import React from 'react';
import { View, Text } from 'react-native';
import TodayHorizontalSlider from '../../components/TodayHorizontalSlider';

const TodayContainerHorizontal = ({
  navigation,
  data,
  onSelectItem,
  sliderTitle,
  routeName
}) => (
  <View>
    <View style={{ paddingHorizontal: 5 }}>
      <Text style={{ fontSize: 23, color: 'black' }}>{sliderTitle}</Text>
    </View>
    <View>
      <TodayHorizontalSlider
        navigation={navigation}
        onSelectItem={onSelectItem}
        data={data}
        routeName={routeName}
      />
    </View>
  </View>
);

export default TodayContainerHorizontal;
