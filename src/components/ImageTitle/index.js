import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ImageTitle = ({
  title,
  titleContainerStyle,
  mainContainerStyle,
  subtitleContainerStyle,
  firstItem,
  secondItem
}) => (
  <View style={[{ padding: 15 }, mainContainerStyle]}>
    <View style={titleContainerStyle}>
      <Text style={{ fontSize: 23 }}>{title}</Text>
    </View>
    <View style={[styles.subtitleContainer, subtitleContainerStyle]}>
      { firstItem && <Text style={styles.subtitleText}>{firstItem}</Text> }
      {
        secondItem && (
          <Text style={[styles.subtitleText, styles.subtitleBullet]}>
            {'\u2B24'}
          </Text>
        )
      }
      { secondItem && <Text style={styles.subtitleText}>{secondItem}</Text>}
    </View>
  </View>
);

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

export default ImageTitle;
