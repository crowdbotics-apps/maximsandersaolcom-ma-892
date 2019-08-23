import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import TagButton from '../../components/TagButton';
import ImageContainer from '../../components/ImageContainer';

const iconMyFav = require('../../assets/icon_my_favorites.png');


const categoriesNames = ['HIGH PROTEIN', 'LOW CARB'];

class IndividualRecipeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          <View>
            <ImageContainer
              imageBackgroundUri="http://lorempixel.com/output/food-q-c-200-150-2.jpg"
              leftIcon={iconMyFav}
              rightIcon={iconMyFav}
              rightIconFunc={() => {}}
              leftIconFunc={() => {}}
            />
            <View style={{ padding: 15 }}>
              <View>
                <Text style={{ fontSize: 23 }}>
                  Beef Fajita with Sweet Bell Peppers
                </Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>20 Minutes</Text>
                <Text style={[styles.subtitleText, styles.subtitleBullet]}>
                  {'\u2B24'}
                </Text>
                <Text style={styles.subtitleText}>320 calories per serving</Text>
              </View>
              <HorizontalScrollView containerStyle={{ marginTop: 10 }}>
                {categoriesNames.map(item => <TagButton buttonContainerText={item} buttonContainerTextStyle={{ color: 'black', fontSize: 12, fontWeight: '500' }} />)}
              </HorizontalScrollView>
            </View>
          </View>
          <View />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
