import React, { Component } from 'react';
import PropType from 'prop-types';
import { View } from 'react-native';
import PaginatedListContainer from './PaginatedListContainer';
import Loading from '../Loading';

const initialState = {
  page: 1,
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

    const { offset, limit, page } = this.state;

    const hasMore = await fetchListAction(search, filter, page, limit, offset);
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
    const { offset, limit, page } = this.state;

    const hasMore = await fetchListAction(search, filter, page, limit, offset);

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
      list,
      renderItem,
      numColumns,
      listStyle,
      contentContainerStyle,
      ListEmptyComponent,
      keyboardDismissMode,
      keyboardShouldPersistTaps,
      horizontal,
      showsHorizontalScrollIndicator
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
          horizontal={horizontal}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        />
      </View>
    );
  }
}

SearchablePaginatedList.defaultProps = {
  search: '',
  list: [
    { id: 0 }
  ],
  numColumns: 1,
  horizontal: false,
  showsHorizontalScrollIndicator: false
};

SearchablePaginatedList.propTypes = {
  list: PropType.arrayOf(PropType.shape({
    id: PropType.number
  })),
  renderItem: PropType.func.isRequired,
  fetchListAction: PropType.func.isRequired,
  search: PropType.string,
  numColumns: PropType.number,
  horizontal: PropType.bool,
  showsHorizontalScrollIndicator: PropType.bool
};

export default SearchablePaginatedList;
