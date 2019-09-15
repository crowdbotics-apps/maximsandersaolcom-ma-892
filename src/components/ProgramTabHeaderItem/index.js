import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';

const width = Dimensions.get('screen').width / 3.1;

const iconLearn = require('../../assets/icon_learn.png');

const ProgramTabHeader = ({ goToPage, activeTab, index }) => (
  <View
    style={{
      backgroundColor: 'white',
      marginTop: activeTab !== index ? 5 : 0,
      borderTopLeftRadius: activeTab === index ? 10 : 0,
      borderTopRightRadius: activeTab === index ? 10 : 0,
    }}
  >
    <TouchableOpacity
      onPress={() => goToPage(index)}
      style={[
        styles.touchButtonContainer,
        {
          marginTop: activeTab !== index ? 5 : 0,
          height: activeTab === index ? 70 : 60,
          backgroundColor: activeTab === index ? 'white' : 'rgb(242, 242, 242)',
        }
      ]}
    >
      <View style={styles.buttonContainer}>
        <View>
          <Text style={{ color: 'black', fontSize: 14 }}>{`Day ${index + 1}.`}</Text>
        </View>
        <View style={styles.iconContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={iconLearn}
              style={{ width: 15, height: 15 }}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={iconLearn}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  touchButtonContainer: {
    marginBottom: -10,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    width
  }
});

export default ProgramTabHeader;
