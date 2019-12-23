import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import WorkoutSummaryContainer from './WorkoutSummaryContainer';

const mapState = state => ({
  allSessions: state.sessions && state.sessions.allSessions,
});

const mainActions = {};

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(WorkoutSummaryContainer));
