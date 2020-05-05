import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SurveyQuestionDescription = props => (
  <Text style={styles.questionDescription}>{props.children}</Text>
);

const styles = StyleSheet.create({
  questionDescription: {
    fontSize: 16,
    marginBottom: 25
  }
});

export default SurveyQuestionDescription;
