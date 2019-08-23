import React from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet
} from 'react-native';

const searchIcon = require('../../assets/icon_search.png');

const Search = ({
  searchString,
  searchFunc,
  placeHolderText,
  containerStyleProp,
  inputStyleProp,
  searchIconStyleProps,
  placeHolderTextColor
}) => (
  <View style={[styles.searchSection, containerStyleProp]}>
    <Image style={[styles.searchIcon, searchIconStyleProps]} source={searchIcon} />
    <TextInput
      style={[styles.input, inputStyleProp]}
      placeholderTextColor={placeHolderTextColor || 'black'}
      placeholder={placeHolderText}
      value={searchString}
      onChangeText={searchVal => searchFunc(searchVal)}
      underlineColorAndroid="transparent"
    />
  </View>
);

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10
  },
  searchIcon: {
    marginLeft: 20,
    padding: 10,
    width: 20,
    height: 20
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: 'black',
    fontSize: 18
  },
});

export default Search;
