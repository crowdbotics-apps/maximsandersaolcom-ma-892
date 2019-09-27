import React from 'react';
import {
  View,
  Text
} from 'react-native';
import IngredientRecipesListItem from '../../components/IngredientRecipesListItem';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';

const VerticalSliderFindFood = ({
  allRecipes,
  navigation,
  selectOneRecipeAction,
  getRecipeByNameOrCategoryAction,
  searchString,
  category
}) => (
  <SearchablePaginatedList
    style={{ flex: 1 }}
    ListEmptyComponent={() => <View><Text>Empty list</Text></View>} // to do!
    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10, paddingVertical: 0 }}
    list={allRecipes}
    fetchListAction={(search, categorySlug, page, limit, offset) => getRecipeByNameOrCategoryAction({
      name: search,
      category: categorySlug,
      page,
      limit,
      offset
    })}
    renderItem={({ item, key }) => (
      <IngredientRecipesListItem
        recipe={item}
        key={key}
        onPressRecipe={selectOneRecipeAction}
        navigation={navigation}
      />
    )}
    search={searchString}
    filter={category}
  />
);

export default VerticalSliderFindFood;
