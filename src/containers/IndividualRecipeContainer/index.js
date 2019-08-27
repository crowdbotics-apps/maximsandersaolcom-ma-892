import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
// import Share from 'react-native-share';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import TagButton from '../../components/TagButton';
import ImageContainer from '../../components/ImageContainer';
import NutritionInfo from '../../components/NutritionInfo';
import ImageTitle from '../../components/ImageTitle';

const iconMyFav = require('../../assets/icon_favorites_white.png');
const iconShare = require('../../assets/icon_share.png');

const categoriesNames = ['HIGH PROTEIN', 'LOW CARB'];

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

class IndividualRecipeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeTitle: 'Beef Fajita with Sweet Bell Peppers',
      isCollapsed: true,
    };
  }

  componentDidMount() {
    // const shareOptions = {
    //   title: 'Share via',
    //   message: 'some message',
    //   url: 'some share url',
    //   social: Share.Social.INSTAGRAM,
    // };
    // Share.shareSingle(shareOptions);
  }

  collapseList = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  }

  render() {
    const { recipeTitle, isCollapsed } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          <View>
            <ImageContainer
              imageBackgroundUri="http://lorempixel.com/output/food-q-c-200-150-2.jpg"
              leftIcon={iconMyFav}
              rightIcon={iconShare}
              rightIconFunc={() => {}}
              leftIconFunc={() => {}}
              goBack
              navigation={navigation}
            />
            <ImageTitle
              title={recipeTitle}
              firstItem="20 Minutes"
              secondItem="320 calories per serving"
            />
            <HorizontalScrollView containerStyle={{ marginTop: 5, marginHorizontal: 15 }}>
              {categoriesNames.map((item, key) => (
                <TagButton
                  key={key} // eslint-disable-line
                  buttonContainerText={item}
                  buttonContainerTextStyle={{ color: 'black', fontSize: 12, fontWeight: '500' }}
                />
              ))}
            </HorizontalScrollView>
          </View>
          <NutritionInfo
            nutritionInfoTitle="Nutrition Information"
            collapseList={this.collapseList}
            nutritionInfoArray={SECTIONS}
            isCollapsed={isCollapsed}
          />
          <View style={styles.directionsInfo}>
            <View style={styles.directionsInfoSub}>
              <View><Text style={styles.directionsTitle}>Directions</Text></View>
            </View>
            <View style={styles.directionsContent}><Text>TBD</Text></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default IndividualRecipeContainer;
