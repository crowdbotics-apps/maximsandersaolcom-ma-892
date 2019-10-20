import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

const trashCan = require('../../assets/trashCan.png');

const SwipeDeleteButton = ({ onDeleteClicked, data: { item, index }, rowMap }) => (
  <TouchableOpacity
    style={styles.hiddenButton}
    onPress={() => {
      rowMap[index].closeRow();
      onDeleteClicked(item);
    }}
  >
    <Image style={{ width: 40, height: 40 }} source={trashCan} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  hiddenButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    height: 70,
    alignItems: 'center',
    paddingRight: 15
  },
});

export default SwipeDeleteButton;
