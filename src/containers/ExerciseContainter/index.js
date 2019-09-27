import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { markSetAsDoneAction, findAndMarkAsDoneSet, pickSession } from '../../redux/modules/sessionReducer';
import ExerciseContainer from './ExerciseContainer';

const mapState = state => ({
  exercisesObj: state.sessions && state.sessions.exercisesObj,
  selectedSession: state.sessions && state.sessions.selectedSession,
  nextWorkout: state.sessions && state.sessions.nextWorkout
});

const mainActions = {
  markSetAsDoneAction,
  findAndMarkAsDoneSetAction: findAndMarkAsDoneSet,
  pickSessionAction: pickSession,
};


export default connect(
  mapState,
  dispatch => bindActionCreators(mainActions, dispatch)
)(withNavigation(ExerciseContainer));
