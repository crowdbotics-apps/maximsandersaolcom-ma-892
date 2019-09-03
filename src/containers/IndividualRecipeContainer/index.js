import IndividualRecipeContainer from './IndividualRecipeContainer';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { 
  getRecipes,
  selectOneRecipe
} from '../../redux/modules/recipesReducer';

const mainActions = {
  getRecipesAction: getRecipes,
  selectOneRecipeAction: selectOneRecipe
}

const mapState = state => ({
  recipeSelected: state.recipes && state.recipes.recipeSelected,
});

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(IndividualRecipeContainer));