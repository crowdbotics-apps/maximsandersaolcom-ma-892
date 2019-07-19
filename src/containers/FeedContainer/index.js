import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import FeedContainer from './FeedContainer';

const mapState = state => ({
  profile: state.auth && state.auth.profile,
});

export default connect(mapState)(withNavigation(FeedContainer));
