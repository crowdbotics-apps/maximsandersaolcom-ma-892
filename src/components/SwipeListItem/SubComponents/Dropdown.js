import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

const dropdownIcon = require('../../../assets/dropdownTriangle.png');

const SubDropDown = ({onSelect, measure, item, options }) => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Dropdown
      renderAccessory={() => (
        <Image source={dropdownIcon} style={styles.dropdownImage} />
      )}
      containerStyle={{width: 100}}
      inputContainerStyle={{ borderBottomColor: 'transparent' }}
      labelExtractor={({name}) => name}
      valueExtractor={({name}) => name}
      value={item.measure === null ? '' : item.measure.name}
      label="Choose..."
      data={options}
      onChangeText={(args, index, data) => {
        onSelect(item, 'measure', data[index]);
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  dropdownButtonText: {
    fontSize: 14,
    color: 'black',
  },
  dropdownImage: {
    width: 20,
    height: 20
  },
  modalButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  dropdownTextStyle: {
    fontSize: 14,
    color: 'black'
  },
  dropdownStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    flexDirection: 'row'
  },
  dropdownContainer: {
    // paddingTop: 40,
    // alignItems: "center",
    // width: 100,
  },
});

export default SubDropDown;
