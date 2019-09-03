import FindFoodAndRecipesContainer from './FindFoodAndRecipesContainer';
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
  allRecipes: state.recipes && state.recipes.allRecipes,
  loading: state.recipes && state.recipes.loading
});

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(FindFoodAndRecipesContainer));