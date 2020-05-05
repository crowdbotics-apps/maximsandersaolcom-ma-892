import React from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity
} from 'react-native';
import SurveyRow from './SurveyRow';
import Arrow from '../../assets/survey-chevron-left.png';
import Fonts from "../../assets/fonts";

const SurveyQuestionOption = ({onPress, isSelected, children ,description }) => (
  <TouchableOpacity onPress={onPress}>
    <SurveyRow style={[styles.row, isSelected ? {borderWidth: 0.5, borderColor: '#3180BD'} : { borderBottomColor: '#d3d3d3'}]}>
      <View style={{maxWidth: '75%'}}>
        <Text style={[styles.option, description && styles.titleHasDescription]}>{children}</Text>
        { description ? <Text>{description}</Text> : null}
      </View>
      <Image
        style={styles.arrow}
        source={Arrow}
        resizeMode="contain"
      />
    </SurveyRow>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
  },
  option: {
    fontSize: 18,
    fontFamily: Fonts.HELVETICA_MEDIUM,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    width: 30,
    height: 30
  },
  titleHasDescription: {
    fontWeight: 'bold',
    marginBottom: 8
  }
});

export default SurveyQuestionOption;
