import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import Share from 'react-native-share';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import TagButton from '../../components/TagButton';
import ImageContainer from '../../components/ImageContainer';
import NutritionInfo from '../../components/NutritionInfo';
import ImageTitle from '../../components/ImageTitle';
import {connect} from "react-redux";
import * as profileActions from "../../redux/actions/profile";
import {addRemoveFavorites} from "../../redux/modules/recipesReducer";

const imagePlaceholder = 'https://via.placeholder.com/300x150.png?text=MAXIM+FITNESS';
const iconShare = require('../../assets/icon_share.png');

const iconMyFav = require('../../assets/icon_favorites_white.png');
const addToFav = require('../../assets/icon_my_favorites.png');
const activeLike = require('../../assets/like.png');

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
    itemTitle: 'Fat'
  },
];

class IndividualRecipeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isFav: null,
    };
  }

  componentDidMount() {
    this.props.getfavorites();
  }


  collapseList = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  }

  shareOnSocialMedia = async (title, message, url) => {
    const options = {
      title: `Orum Training Application - ${title}`,
      message: `Orum Training Application - ${message}`,
      url,
    };
    try {
      await Share.open(options);
    } catch (err) {
      console.log('err on sharing', err);
    }
  }

  render() {
    const { isCollapsed, isFav } = this.state;
    const { navigation, recipeSelected } = this.props;
    const {
      id,
      calories,
      image_url: imageUrl,
      image,
      name,
      time_to_prepare: timeToPrepare,
      directions,
      protein,
      fat,
      carbohydrate,
      category
    } = recipeSelected;


    const fav = this.props.favorites.find((fav) => {
      return fav.id === id
    });

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          <View>
            <ImageContainer
              imageBackgroundUri={(image && imageUrl) || imagePlaceholder}
              leftIcon={ isFav || fav ? activeLike : iconMyFav}
              rightIcon={iconShare}
              rightIconFunc={() => {
                this.shareOnSocialMedia(name, name, imageUrl);
              }}
              leftIconFunc={() => {
                this.props.addRemoveFavorites(id);
                if(!fav) {
                  this.setState({isFav: true})
                }
                if(fav) {
                  this.setState({isFav: !this.state.isFav})
                }

              }}
              goBack
              navigation={navigation}
            />
            <ImageTitle
              title={name}
              firstItem={`${timeToPrepare} Minutes`}
              secondItem={`${calories} calories per serving`}
            />
            <HorizontalScrollView containerStyle={{ marginTop: 5, marginHorizontal: 15 }}>
              <TagButton
                buttonContainerText={category.name}
                buttonContainerTextStyle={{ color: 'black', fontSize: 12, fontWeight: '500' }}
              />
            </HorizontalScrollView>
          </View>
          <NutritionInfo
            expanded
            protein={protein}
            fat={fat}
            carbohydrate={carbohydrate}
            nutritionInfoTitle="Nutrition Information"
            collapseList={this.collapseList}
            nutritionInfoArray={SECTIONS}
            isCollapsed={isCollapsed}
          />
          <View style={styles.directionsInfo}>
            <View style={styles.directionsInfoSub}>
              <View><Text style={styles.directionsTitle}>Directions</Text></View>
            </View>
            <View style={styles.directionsContent}><Text>{directions}</Text></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.profile.favoriteRecipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getfavorites: () => dispatch(profileActions.getFavorites()),
    addRemoveFavorites: id => dispatch(addRemoveFavorites(id))
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(IndividualRecipeContainer);
