import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import HeaderWithSearch from '../../components/HeaderWithSearch';

const data = [
  { id: 1, name: 'baki' },
  { id: 2, name: 'vlada' },
  { id: 3, name: 'mika' },
  { id: 4, name: 'stojan' },
  { id: 5, name: 'dzoni' },
  { id: 6, name: 'lukas' },
];

const LogFoodsContainer = ({
  getProductsBySearchStringAction,
  products,
  searchStringState,
  searchActive,
  setSelectedProductsAction,
  unsetSearchActiveAction
}) => (
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
      <SwipeListView
        data={data}
        disableRightSwipe
        renderItem={({ item }, rowMap) => (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'blue',
              height: 70,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text>
              {item.name}
            </Text>
            <Text>
              Swip to left
            </Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: 'red',
              justifyContent: 'flex-end',
              height: 70,
              alignItems: 'center',
              paddingRight: 15
            }}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        )}
        leftOpenValue={0}
        rightOpenValue={-75}
      />
    </View>
  </SafeAreaView>
);

// const styles = StyleSheet.create({});

export default LogFoodsContainer;
