import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Fonts from "../../assets/fonts";

const SurveyQuestionText = props => (
  <Text style={styles.questionText}>{props.children}</Text>
);

const styles = StyleSheet.create({
  questionText: {
    fontSize: 28,
    fontFamily: Fonts.HELVETICA_BOLD,
    // fontWeight: 'bold',
    marginBottom: 15
  }
});

export default SurveyQuestionText;
