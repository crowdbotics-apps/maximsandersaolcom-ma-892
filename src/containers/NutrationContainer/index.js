import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMealsByDateAction, setSelectedMeal } from '../../redux/modules/nutritionReducer';
import NutrationContainer from './NutrationContainer';

const mapState = state => ({
  meals: state.nutrition && state.nutrition.meals,
});

const mainActions = {
  getMealsByDateAction,
  setSelectedMealAction: setSelectedMeal
};

export default connect(
  mapState,
  dispatch => bindActionCreators(mainActions, dispatch)
)(NutrationContainer);
