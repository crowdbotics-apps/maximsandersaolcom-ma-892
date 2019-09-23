import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Search from '../../components/Search';
import Loading from '../../components/Loading';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import CategoryTagItem from '../../components/CategoryTagItem';
import HorizontalSliderFindFood from './HorizontalSliderFindFood';
import VerticalSliderFindFood from './VerticalSliderFindFood';

const FindFoodAndRecipesContainer = ({
  navigation,
  allRecipes = [],
  loading,
  selectOneRecipeAction,
  getCategoriesAction,
  allCategories,
  getRecipesByCategoryAction,
  recipesByCategory,
  getRecipeByNameOrCategoryAction
}) => {
  const [searchString, setSearchString] = useState('');
  const [selectedCategoryProp, setSelectedCategoryProp] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);

  // useEffect(() => {
  //   if (selectedCategoryProp || searchString.length) {
  //     getRecipeByNameOrCategoryAction({
  //       name: searchString,
  //       category: (selectedCategoryProp && selectedCategoryProp.slug) || ''
  //     });
  //   }
  // }, [searchString, selectedCategory, selectedCategoryProp]);

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
