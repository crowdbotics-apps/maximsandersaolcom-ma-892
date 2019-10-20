import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HeaderWithSearch from '../../components/HeaderWithSearch';
import FreeForm from './FreeForm';
import Fonts from '../../assets/fonts';

const routes = [
  { key: 'freeForm', title: 'Free Form' },
  { key: 'restaurants', title: 'Restaurants' },
  { key: 'grocery', title: 'Grocery' },
  { key: 'history', title: 'History' },
];

const Restaurants = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const Grocery = () => (
  <View style={{ flex: 1, backgroundColor: '#32ff12' }} />
);
const History = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4500' }} />
);

const MealRegulatorContainer = ({
  getProductsBySearchStringAction,
  products,
  searchStringState,
  searchActive,
  setSelectedProductsAction,
  unsetSearchActiveAction,
  navigation
}) => {
  const mapSceneObject = {
    freeForm: FreeForm,
    restaurants: Restaurants,
    grocery: Grocery,
    history: History
  };

  const [tabViewIndex, setTabViewIndex] = React.useState(0);
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
          navigation={navigation}
        />
      </View>
      <View style={{ flex: 1, zIndex: 0 }}>
        <TabView
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicatorStyle}
              style={styles.tabContainerStyle}
              activeColor="black"
              inactiveColor="darkgray"
              tabStyle={styles.tabStyle}
              getLabelText={({ route }) => route.title}
              labelStyle={styles.labelStyle}
            />
          )}
          navigationState={{ index: tabViewIndex, routes }}
          renderScene={SceneMap(mapSceneObject)}
          onIndexChange={index => setTabViewIndex(index)}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    textTransform: 'none',
    fontFamily: Fonts.HELVETICA_MEDIUM
  },
  indicatorStyle: {
    backgroundColor: 'rgb(68, 161, 248)',
    fontSize: 14,
    textTransform: 'none'
  },
  tabContainerStyle: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    textTransform: 'none',
    zIndex: 0
  },
  tabStyle: {
    padding: 5,
    minHeight: 38,
    height: 38
  }
});

export default MealRegulatorContainer;
