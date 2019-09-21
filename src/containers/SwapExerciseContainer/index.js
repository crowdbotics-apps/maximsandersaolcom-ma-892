import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import SwapExerciseContainer from './SwapExerciseContainer';
import { getAllExercises } from '../../redux/modules/sessionReducer';

const mapState = state => ({
  exercisesObj: state.sessions && state.sessions.exercisesObj,
  selectedSession: state.sessions && state.sessions.selectedSession,
  allExercises: state.sessions && state.sessions.allExercises
});

const mainActions = {
  getAllExercisesAction: getAllExercises,
};

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);


export default connect(mapState, mapActions)(withNavigation(SwapExerciseContainer));
