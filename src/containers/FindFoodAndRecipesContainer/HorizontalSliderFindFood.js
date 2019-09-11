import React from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import CategoryHorizontalSlider from '../../components/CategoryHorizontalSlider';

const HorizontalSliderFindFood = ({ recipesByCategory, navigation, selectOneRecipeAction }) => (
  <ScrollView style={{ paddingBottom: 15 }}>
    {
      recipesByCategory && recipesByCategory.length ? (
        <FlatList
          data={recipesByCategory}
          renderItem={({ item }) => (
            <CategoryHorizontalSlider
              onSelectItem={selectOneRecipeAction}
              navigation={navigation}
              containerStyle={{ paddingTop: 15 }}
              data={item.recipes}
              addToFavorites={() => {}}
              buttonContainerText={item.categoryName}
              buttonContainerStyleProp={{ backgroundColor: 'rgb(68, 161, 248)', marginLeft: 10 }}
            />
          )}
        />
      ) : <View />
    }
  </ScrollView>
);

export default HorizontalSliderFindFood;
