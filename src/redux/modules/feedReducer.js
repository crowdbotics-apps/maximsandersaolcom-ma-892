import initialStateFeed from '../initialState/feedInitial';
import FeedService from '../../services/FeedService';
import uniq from '../../utils/removeDuplicateInArray';

export const START_FETCHING_FEED = 'feed/START_FETCHING_FEED';
export const GET_ALL_FEED = 'feed/GET_ALL_FEED';
export const APPEND_FEED = 'feed/APPEND_FEED';
export const TOGGLE_SHOW_AREA_COMMENT = 'feed/TOGGLE_SHOW_AREA_COMMENT';
export const TOGGLE_LIKE = 'feed/TOGGLE_LIKE';
export const ADD_COMMENT = 'feed/ADD_COMMENT';

const feedService = new FeedService();

export default (state = { ...initialStateFeed }, { type, payload }) => {
  switch (type) {
    case START_FETCHING_FEED: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ALL_FEED: {
      return {
        ...state,
        feeds: payload.feeds,
        feedsObj: payload.feedsObj,
        loading: false
      };
    }
    case APPEND_FEED: {
      return {
        ...state,
        feeds: payload.feeds,
        feedsObj: payload.feedsObj,
        loading: false
      };
    }
    case TOGGLE_SHOW_AREA_COMMENT: {
      return {
        ...state,
        feeds: payload
      };
    }
    case TOGGLE_LIKE: {
      return {
        ...state,
        feeds: payload
      };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        feeds: payload
      };
    }
    default: return state;
  }
};

export const getFeedAction = ({
  page = 1,
  limit = 5,
  offset = 0
}) => {
  return (dispatch, getState) => {
    dispatch({ type: START_FETCHING_FEED });
    return feedService.getFeedPosts(page, limit, offset)
      .then((payload) => {
        const { feeds, feedsObj } = payload;
        const feedsWithFlag = feeds.map(item => ({ ...item, commentShow: false }));
        if (offset !== 0) {
          if (feedsWithFlag.length > 0) {
            const { feeds: { feeds: existingFeeds } } = getState();
            const withoutDuplicate = uniq([...existingFeeds, ...feedsWithFlag], 'id');
            dispatch({
              type: APPEND_FEED,
              payload: {
                feeds: withoutDuplicate,
                feedsObj
              }
            });
          }
        } else {
          dispatch({
            type: GET_ALL_FEED,
            payload: {
              feeds: feedsWithFlag,
              feedsObj
            }
          });
        }
        // has more
        return feeds.length === limit;
      });
  };
};

export const addOrRemoveLike = feedId => (dispatch, getState) => feedService.addOrRemoveLike(feedId)
  .then((res) => {
    const { feeds: { feeds: feedsArray } } = getState();
    const newFeedArray = feedsArray.map((item) => {
      if (item.id === feedId) {
        const helper = {
          ...item,
          liked: !item.liked
        };
        return helper;
      }
      return item;
    });
    dispatch({ type: TOGGLE_LIKE, payload: newFeedArray });
  })
  .catch((err) => { throw err; });

export const toggleComment = feedId => (dispatch, getState) => {
  const { feeds: { feeds: feedsArray } } = getState();
  const newFeedArray = feedsArray.map((item) => {
    if (item.id === feedId) {
      const helper = {
        ...item,
        commentShow: !item.commentShow
      };
      return helper;
    }
    return item;
  });
  dispatch({ type: TOGGLE_SHOW_AREA_COMMENT, payload: newFeedArray });
};

export const addComment = (feedId, comment)=> (dispatch, getState) => {
  return feedService.addComment(feedId, comment)
    .then((res) => {
      const { feeds: { feeds: feedsArray } } = getState();
      const newFeedArray = feedsArray.map((item) => {
        if (item.id === feedId) {
          const helper = {
            ...item,
            comments: [
              ...item.comments,
              {
                content: comment
              }
            ]
          };
          return helper;
        }
        return item;
      });
      dispatch({ type: ADD_COMMENT, payload: newFeedArray });
    })
    .catch((err) => { throw err; });
};
