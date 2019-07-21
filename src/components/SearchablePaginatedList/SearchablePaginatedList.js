import React, { Component } from 'react';
import PropType from 'prop-types';
import { View } from 'react-native';
import PaginatedListContainer from './PaginatedListContainer';
import Loading from '../Loading';

const initialState = {
  offset: 0,
  limit: 10,
  appending: false,
  loading: true,
  userRefreshing: false,
};

class SearchablePaginatedList extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { reloadOnMount, list, reloadOnTransfer} = this.props;
    if (!reloadOnMount || reloadOnTransfer) {
      this.reloadList();
    } else {
      if (!list || !list.length) {
        this.reloadList();
      } else {
        this.setState({
          loading: false,
          appending: false,
          hasMore: true,
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { search, filter } = this.props;
    if (search !== prevProps.search || JSON.stringify(filter) !== JSON.stringify(prevProps.filter)) {
      this.setState(initialState, () => this.reloadList());
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  reloadList = async () => {
    const {
      fetchListAction,
      search,
      filter
    } = this.props;

    const { offset, limit } = this.state;

    const hasMore = await fetchListAction(offset, limit, search, filter);
    if (!this.unmounted) {
      this.setState({
        loading: false,
        hasMore,
        userRefreshing: false
      });
    }
  }

  fetchRequest = async () => {
    const {
      fetchListAction,
      search,
      filter,
    // list
    } = this.props;
    const { offset, limit } = this.state;

    const hasMore = await fetchListAction(offset, limit, search, filter);

    if (!this.unmounted) {
      this.setState({
        appending: false,
        hasMore,
      });
    }
  }

  handleRefresh = () => {
    const { appending, hasMore } = this.state;

    if (appending || !hasMore) return;
    if (!this.unmounted) {
      this.setState(prevState => ({
        offset: prevState.offset + prevState.limit,
        appending: true,
      }), () => {
        this.fetchRequest();
      });
    }
  }

  render() {
    const {
      list, renderItem, numColumns, listStyle, contentContainerStyle, ListEmptyComponent, keyboardDismissMode, keyboardShouldPersistTaps
    } = this.props;
    const {
      appending,
      loading,
      hasMore,
      userRefreshing
    } = this.state;

    if (loading) {
      return (
        <Loading />
      );
    }
    // if list is null, we will not take up space
    const style = list === null ? {} : { flex: 1 };
    return (
      <View style={style}>
        <PaginatedListContainer
          keyboardDismissMode={keyboardDismissMode}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          refreshingTop={userRefreshing}
          refreshListToInitial={() => this.setState({ ...initialState, userRefreshing: true, loading: false }, () => this.reloadList())}
          numColumns={numColumns}
          handleRefreshFunc={this.handleRefresh}
          refreshing={appending}
          list={list || []}
          renderItem={renderItem}
          hasMore={hasMore}
          style={listStyle}
          contentContainerStyle={contentContainerStyle}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    );
  }
}

SearchablePaginatedList.defaultProps = {
  search: '',
  list: null,
  numColumns: 1,
};

SearchablePaginatedList.propTypes = {
  list: PropType.arrayOf(PropType.shape({
    id: PropType.string.isRequired
  })),
  renderItem: PropType.func.isRequired,
  fetchListAction: PropType.func.isRequired,
  search: PropType.string,
  numColumns: PropType.number,
};

export default SearchablePaginatedList;
