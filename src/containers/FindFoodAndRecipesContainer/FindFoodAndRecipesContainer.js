import React, { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import { View } from 'react-native';
import Search from '../../components/Search';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import CategoryTagItem from '../../components/CategoryTagItem';
import HorizontalSliderFindFood from './HorizontalSliderFindFood';
import VerticalSliderFindFood from './VerticalSliderFindFood';

const FindFoodAndRecipesContainer = ({
  navigation,
  allRecipes = [],
  selectOneRecipeAction,
  getCategoriesAction,
  allCategories,
  getRecipesByCategoryAction,
  recipesByCategory,
  getRecipeByNameOrCategoryAction,
  addRemoveFavoritesAction
}) => {
  const [searchString, setSearchString] = useState('');
  const [selectedCategoryProp, setSelectedCategoryProp] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (allCategories.length) {
      getRecipesByCategoryAction(allCategories);
    }
  }, [allCategories]);

  useEffect(() => {
    getCategoriesAction();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Search
          placeHolderText="Find Recipes"
          searchString={searchString}
          searchFunc={searchVal => setSearchString(searchVal)}
        />
      </View>
      <View style={{ marginTop: 15, marginBottom: 10 }}>
        <HorizontalScrollView containerStyle={{ marginHorizontal: 10 }}>
          {allCategories.map((item, key) => (
            <CategoryTagItem
              onPresFunc={() => {
                if (!selectedCategoryProp || selectedCategoryProp.id !== item.id) {
                  setSelectedCategoryProp(item);
                  return setSelectedCategory([item]);
                }
                setSelectedCategoryProp(null);
                return setSelectedCategory([]);
              }}
              selectedCategory={selectedCategory}
              key={key} // eslint-disable-line
              index={key}
              tagText={item.name}
              tagTextContainerStyle={[
                {
                  paddingHorizontal: 10
                },
                selectedCategoryProp && selectedCategoryProp.id === item.id ? { backgroundColor: 'gray' } : null
              ]}
            />
          ))}
        </HorizontalScrollView>
      </View>
      { !searchString.length && !selectedCategory.length ? (
        <HorizontalSliderFindFood
          navigation={navigation}
          selectOneRecipeAction={selectOneRecipeAction}
          recipesByCategory={recipesByCategory}
          getCategoriesAction={getCategoriesAction}
          addRemoveFavoritesAction={addRemoveFavoritesAction}
        />
      ) : <View />}
      {(searchString.length || selectedCategory.length) ? (
        <VerticalSliderFindFood
          searchString={searchString}
          getRecipeByNameOrCategoryAction={getRecipeByNameOrCategoryAction}
          category={(selectedCategoryProp && selectedCategoryProp.slug) || ''}
          allRecipes={allRecipes}
          navigation={navigation}
          selectOneRecipeAction={selectOneRecipeAction}
        />
      ) : <View />}
    </View>
  );
};

export default FindFoodAndRecipesContainer;
