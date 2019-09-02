import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecipesAction } from '../../redux/modules/nutritionReducer';
import FindFoodAndRecipesContainer from './FindFoodAndRecipesContainer';

const mapState = state => ({
  scannedProduct: state.nutrition && state.nutrition.scannedProduct,
});

const mainActions = {
  getRecipesAction,
};

export default connect(
  mapState,
  dispatch => bindActionCreators(mainActions, dispatch)
)(FindFoodAndRecipesContainer);
