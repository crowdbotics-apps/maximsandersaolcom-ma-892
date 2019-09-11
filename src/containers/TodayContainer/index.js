// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import TodayContainer from './TodayContainer';

// const mainActions = {
//   selectOneRecipeAction: selectOneRecipe,
//   getCategoriesAction: getCategories,
// };

const mapState = state => ({
  recipesByIngredient: state.recipes && state.recipes.recipesByIngredient,
});

// const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState)(withNavigation(TodayContainer));
