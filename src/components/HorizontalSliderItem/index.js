import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet
} from 'react-native';
import Routes from '../../Routes';

const imagePlaceholder = 'https://via.placeholder.com/300x150.png?text=MAXIM+FITNESS';
const addToFav = require('../../assets/icon_my_favorites.png');

const HorizontalSliderItem = ({
  addToFavorites,
  item,
  navigation: {
    navigate
  },
  onClick
}) => (
  <TouchableOpacity
    onPress={() => {
      navigate(Routes.IndividualRecipeScreen);
      onClick();
    }}
    style={{ paddingHorizontal: 5 }}
  >
    <View style={styles.containerMain}>
      <ImageBackground
        source={{ uri: item.image_url || imagePlaceholder }}
        style={styles.backgroundImageStyle}
      >
        <TouchableOpacity onPress={addToFavorites}>
          <Image source={addToFav} style={styles.iconStyle} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.itemTitleStyle}>{item.name}</Text>
      </View>
      <View style={{ paddingRight: 5 }}>
        <Text>{`${item.time_to_prepare} min`}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  containerMain: {
    borderColor: 'rgb(214,213,213);',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.50,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 1,
  },
  backgroundImageStyle: {
    width: 200,
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 3,
    paddingBottom: 3
  },
  iconStyle: {
    width: 30,
    height: 30
  },
  textContainer: {
    paddingTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  itemTitleStyle: {
    paddingLeft: 5,
    fontWeight: '900'
  }
});

export default HorizontalSliderItem;