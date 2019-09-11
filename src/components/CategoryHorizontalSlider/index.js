import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import HorizontalSliderItem from '../HorizontalSliderItem';
import TagButton from '../TagButton';

const CategoryHorizontalSlider = ({
  data = [],
  containerStyle = {},
  buttonContainerStyleProp,
  buttonContainerTextStyle,
  buttonContainerText,
  isButtonThere = true,
  addToFavorites,
  navigation,
  onSelectItem
}) => (
  <View style={containerStyle}>
    {
      isButtonThere && (
        <TagButton
          buttonContainerStyleProp={buttonContainerStyleProp}
          buttonContainerText={buttonContainerText}
          buttonContainerTextStyle={buttonContainerTextStyle}
        />
      )
    }
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => (
        <HorizontalSliderItem
          onClick={() => onSelectItem(item)}
          navigation={navigation}
          item={item}
          addToFavorites={() => addToFavorites()}
        />
      )}
    />
  </View>
);


export default CategoryHorizontalSlider;