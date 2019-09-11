import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodayInfo = ({ weekNumber, dayNumber, description }) => (
  <View
    style={styles.programTodayContainer}
  >
    <View style={styles.programInfoContainer}>
      <View style={{ paddingRight: 10 }}>
        <Text>{`Week ${weekNumber}`}</Text>
      </View>
      <View>
        <Text>{`Day ${dayNumber}`}</Text>
      </View>
    </View>
    <View>
      <View>
        <Text>{description}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  programInfoContainer: {
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  programTodayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 25,
    width: '100%'
  }
});

export default TodayInfo;
