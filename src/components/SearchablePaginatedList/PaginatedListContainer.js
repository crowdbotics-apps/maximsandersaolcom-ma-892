import React, { useState } from 'react';
import {
  FlatList,
  View,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Loading from '../Loading';

const Loader = Platform.select({
  ios: () => <View style={{ paddingTop: 10 }}><Loading /></View>,
  android: () => <Loading />
});

const PaginatedListContainer = ({
  list,
  refreshing,
  handleRefreshFunc,
  renderItem,
  numColumns,
  hasMore,
  style,
  refreshingTop,
  refreshListToInitial,
  contentContainerStyle,
  ListEmptyComponent,
  keyboardDismissMode,
  keyboardShouldPersistTaps,
  horizontal,
  showsHorizontalScrollIndicator
}) => (
  <FlatList
    keyboardDismissMode={keyboardDismissMode}
    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
    refreshing={refreshingTop}
    onRefresh={refreshListToInitial}
    data={list}
    scrollsToTop={false}
    onEndReached={handleRefreshFunc}
    renderItem={renderItem}
    numColumns={numColumns}
    style={style}
    contentContainerStyle={contentContainerStyle}
    ListFooterComponent={() => (
      <View>
        { refreshing ? <Loader /> : <View style={{ height: hasMore ? 40 : 8 }} /> }
      </View>
    )}
    keyExtractor={item => `${item.id}`}
    onEndReachedThreshold={0.5}
    ListEmptyComponent={ListEmptyComponent}
    horizontal={horizontal}
    showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
  />
);

PaginatedListContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  handleRefreshFunc: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  numColumns: PropTypes.number.isRequired,
  refreshingTop: PropTypes.bool,
  refreshListToInitial: PropTypes.func,
  horizontal: PropTypes.bool,
  showsHorizontalScrollIndicator: PropTypes.bool,
};

PaginatedListContainer.defaultProps = {
  refreshing: false,
  refreshingTop: false,
  refreshListToInitial: () => {},
  horizontal: false,
  showsHorizontalScrollIndicator: false
};

export default PaginatedListContainer;
