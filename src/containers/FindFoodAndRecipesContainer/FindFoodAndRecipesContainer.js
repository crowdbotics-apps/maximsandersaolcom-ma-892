import React, { Component } from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import Search from '../../components/Search';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import CategoryTagItem from '../../components/CategoryTagItem';
import CategoryHorizontalSlider from '../../components/CategoryHorizontalSlider';

const mealCategoryPlaceholder = ['Meal Prep', 'Vegan', 'Vegeterian', 'Gluten Free', 'Keto', 'Sushi', 'Gourman', 'Flat'];

const mealObject = {
  title: 'Beef Fajita',
  time: '20 min',
  liked: false,
  imageUrl: 'http://lorempixel.com/output/food-q-c-200-150-2.jpg'
};

const mealImageCarouselPlaceholder = [mealObject, mealObject, mealObject, mealObject, mealObject, mealObject, mealObject];


class FindFoodAndRecipesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
  }

  render() {
    const { searchString } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Search
            placeHolderText="Find Recipes"
            searchString={searchString}
            searchFunc={searchVal => this.setState({ searchString: searchVal })}
          />
        </View>
        <View style={{ marginTop: 15, marginBottom: 10 }}>
          <HorizontalScrollView containerStyle={{ marginHorizontal: 10 }}>
            {mealCategoryPlaceholder.map((item, key) => (
              <CategoryTagItem
                onPresFunc={() => {}}
                key={key} // eslint-disable-line
                tagText={item}
                tagTextContainerStyle={{ paddingHorizontal: 10 }}
              />
            ))}
          </HorizontalScrollView>
        </View>
        <ScrollView>
          <CategoryHorizontalSlider
            containerStyle={{ paddingTop: 15 }}
            data={mealImageCarouselPlaceholder}
            addToFavorites={() => {}}
            buttonContainerText="Proteins"
            buttonContainerStyleProp={{ backgroundColor: 'rgb(68, 161, 248)', marginLeft: 10 }}
          />
          <CategoryHorizontalSlider
            containerStyle={{ marginTop: 20 }}
            data={mealImageCarouselPlaceholder}
            addToFavorites={() => {}}
            buttonContainerText="Carbohydrate"
            buttonContainerStyleProp={{ backgroundColor: 'rgb(247, 225, 87)', marginLeft: 10 }}
          />
          <CategoryHorizontalSlider
            containerStyle={{ marginTop: 20 }}
            data={mealImageCarouselPlaceholder}
            addToFavorites={() => {}}
            buttonContainerText="Fibrous Foods"
            buttonContainerStyleProp={{ backgroundColor: 'rgb(129, 212, 83)', marginLeft: 10 }}
          />
        </ScrollView>
      </View>
    );
  }
}


export default FindFoodAndRecipesContainer;
