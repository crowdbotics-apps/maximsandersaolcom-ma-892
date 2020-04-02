import React from 'react';
import { ScrollView, FlatList, View, Text } from 'react-native';
import CategoryHorizontalSlider from '../../components/CategoryHorizontalSlider';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';

const HorizontalSliderFindFood = ({
  recipesByCategory,
  navigation,
  selectOneRecipeAction,
  getCategoriesAction,
  addRemoveFavoritesAction
}) => {
  if (recipesByCategory && recipesByCategory.length) {
    return (
      <SearchablePaginatedList
        style={{ flex: 1 }}
        ListEmptyComponent={() => <View><Text>Empty list</Text></View>} // to do!
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 2, paddingVertical: 0 }}
        list={recipesByCategory}
        fetchListAction={(search, categorySlug, page, limit, offset) => getCategoriesAction(
          page,
          limit,
          offset
        )}
        renderItem={({ item, key }) => (
          <CategoryHorizontalSlider
            onSelectItem={selectOneRecipeAction}
            navigation={navigation}
            containerStyle={{ paddingTop: 15 }}
            data={item.recipes}
            slug={item.slug}
            addToFavorites={addRemoveFavoritesAction}
            buttonContainerText={item.categoryName}
            buttonContainerStyleProp={{ backgroundColor: 'rgb(68, 161, 248)', marginLeft: 10 }}
          />
        )}
        search={''}
        filter={''}
      />
    );
  }
  return <View />;
};

export default HorizontalSliderFindFood;
