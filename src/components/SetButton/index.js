import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const iconDoneProgram = require('../../assets/icon_program_done.png');

const SetButton = ({ setItem, onClick }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={() => onClick()}>
    {setItem.done && (
      <View style={styles.iconContainer}>
        <Image source={iconDoneProgram} style={styles.iconStyle} />
      </View>
    )}
    <View style={styles.buttonText}>
      <Text>{`Set ${setItem.set_no}`}</Text>
    </View>
    {setItem.done && (
      <View style={styles.iconContainer}>
        <View style={styles.iconStyle} />
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    width: '32%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgb(242, 242, 242)',
    borderRadius: 10,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: { width: 20, height: 20 },
  buttonText: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SetButton;
