import Api from '../api';

export default class FeedService {
  api = Api.getInstance();

  getFeedPosts(page = 1, limit = 5, offset = 0) {
    return this.api.fetch('GET', `/post/?page=${page}&limit=${limit}&offset=${offset}`)
      .then(response => ({
        feeds: response.data.results,
        feedsObj: response.data
      }))
      .catch((err) => { throw err; });
  }

  addOrRemoveLike(feedId) {
    return this.api.fetch('POST', `/post/${feedId}/add_like/`, {})
      .then(response => response)
      .catch((err) => { throw err; });
  }

  addComment(feedId, comment) {
    return this.api.fetch('POST', `/post/${feedId}/add_comment/`, { data: { comment } })
      .then(response => response)
      .catch((err) => { throw err; });
  }
}
