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

const iconDone = require('../../assets/icon_program_done.png');

const ExcerciseTabHeaderItem = ({
  goToPage,
  activeTab,
  index,
  item,
}) => (
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
        {
          item.done ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image source={iconDone} style={{ width: 20, height: 20 }} />
            </View>
          ) : null
        }
        <View
          style={{
            flex: item.done ? 2 : 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: item.done ? 0 : 10,
            paddingRight: 10,
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              textAlign: 'center'
            }}
            ellipsizeMode="tail"
            numberOfLines={3}
          >
            {`${index + 1}. ${item.title}`}
          </Text>
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
    height: 60,
    flexDirection: 'row',
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

export default ExcerciseTabHeaderItem;
