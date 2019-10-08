import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import SearchableDropdown from '../SearchableDropDown';

const MealRegultorSearchWithIcon = ({
  selectedItems,
  setSelectedItems,
  searchForProducts,
  productItems,
  unsetSearchActive,
  resetValue,
  searchStringState
}) => (
  <SearchableDropdown
    searchStringState={searchStringState}
    resetValue={resetValue}
    selectedItems={selectedItems}
    onItemSelect={(item) => {
      setSelectedItems(item);
    }}
    unsetActiveSearch={unsetSearchActive}
    containerStyle={styles.containerStyle}
    onRemoveItem={(item) => {
      const items = selectedItems.filter(sitem => sitem.id !== item.id);
    }}
    itemStyle={styles.itemStyle}
    itemTextStyle={{ color: '#222' }}
    itemsContainerStyle={styles.itemsContainerStyle}
    items={productItems}
    defaultIndex={2}
    textInputProps={
      {
        placeholder: 'Search Foods and Products',
        underlineColorAndroid: 'transparent',
        style: styles.inputTextProps,
        value: searchStringState,
        onTextChange: (text) => {
          searchForProducts(text);
        }
      }
    }
    listProps={{
      nestedScrollEnabled: true,
      renderItem: ({ item }) => (
        <TouchableOpacity
          onPress={() => {
            unsetSearchActive();
            setSelectedItems(item);
          }}
        >
          <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 5, height: 45 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: item.thumb }} style={{ width: 35, height: 35 }} />
            </View>
            <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }}
  />
);
const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputTextProps: {
    padding: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    width: 250
  },
  itemsContainerStyle: {
    maxHeight: 200,
    backgroundColor: 'white',
    zIndex: 1
  },
  containerStyle: {
    position: 'absolute',
    top: -17,
    left: 0,
    flex: 1,
    width: 250
  }
});
export default MealRegultorSearchWithIcon;
