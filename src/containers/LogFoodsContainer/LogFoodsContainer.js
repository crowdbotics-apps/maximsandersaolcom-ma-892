import React from 'react';
import {
  View,
  SafeAreaView,
  // StyleSheet,
  Text
} from 'react-native';
import HeaderWithSearch from '../../components/HeaderWithSearch';

const LogFoodsContainer = ({
  getProductsBySearchStringAction,
  products,
  searchStringState,
  searchActive,
  setSelectedProductsAction,
  unsetSearchActiveAction
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ zIndex: 1 }}>
        <HeaderWithSearch
          searchStringState={searchStringState}
          productItems={products}
          setSearchString={getProductsBySearchStringAction}
          setSelectedItems={setSelectedProductsAction}
          resetValue={searchActive}
          unsetSearchActive={unsetSearchActiveAction}
        />
      </View>
      <View style={{ flex: 1, zIndex: 0 }}>
        <Text>JOJO</Text>
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});

export default LogFoodsContainer;
