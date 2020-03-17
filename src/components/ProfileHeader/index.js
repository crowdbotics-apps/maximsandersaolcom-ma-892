import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
    TouchableWithoutFeedback,
  StyleSheet,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import i18n from '../../i18n/i18n';

const backgroundImageDefault = require('../../assets/defaultBackgoundOnProfilePage.png');



const ProfileHeader = ({
  imageUrl,
  backgroundUrl,
  fullName,
  changeFullNameFuc,
  changeBackground,
  onAvatarChange
}) => (
  <View style={{ width: '100%' }}>
    <View style={{ width: '100%', height: 150 }}>
      <Image
        style={styles.backgroundImage}
        source={backgroundUrl !== '' ? { uri: backgroundUrl } : backgroundImageDefault}
      />
      <View
        style={styles.changeBackgroundContainer}
      >
        <TouchableOpacity
          style={styles.changeBackgroundButton}
          onPress={changeBackground}
        >
          <Text
            style={styles.changeBackgroundText}
          >
            {i18n.t('profileScreen.profileHeader.changeBackground')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View
      style={styles.profileWrapper}
    >
      <TouchableWithoutFeedback onPress={onAvatarChange}>
      <View
        style={styles.profileImageContainer}
      >
        <Image
          style={styles.profileImage}
          source={{ uri: imageUrl }}
        />
      </View>
      </TouchableWithoutFeedback>
      <TextInput
        style={styles.inputStyle}
        value={fullName}
        onChangeText={changeFullNameFuc}
      />
    </View>
  </View>
);

ProfileHeader.defaultProps = {
  imageUrl: '',
  backgroundUrl: '',
  fullName: '',
  changeFullNameFuc: () => {}
};

ProfileHeader.propTypes = {
  imageUrl: PropTypes.string,
  backgroundUrl: PropTypes.string,
  fullName: PropTypes.string,
  changeFullNameFuc: PropTypes.func
};

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
    backgroundColor: '#fff',
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
  },
  inputStyle: {
    marginLeft: 15,
    marginTop: 50,
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileWrapper: {
    marginTop: -30,
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default ProfileHeader;
