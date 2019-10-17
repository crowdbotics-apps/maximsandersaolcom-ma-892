import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import i18n from '../../i18n/i18n';
import Fonts from '../../assets/fonts';

const TouchableDeleteAll = ({ removeAllSelectedProductsAction }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => removeAllSelectedProductsAction()}>
        <Text style={styles.buttonText}>
          {i18n.t('todayScreen.deleteAllItems')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'red',
    fontSize: 15,
    fontFamily: Fonts.HELVETICA_MEDIUM
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default TouchableDeleteAll
