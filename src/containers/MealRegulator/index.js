import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import MealRegulatorContainer from './MealRegulatorContainer';
import { getProductsBySearchString, setSelectedProducts, unsetSearchActive } from '../../redux/modules/nutritionReducer';

const mainActions = {
  getProductsBySearchStringAction: getProductsBySearchString,
  setSelectedProductsAction: setSelectedProducts,
  unsetSearchActiveAction: unsetSearchActive
};

const mapState = state => ({
  recipesByIngredient: state.recipes && state.recipes.recipesByIngredient,
  allCategories: state.nutrition.categories,
  products: state.nutrition && state.nutrition.products,
  selectedProducts: state.nutrition && state.nutrition.selectedProducts,
  searchActive: state.nutrition && state.nutrition.searchActive,
  searchStringState: state.nutrition && state.nutrition.searchStringState
});

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(MealRegulatorContainer));
