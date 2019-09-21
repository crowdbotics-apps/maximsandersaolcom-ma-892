import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import TodayHorizontalSliderItem from '../TodayHorizontalSliderItem';

const sportsArr = [
  {
    image_url: 'http://lorempixel.com/output/sports-q-c-480-480-6.jpg',
    title: 'Barbell Bicep curlss'
  },
  {
    image_url: 'http://lorempixel.com/output/sports-q-c-480-480-3.jpg',
    title: 'Incline Dumbell Curl'
  },
  {
    image_url: 'http://lorempixel.com/output/sports-q-c-480-480-3.jpg',
    title: 'Standing Cable Curlaaa'
  },
];

const TodayHorizontalSlider = ({
  data = [],
  containerStyle = {},
  onSelectItem,
  navigation,
  routeName
}) => (
  <View style={[{ backgroundColor: 'white' }, containerStyle]}>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item, index }) => (
        <TodayHorizontalSliderItem
          item={item}
          index={index}
          onClick={() => {
            navigation.navigate(routeName);
            onSelectItem();
          }}
        />
      )}
    />
  </View>
);


export default TodayHorizontalSlider;
