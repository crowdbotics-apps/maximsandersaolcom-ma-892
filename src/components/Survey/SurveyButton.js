import React from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const SurveyButton = props => (
  <View style={styles.container}>
    <TouchableOpacity style={{ width: '100%', maxWidth: 320 }} disabled={props.disabled} onPress={props.onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={props.disabled ? ['#d3d3d3', '#d3d3d3'] : ['#3180BD', '#6EC2FA']}
        style={styles.linearGradient}
      >

        <Text style={styles.buttonText}>Next</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '600',
    color: '#fff'
  }
});

export default SurveyButton;
