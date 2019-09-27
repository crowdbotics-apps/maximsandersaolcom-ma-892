import React from 'react';
import {
  View,
  Text
} from 'react-native';
import HorizontalSliderItem from '../HorizontalSliderItem';
import TagButton from '../TagButton';
import SearchablePaginatedList from '../SearchablePaginatedList/SearchablePaginatedList';

const CategoryHorizontalSlider = ({
  data = [],
  containerStyle = {},
  buttonContainerStyleProp,
  buttonContainerTextStyle,
  buttonContainerText,
  isButtonThere = true,
  addToFavorites,
  navigation,
  onSelectItem,
  slug
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
    <SearchablePaginatedList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
      ListEmptyComponent={() => <View><Text>Empty list</Text></View>} // to do!
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 2, paddingVertical: 0 }}
      list={data}
      fetchListAction={(search, categorySlug, page, limit, offset) => console.log('aa', categorySlug, page, limit, offset)}
      renderItem={({ item }) => (
        <HorizontalSliderItem
          onClick={() => onSelectItem(item)}
          navigation={navigation}
          item={item}
          addToFavorites={() => addToFavorites()}
        />
      )}
      search={''}
      filter={slug}
    />
  </View>
);


export default CategoryHorizontalSlider;
