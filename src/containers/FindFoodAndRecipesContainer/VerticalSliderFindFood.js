import React from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Text
} from 'react-native';
import IngredientRecipesListItem from '../../components/IngredientRecipesListItem';

const VerticalSliderFindFood = ({ allRecipes, navigation, selectOneRecipeAction }) => (
  <ScrollView style={{ paddingBottom: 15 }}>
    {
      allRecipes ? (
        <FlatList
          data={allRecipes}
          renderItem={({ item }) => (
            <IngredientRecipesListItem
              recipe={item}
              onPressRecipe={selectOneRecipeAction}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <View>
          <Text>No items</Text>
        </View>
      )
    }
  </ScrollView>
);

export default VerticalSliderFindFood;
