import React from 'react';
import { View, StyleSheet } from 'react-native';
import FeedContainer from '../../containers/FeedContainer';
import { isIphoneX } from '../../utils/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: isIphoneX() ? 30 : 0
  }
});
const FeedScreen = () => (
  <View style={styles.container}>
    <FeedContainer />
  </View>
);
export default FeedScreen;
