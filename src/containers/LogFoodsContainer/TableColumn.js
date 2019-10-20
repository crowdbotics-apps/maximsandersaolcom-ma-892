import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Fonts from '../../assets/fonts';

const TableColumn = ({ name, value, middle }) => {
  return (
    <View style={[styles.mainContainer, middle ? styles.middleContainer : {}]}>
      <View style={styles.innerContainer}>
        <Text style={styles.tableHeadRightText}>{`${value}g`}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.columnType}>{name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  middleContainer: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgb(200, 200, 200)',
    borderRightWidth: 1,
    borderRightColor: 'rgb(200, 200, 200)',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  innerContainer: {
    paddingHorizontal: 2,
    paddingVertical: 10,
  },
  tableHeadRightText: {
    color: 'rgb(70,162,248)',
    fontSize: 13,
    fontFamily: Fonts.HELVETICA_BOLD
  },
  columnType: {
    fontSize: 13,
    fontFamily: Fonts.HELVETICA_BOLD
  }
})

export default TableColumn;

