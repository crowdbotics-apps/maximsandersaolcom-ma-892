import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ProfileContainer from '../../containers/ProfileContainer';
import * as profileActions from '../../redux/actions/profile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});
const ProfileScreen = () => {

  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      await dispatch(profileActions.getProfile());
      await dispatch(profileActions.getFavorites());
    } catch(err) {console.log(err)}
  };

  useEffect(() => {
    getProfile();
  }, []);


  return (
      <View style={styles.container}>
        <ProfileContainer />
      </View>
  );
};

export default ProfileScreen;
