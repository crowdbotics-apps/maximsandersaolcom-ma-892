import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import NutritionInfoItem from '../NutritionInfoItem';
import NoMoreItems from '../NoMoreItems';

const styles = StyleSheet.create({
  nutritionInfo: {
    width: '100%',
    paddingHorizontal: 15,
    borderBottomColor: 'lightgray',
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 5,
  },
  infoItemsIngredients: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: '100%',
  },
  infoItemsIngredientsSub: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  nutritionTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nutritionTitle: {
    fontSize: 22,
    fontWeight: '400'
  }
});

const backArrowIcon = require('../../assets/icon_arrow.png');

const NutritionInfo = ({
  nutritionContainerStyleProp,
  nutritionInfoTitle,
  expanded,
  titleContainerStyleProp,
  nutritionTitleStyleProp,
  nutritionInfoArray = [],
  isCollapsed,
  collapseList,
  fat,
  protein,
  carbohydrate
}) => (
  <View style={[styles.nutritionInfo, nutritionContainerStyleProp]}>
    <View style={[styles.nutritionTitleContainer, titleContainerStyleProp]}>
      <View>
        <Text style={[styles.nutritionTitle, nutritionTitleStyleProp]}>
          {nutritionInfoTitle}
        </Text>
      </View>
      {
        !expanded && (
          <View>
            <TouchableOpacity onPress={() => collapseList()}>
              <Image source={backArrowIcon} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          </View>
        )
      }
    </View>
    <View style={styles.infoItemsIngredients}>
      <View style={styles.infoItemsIngredientsSub}>
        <NutritionInfoItem
          itemQuantity={fat}
          itemTitle="Fat"
          infoItemsContainerStyle={{ flexBasis: '33%' }}
        />
        <NutritionInfoItem
          itemQuantity={carbohydrate}
          itemTitle="Carbohydrates"
          infoItemsContainerStyle={{ flexBasis: '33%' }}
        />
        <NutritionInfoItem
          itemQuantity={protein}
          itemTitle="Protein"
          infoItemsContainerStyle={{ flexBasis: '33%' }}
        />
        {/* {
          nutritionInfoArray && nutritionInfoArray.slice(0, 3).map(item => (
            <NutritionInfoItem
              itemQuantity={item.itemQuantity}
              itemTitle={item.itemTitle}
              infoItemsContainerStyle={{ flexBasis: '33%' }}
            />
          ))
        }
        {
          !expanded && (
            <Collapsible style={[styles.infoItemsIngredientsSub, { height: !expanded ? '98%' : null }]} collapsed={!expanded && isCollapsed}>
              {
                nutritionInfoArray.length > 3 ? (
                  <View style={styles.infoItemsIngredientsSub}>
                    {
                      nutritionInfoArray && nutritionInfoArray
                        .slice(3, nutritionInfoArray.length)
                        .map(item => (
                          <NutritionInfoItem
                            itemQuantity={item.itemQuantity}
                            itemTitle={item.itemTitle}
                            infoItemsContainerStyle={{ flexBasis: '33%' }}
                          />
                        ))
                    }
                  </View>
                ) : <NoMoreItems />
              }
            </Collapsible>
          )
        } */}
      </View>
    </View>
  </View>
);

export default NutritionInfo;
