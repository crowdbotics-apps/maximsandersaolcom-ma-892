import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ListView
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import SwipeListItem from '../../components/SwipeListItem';
import SwipeDeleteButton from '../../components/SwipeDeleteButton';
import GradientButton from '../../components/GradientButton';
import i18n from '../../i18n/i18n';
import EmptyListComponent from './EmptyListComponent';
import TableColumn from './TableColumn';
import TouchableDeleteAll from './TouchableDeleteAll';


import HeaderWithSearch from '../../components/HeaderWithSearch';
import Fonts from '../../assets/fonts';

const LogFoodsContainer = ({
  getProductsBySearchStringAction,
  products,
  searchStringState,
  searchActive,
  setSelectedProductsAction,
  unsetSearchActiveAction,
  selectedProducts,
  selectedProductsStats: {
    calories,
    carbohydrate,
    proteins,
    fat
  },
  removeSelectedProductsAction,
  editSelectedProductsAction,
  removeAllSelectedProductsAction
}) => {
  const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return (
    <SafeAreaView style={styles.safeArea}>
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
      <View style={styles.mainSwipeContainer}>
        <View style={styles.swipeHeaderContainer}>
          <Text style={styles.swipeHeaderText}> Swipe left to delete </Text>
        </View>
        <SwipeListView
          data={selectedProducts}
          keyExtractor={(item, index) => index.toString()}
          disableRightSwipe
          closeOnScroll
          closeOnRowOpen
          renderItem={({ item, index }) => (
            <SwipeListItem item={item} editSelectedProductsAction={editSelectedProductsAction} index={index} />
          )}
          renderHiddenItem={(data, rowMap) => (
            <SwipeDeleteButton data={data} rowMap={rowMap} onDeleteClicked={removeSelectedProductsAction} />
          )}
          leftOpenValue={0}
          rightOpenValue={-75}
          ListEmptyComponent={() => (<EmptyListComponent />)}
        />
      </View>
      <View style={{ width: '100%' }}>
        <View style={styles.tableCaloriesTotal}>
          <View style={styles.tableHeadSub}>
            <Text style={styles.tableHeadLeft}>
              Total calories
            </Text>
          </View>
          <View style={styles.tableHeadSub}>
            <Text style={styles.tableHeadRightText}>{calories || 0}</Text>
          </View>
        </View>
        <View style={styles.tableColumnContainer}>
          <TableColumn name="Proteins" value={proteins} />
          <TableColumn name="Carbs" value={carbohydrate} middle />
          <TableColumn name="Fat" value={fat} />
        </View>
      </View>
      <View style={styles.gradientButtonContainer}>
        <GradientButton
          buttonContainerText={i18n.t('todayScreen.logFoods')}
          buttonContainerStyleProp={styles.findRecipesButtonContainer}
          buttonContainerTextStyle={styles.buttonContainerTextStyle}
          buttonContentContainerProp={{ paddingBottom: 0 }}
          colorsGradient={['#3180BD', '#6EC2FA']}
          onPress={() => {}}
        />
      </View>
      <TouchableDeleteAll removeAllSelectedProductsAction={removeAllSelectedProductsAction} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradientButtonContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white'
  },
  findRecipesButtonContainer: {
    width: '90%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 0,
    paddingBottom: 15,
    borderRadius: 10,
    marginRight: 0,
    marginBottom: 0
  },
  buttonContainerTextStyle: {
    fontSize: 21,
    fontWeight: 'normal',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  tableColumnContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'rgb(200, 200, 200)',
    borderBottomWidth: 1
  },
  tableHeadSub: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeadRightText: {
    color: 'rgb(70,162,248)',
    fontSize: 13,
    fontFamily: Fonts.HELVETICA_BOLD
  },
  tableHeadLeft: {
    fontFamily: Fonts.HELVETICA_NORMAL,
    fontSize: 15,
    color: 'black'
  },
  tableCaloriesTotal: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(228,227,229)',
    flexDirection: 'row',
    borderBottomColor: 'rgb(200, 200, 200)',
    borderBottomWidth: 1,
    borderTopColor: 'rgb(200, 200, 200)',
    borderTopWidth: 1
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  mainSwipeContainer: {
    minHeight: 200
  },
  swipeHeaderText: {
    fontSize: 14,
    color: 'rgb(224, 224, 224)'
  },
  swipeHeaderContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
});

export default LogFoodsContainer;
