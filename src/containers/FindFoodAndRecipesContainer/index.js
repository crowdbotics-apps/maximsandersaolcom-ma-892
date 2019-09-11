import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  selectOneRecipe,
  getRecipesByCategory,
  getRecipeByNameOrCategory
} from '../../redux/modules/recipesReducer';
import { getCategories } from '../../redux/modules/nutritionReducer';
import FindFoodAndRecipesContainer from './FindFoodAndRecipesContainer';

const mainActions = {
  selectOneRecipeAction: selectOneRecipe,
  getCategoriesAction: getCategories,
  getRecipesByCategoryAction: getRecipesByCategory,
  getRecipeByNameOrCategoryAction: getRecipeByNameOrCategory
};

const mapState = state => ({
  allRecipes: state.recipes && state.recipes.allRecipes,
  loading: state.recipes && state.recipes.loading,
  allCategories: state.nutrition.categories,
  recipesByCategory: state.recipes && state.recipes.recipesByCategory
});

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(FindFoodAndRecipesContainer));
