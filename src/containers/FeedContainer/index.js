import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { getFeedAction, addOrRemoveLike, toggleComment, addComment } from '../../redux/modules/feedReducer';

import FeedContainer from './FeedContainer';

const mapState = state => ({
  feeds: state.feeds && state.feeds.feeds,
});

const mainActions = {
  getFeedAction,
  addOrRemoveLikeAction: addOrRemoveLike,
  toggleCommentAction: toggleComment,
  addCommentAction: addComment
};

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(withNavigation(FeedContainer));
