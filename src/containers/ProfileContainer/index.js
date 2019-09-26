import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { calculateWeekNumberAction } from '../../redux/modules/sessionReducer';
import ProfileContainer from './ProfileContainer';

const mapState = state => ({
  profile: state.auth && state.auth.profile,
});

const mainActions = {
  calculateWeekNumberAction
};

export default connect(mapState, mainActions)(withNavigation(ProfileContainer));
