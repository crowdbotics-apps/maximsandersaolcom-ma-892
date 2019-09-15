import React from 'react';
import {
  SafeAreaView,
  View,
  Text
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import ExerciseTabHeader from '../../components/ExerciseTabHeader';

const data = [
  { id: 1, title: 'Barbell Bicep Curl', image_url: 'http://lorempixel.com/output/sports-q-c-480-480-3.jpg', done: true, },
  { id: 2, title: 'Dumbell Bicep Curl', image_url: 'http://lorempixel.com/output/sports-q-c-480-480-3.jpg', done: false },
  { id: 3, title: 'Overhead Tricep Extension', image_url: 'http://lorempixel.com/output/sports-q-c-480-480-3.jpg', done: false }
];

const ExerciseContainer = ({ navigation, navigation: { toggleDrawer } }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <HeaderForDrawer
      navigation={navigation}
      headerNavProp={{ paddingBottom: 50 }}
      onDrawerButtonPress={() => {
        toggleDrawer();
      }}
    />
    <ScrollableTabView
      style={{ backgroundColor: 'white', flex: 1 }}
      renderTabBar={props => (
        <ExerciseTabHeader {...props} />
      )}
    >
      {
        data.map(item => (
          <View
            tabLabel={item}
            style={{ flex: 1 }}
          >
            <Text>{`Test ${item.title}`}</Text>
          </View>
        ))
      }
    </ScrollableTabView>
  </SafeAreaView>
);

export default ExerciseContainer;
