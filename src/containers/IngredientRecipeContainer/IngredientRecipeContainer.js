import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView
} from 'react-native';
import Search from '../../components/Search';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import CategoryTagItem from '../../components/CategoryTagItem';
import VerticalSliderFindFood from '../FindFoodAndRecipesContainer/VerticalSliderFindFood';


const IngredientRecipeContainer = ({
  navigation,
  allCategories,
  getCategoriesAction,
  recipesByIngredient: {
    results
  },
  selectOneRecipeAction
}) => {
  const [searchString, setSearchString] = useState('');
  const [selectedCategoryProp, setSelectedCategoryProp] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    if (!allCategories.length) {
      getCategoriesAction();
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <VerticalSliderFindFood
        allRecipes={results}
        navigation={navigation}
        selectOneRecipeAction={selectOneRecipeAction}
      />
    </SafeAreaView>
  );
};

export default IngredientRecipeContainer;
