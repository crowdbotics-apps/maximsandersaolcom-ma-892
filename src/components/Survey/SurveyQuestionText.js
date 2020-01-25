import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SurveyQuestionText = props => (
  <Text style={styles.questionText}>{props.children}</Text>
);

const styles = StyleSheet.create({
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15
  }
});

export default SurveyQuestionText;
