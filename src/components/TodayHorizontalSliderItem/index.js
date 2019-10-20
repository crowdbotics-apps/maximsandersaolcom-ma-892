import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const imagePlaceholder = 'https://via.placeholder.com/300x150.png?text=MAXIM+FITNESS';

const TodayHorizontalSliderItem = ({
  item,
  index,
  onClick
}) => (
  <TouchableOpacity
    onPress={() => {
      onClick();
    }}
    style={{ width: 120, maxWidth: 120, marginHorizontal: 5 }}
  >
    <View style={styles.containerMain}>
      <Image
        source={{ uri: item.exercise.pictures[0].image_url || imagePlaceholder }}
        style={styles.backgroundImageStyle}
      />
    </View>
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.itemTitleStyle}>{`${index + 1}. ${item.exercise.name}`}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  containerMain: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    maxWidth: 120,
    width: 120,
    height: 120
  },
  backgroundImageStyle: {
    width: 120,
    height: 100,
    paddingRight: 3,
    paddingBottom: 3
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  itemTitleStyle: {
    fontWeight: '400',
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

export default TodayHorizontalSliderItem;
