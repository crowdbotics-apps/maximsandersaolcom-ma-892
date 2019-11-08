import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import LogFoodsContainer from './LogFoodsContainer';
import {
  getProductsBySearchString,
  setSelectedProducts,
  unsetSearchActive,
  removeSelectedProducts,
  editSelectedProducts,
  removeAllSelectedProducts,
  logFood
} from '../../redux/modules/nutritionReducer';

const mainActions = {
  getProductsBySearchStringAction: getProductsBySearchString,
  setSelectedProductsAction: setSelectedProducts,
  unsetSearchActiveAction: unsetSearchActive,
  removeSelectedProductsAction: removeSelectedProducts,
  editSelectedProductsAction: editSelectedProducts,
  removeAllSelectedProductsAction: removeAllSelectedProducts,
  logFoodAction: logFood
};

const mapState = state => ({
  recipesByIngredient: state.recipes && state.recipes.recipesByIngredient,
  allCategories: state.nutrition.categories,
  products: state.nutrition && state.nutrition.products,
  selectedProducts: state.nutrition && state.nutrition.selectedProducts,
  selectedProductsStats: state.nutrition && state.nutrition.selectedProductsStats,
  searchActive: state.nutrition && state.nutrition.searchActive,
  searchStringState: state.nutrition && state.nutrition.searchStringState
});

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(LogFoodsContainer));
