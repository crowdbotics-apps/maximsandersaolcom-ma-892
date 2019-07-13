import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import ProfileContainer from './ProfileContainer';

const mapState = state => ({
  profile: state.profile,
});

export default connect(mapState)(withNavigation(ProfileContainer));
