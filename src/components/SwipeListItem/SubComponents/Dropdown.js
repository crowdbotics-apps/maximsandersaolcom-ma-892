import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';

const dropdownIcon = require('../../../assets/dropdownTriangle.png');

const DEMO_OPTIONS_1 = ['Large', 'Cup', 'TBSP'];

const SubDropDown = ({ onSelect, measure, item }) => (
    <ModalDropdown
    style={styles.dropdownContainer}
    options={DEMO_OPTIONS_1}
    dropdownStyle={styles.dropdownStyle}
    dropdownTextStyle={styles.dropdownTextStyle}
    onSelect={(idx, value) => {
      onSelect(item, 'measure', value)
    }}
  >
    <View style={styles.modalButtonStyle}>
      <View style={{ flex: 3 }}>
        <Text style={styles.dropdownButtonText} numberOfLines={1}>
          {measure || 'Choose...'}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image source={dropdownIcon} style={styles.dropdownImage}/>
      </View>
      
    </View>
  </ModalDropdown>
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
    width: 110,
    maxWidth: 110,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default SubDropDown;
