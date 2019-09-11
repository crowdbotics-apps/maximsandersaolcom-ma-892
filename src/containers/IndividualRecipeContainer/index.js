import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  selectOneRecipe
} from '../../redux/modules/recipesReducer';
import IndividualRecipeContainer from './IndividualRecipeContainer';

const mainActions = {
  selectOneRecipeAction: selectOneRecipe
};

const mapState = state => ({
  recipeSelected: state.recipes && state.recipes.recipeSelected,
});

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(IndividualRecipeContainer));
