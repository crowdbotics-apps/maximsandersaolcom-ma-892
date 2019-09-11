import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  selectOneRecipe
} from '../../redux/modules/recipesReducer';
import { getCategories } from '../../redux/modules/nutritionReducer';
import IngredientRecipeContainer from './IngredientRecipeContainer';

const mainActions = {
  selectOneRecipeAction: selectOneRecipe,
  getCategoriesAction: getCategories,
};

const mapState = state => ({
  recipesByIngredient: state.recipes && state.recipes.recipesByIngredient,
  allCategories: state.nutrition.categories,
});

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(IngredientRecipeContainer));
