import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import ProgramContainer from './ProgramContainer';
import { getMealsByDateAction } from '../../redux/modules/nutritionReducer';

const mapState = state => ({
  meals: state.nutrition && state.nutrition.meals,
});

const mainActions = {
  getMealsByDateAction,
};

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(ProgramContainer));
