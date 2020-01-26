import React from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity
} from 'react-native';
import SurveyRow from './SurveyRow';
import Arrow from '../../assets/survey-chevron-left.png';
import Fonts from "../../assets/fonts";

const SurveyQuestionOption = props => (
  <TouchableOpacity onPress={props.onPress}>
    <SurveyRow style={[styles.row, props.isSelected && {backgroundColor: 'pink'}]}>
      <View>
        <Text style={[styles.option, props.description && styles.titleHasDescription]}>{props.children}</Text>
        { props.description ? <Text>{props.description}</Text> : null}
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
    borderBottomColor: '#d3d3d3'
  },
  option: {
    fontSize: 20,
    fontFamily: Fonts.HELVETICA_MEDIUM,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    width: 30,
    height: 30
  },
  titleHasDescription: {
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default SurveyQuestionOption;
