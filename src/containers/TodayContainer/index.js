import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import TodayContainer from './TodayContainer';
import { getMealsByDateAction } from '../../redux/modules/nutritionReducer';
import { getSessionByDay, pickSession, selectSwapObject } from '../../redux/modules/sessionReducer';

const mapState = state => ({
  meals: state.nutrition && state.nutrition.meals,
  todaySession: state.sessions && state.sessions.todaySession,
  numberOfWeek: state.sessions && state.sessions.numberOfWeek,
  exerciseSwapped: state.sessions && state.sessions.exerciseSwapped,
});

const mainActions = {
  getMealsByDateAction,
  getSessionByDayAction: getSessionByDay,
  pickSessionAction: pickSession,
  selectSwapObjectAction: selectSwapObject
};

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(TodayContainer));
