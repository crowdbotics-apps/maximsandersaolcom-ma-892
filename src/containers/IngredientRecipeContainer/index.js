import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  SafeAreaView
} from 'react-native';
import Search from '../../components/Search';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import CategoryTagItem from '../../components/CategoryTagItem';
import ImageContainer from '../../components/ImageContainer';
import ImageTitle from '../../components/ImageTitle';

const mealCategoryPlaceholder = ['Meal Prep', 'Vegan', 'Vegeterian', 'Gluten Free', 'Keto', 'Sushi', 'Gourman', 'Flat'];

const screenHeight = Dimensions.get('screen').height / 4;

const mealObject = {
  title: 'Lean Stuffed Peppers',
  time: '20 min',
  calories: '220 calories',
  liked: false,
  imageUrl: 'http://lorempixel.com/output/food-q-c-200-150-2.jpg'
};

const mealObject1 = {
  title: 'Ground Beef and Quinoa Bowl',
  time: '20 min',
  calories: '220 calories',
  liked: false,
  imageUrl: 'http://lorempixel.com/output/food-q-c-640-480-8.jpg'
};

const mealImageCarouselPlaceholder = [mealObject, mealObject1, mealObject];


class IngredientRecipeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
  }

  render() {
    const { searchString } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
          {mealImageCarouselPlaceholder && mealImageCarouselPlaceholder.map(item => (
            <View style={{ paddingTop: 15 }}>
              <ImageTitle
                title={item.title}
                mainContainerStyle={{ padding: 0, paddingHorizontal: 15 }}
              />
              <ImageContainer
                imageBackgroundStyleProp={{ height: screenHeight }}
                imageBackgroundUri={item.imageUrl}
              />
              <ImageTitle
                mainContainerStyle={{ padding: 0, paddingHorizontal: 15 }}
                titleContainerStyle={{ display: 'none' }}
                firstItem={item.time}
                secondItem={item.calories}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}


export default IngredientRecipeContainer;
