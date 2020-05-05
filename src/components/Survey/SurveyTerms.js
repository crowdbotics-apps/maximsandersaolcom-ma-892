import React from 'react';
import { Text, StyleSheet } from 'react-native';


const SurveyTerms = props => (
  <Text style={styles.text}>
I agree to Orum Training's
    <Text
      style={styles.link}
      onPress={() => {
      }}
    >
      {' '}
Privacy Policy
    </Text>
    {' '}
and
    <Text
      style={styles.link}
      onPress={() => {
      }}
    >
Terms of Use
    </Text>
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: '500'
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000'
  }
});

export default SurveyTerms;
