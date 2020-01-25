import React from 'react';
import {
  Text, StyleSheet, Image, TouchableOpacity
} from 'react-native';
import SurveyRow from './SurveyRow';
import Arrow from '../../assets/icon_chevron_left_gray.png';

const SurveyQuestionOption = props => (
  <TouchableOpacity onPress={props.onPress}>
    <SurveyRow style={styles.row}>
      <Text style={styles.option}>{props.children}</Text>
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
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    width: 30,
    height: 30
  },
});

export default SurveyQuestionOption;
