import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import ProgramContainer from './ProgramContainer';
import { getAllSessions, pickSession } from '../../redux/modules/sessionReducer';

const mapState = state => ({
  allSessions: state.sessions && state.sessions.allSessions,
  exerciseSwapped: state.sessions && state.sessions.exerciseSwapped,
});

const mainActions = {
  getAllSessionsAction: getAllSessions,
  pickSessionAction: pickSession
};

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(ProgramContainer));
