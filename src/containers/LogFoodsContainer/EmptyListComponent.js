import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Fonts from '../../assets/fonts';

const EmptyListComponent = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>No Products Selected</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyListContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListText: {
    fontFamily: Fonts.HELVETICA_MEDIUM,
    color: 'black',
    fontSize: 17
  }
})

export default EmptyListComponent
