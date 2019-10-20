import React from 'react';
import {
  Dimensions,
  TouchableOpacity
} from 'react-native';
import ImageContainer from '../ImageContainer';
import ImageTitle from '../ImageTitle';
import Routes from '../../Routes';

const imagePlaceholder = 'https://via.placeholder.com/300x150.png?text=MAXIM+FITNESS';
const screenHeight = Dimensions.get('screen').height / 3.5;
const screenWidth = Dimensions.get('screen').width;

const IngredientRecipesListItem = ({ recipe, onPressRecipe, navigation }) => (
  <TouchableOpacity
    style={{ paddingTop: 15 }}
    onPress={() => {
      onPressRecipe(recipe);
      navigation.navigate(Routes.IndividualRecipeScreen);
    }}
  >
    <ImageTitle
      title={recipe.name}
      mainContainerStyle={{ padding: 0, paddingHorizontal: 15 }}
    />
    <ImageContainer
      imageBackgroundStyleProp={{ height: screenHeight, width: screenWidth - 20 }}
      imageBackgroundUri={(recipe.image && recipe.image_url) || imagePlaceholder}
      navigation={navigation}
    />
    <ImageTitle
      mainContainerStyle={{ padding: 0, paddingHorizontal: 15 }}
      titleContainerStyle={{ display: 'none' }}
      firstItem={`${recipe.time_to_prepare} min`}
      secondItem={`${recipe.calories}`}
    />
  </TouchableOpacity>
);

export default IngredientRecipesListItem;
