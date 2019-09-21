import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
import i18n from '../../i18n/i18n';
import Routes from '../../Routes';

const iconOverview = require('../../assets/icon_overview.png');
const iconDetails = require('../../assets/icon_details.png');
const iconDoneProgram = require('../../assets/icon_program_done.png');

const renderItem = (item, index, navigation, pickSession, overviewData) => (
  <TouchableOpacity
    style={item.done ? styles.itemTouchableDone : styles.itemTouchable}
    disabled={item.done}
    onPress={() => {
      pickSession(item, overviewData);
      navigation.navigate(Routes.ExerciseScreen);
    }}
  >
    <View
      style={styles.itemWrapper}
    >
      <View style={styles.imageItemWrapper}>
        <Image
          source={{ uri: item.exercise.pictures[0].image_url }}
          style={{ width: 55, height: 50 }}
        />
      </View>
      <View style={styles.textItemWrapper}>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={styles.textItem}
        >
          {`${index + 1}. ${item.exercise.name}`}
        </Text>
      </View>
      {
        item.done ? (
          <View
            style={styles.doneWrapperImage}
          >
            <Image
              source={iconDoneProgram}
              style={styles.doneIcon}
            />
          </View>
        ) : null
      }
    </View>
  </TouchableOpacity>
);

const emptyList = () => (
  <View>
    <Text>Empty List</Text>
  </View>
);

const CustomProgramTabs = ({
  overviewData = {},
  detailsData = {},
  navigation,
  pickSession
}) => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setActiveTab(1)}
        >
          <View
            style={[
              styles.tabButtonsContainer,
              {
                borderBottomColor: activeTab === 1 ? 'rgb(1, 62, 245)' : 'rgb(255, 255, 255)',
                opacity: activeTab === 1 ? 1 : 0.3
              }
            ]}
          >
            <Image
              source={iconOverview}
              style={styles.iconTabs}
            />
            <Text style={styles.buttonText}>
              {i18n.t('programScreen.customTab.overview')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setActiveTab(2)}
        >
          <View
            style={[
              styles.tabButtonsContainer,
              {
                borderBottomColor: activeTab === 2 ? 'rgb(1, 62, 245)' : 'rgb(255, 255, 255)',
                opacity: activeTab === 2 ? 1 : 0.3
              }
            ]}
          >
            <Image
              source={iconDetails}
              style={styles.iconTabs}
            />
            <Text style={styles.buttonText}>
              {i18n.t('programScreen.customTab.details')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      { activeTab === 1 ? (
        <SearchablePaginatedList
          style={{ flex: 1 }}
          ListEmptyComponent={emptyList}
          contentContainerStyle={styles.searchableContent}
          list={overviewData}
          fetchListAction={() => {}}
          renderItem={({ item, index }) => renderItem(item, index, navigation, pickSession, overviewData)}
          search={''}
          filter={''}
          numColumns={2}
        />
      ) : (
        <View
          style={{
            backgroundColor: 'rgb(242,242,242)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>Some text here!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 2
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  itemTouchable: {
    width: '50%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  itemTouchableDone: {
    width: '50%',
    paddingHorizontal: 10,
    marginBottom: 20,
    opacity: 0.4
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  imageItemWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  textItemWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textItem: {
    textAlign: 'left',
    fontSize: 13
  },
  iconTabs: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  searchableContent: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: 'rgb(242,242,242)'
  },
  doneWrapperImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneIcon: {
    width: 40,
    height: 40,
  }
});

export default CustomProgramTabs;
