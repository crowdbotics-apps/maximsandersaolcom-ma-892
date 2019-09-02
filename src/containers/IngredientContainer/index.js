import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import TagButton from '../../components/TagButton';
import ImageContainer from '../../components/ImageContainer';
import NutritionInfo from '../../components/NutritionInfo';
import ImageTitle from '../../components/ImageTitle';

const categoriesNames = ['HIGH PROTEIN', 'LOW CARB'];
const screenHeight = Dimensions.get('screen').height / 2.5;

const SECTIONS = [
  {
    itemQuantity: '5g',
    itemTitle: 'Fat'
  },
  {
    itemQuantity: '5g',
    itemTitle: 'Carbohydrates'
  },
  {
    itemQuantity: '5g',
    itemTitle: 'Protein'
  },
  {
    itemQuantity: '5g',
    itemTitle: 'Cortein'
  },
];

class IngredientContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeTitle: ''
    };
  }

  render() {
    const { recipeTitle } = this.state;
    const { navigation, scannedProduct } = this.props;
    const {
      name,
      thumb,
      calories,
      carbohydrate,
      fat,
      proteins
    } = scannedProduct;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          <View>
            <ImageContainer
              imageBackgroundStyleProp={{ height: screenHeight }}
              imageBackgroundUri={thumb || 'http://lorempixel.com/output/food-q-c-200-150-2.jpg'}
              navigation={navigation}
            />
            <ImageTitle
              mainContainerStyle={{ paddingBottom: 7 }}
              title={name || recipeTitle}
              firstItem={`${calories} calories per serving`}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <View style={styles.buttonWrapperSub}>
              <TagButton
                buttonContainerText={categoriesNames[0]}
                buttonContainerStyleProp={{ marginRight: 5, marginBottom: 0, marginTop: 0 }}
              />
              <TagButton
                buttonContainerText={categoriesNames[1]}
                buttonContainerStyleProp={{ marginBottom: 0, marginTop: 0, marginRight: 0 }}
              />
            </View>
            <View style={styles.findRecipesButtonContainer}>
              <TagButton
                buttonContainerText="Find Recipes"
                buttonContainerStyleProp={styles.findRecipesButton}
              />
            </View>
          </View>
          <View>
            <NutritionInfo
              expanded
              nutritionInfoTitle="Nutrition Information"
              nutritionInfoArray={SECTIONS}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  findRecipesButton: {
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: 'rgb(48, 124, 186)',
    paddingVertical: 15,
    borderRadius: 10,
  },
  findRecipesButtonContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 0
  },
  buttonWrapper: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  buttonWrapperSub: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  directionsTitle: {
    fontSize: 22,
    fontWeight: '400'
  },
  directionsContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  directionsInfo: {
    width: '100%',
    paddingHorizontal: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 10
  },
  directionsInfoSub: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subtitleText: {
    fontSize: 14,
    color: 'rgb(145, 145, 145)',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  subtitleBullet: {
    fontSize: 5,
    marginHorizontal: 10
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  }
});


const mapState = state => ({
  scannedProduct: state.nutrition && state.nutrition.scannedProduct,
});

export default connect(
  mapState
)(IngredientContainer);
