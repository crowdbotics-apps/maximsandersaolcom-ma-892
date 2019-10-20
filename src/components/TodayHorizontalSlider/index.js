import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import TodayHorizontalSliderItem from '../TodayHorizontalSliderItem';


const TodayHorizontalSlider = ({
  data = [],
  containerStyle = {},
  onSelectItem,
  navigation: {
    navigate,
  },
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
            onSelectItem(item);
            // navigate(routeName);
          }}
        />
      )}
    />
  </View>
);


export default TodayHorizontalSlider;
