import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
  changeBackgroundContainer: {
    position: 'absolute',
    right: 30,
    top: 50,
  },
  changeBackgroundButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: 'rgba(98, 98, 98, 0.3)'
  },
  changeBackgroundText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500'
  },
  profileImageContainer: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    borderRadius: 100 / 2,
    width: 100,
    height: 100
  }
});

const ProfileHeader = ({ imageUrl, backgroundUrl }) => (
  <View style={{ width: '100%' }}>
    <View style={{ width: '100%', height: 150 }}>
      <Image
        style={styles.backgroundImage}
        source={{ uri: backgroundUrl }}
      />
      <View
        style={styles.changeBackgroundContainer}
      >
        <TouchableOpacity
          style={styles.changeBackgroundButton}
        >
          <Text style={styles.changeBackgroundText}>Change Background</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={{ marginTop: -30, marginLeft: 10 }}>
      <View
        style={styles.profileImageContainer}
      >
        <Image
          style={styles.profileImage}
          source={{ uri: imageUrl }}
        />
      </View>
    </View>
  </View>
);

export default ProfileHeader;
