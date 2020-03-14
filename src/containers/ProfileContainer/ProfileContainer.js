import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileStats from '../../components/ProfileStats';
import ProfileMenu from '../../components/ProfileMenu';
import WeekHelper from '../../utils/WeekHelper';
import Fonts from '../../assets/fonts';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import * as profileActions from '../../redux/actions/profile';


const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    width: '100%'
  },
  labelStyle: {
    fontSize: 14,
    textTransform: 'none',
    fontFamily: Fonts.HELVETICA_MEDIUM
  },
  indicatorStyle: {
    backgroundColor: 'rgb(1, 62, 245)',
    fontSize: 14,
    textTransform: 'none'
  },
  tabContainerStyle: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    textTransform: 'none',
    zIndex: 0
  },
  tabStyle: {
    padding: 5,
    minHeight: 38,
    height: 38
  }
});

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      currentTab: 0
    };
    const { profile: { email, id } } = props;
    this.weekHelper = new WeekHelper(id, email, this.onAppChangeCheckWeekNumber);
  }

  componentDidMount() {
    const { profile: { name: fullName, id, email }, calculateWeekNumberAction } = this.props;
    this.weekHelper.checkIsExisting(id)
      .then((isExisting) => {
        if (!isExisting) {
          this.weekHelper.addToStorage(id, email, new Date());
          return calculateWeekNumberAction({ id, userEmail: email, date: new Date() });
        }
        return calculateWeekNumberAction(isExisting);
      });
    this.setState({
      fullName
    });
  }

  componentWillUnmount() {
    this.weekHelper.removeAll();
  }

  onAppChangeCheckWeekNumber = (objFromStorage) => {
    const { profile: { id, email }, calculateWeekNumberAction } = this.props;
    if (objFromStorage) {
      this.weekHelper.checkIsExisting(id)
        .then((isExisting) => {
          if (!isExisting) {
            this.weekHelper.addToStorage(id, email, new Date());
            return calculateWeekNumberAction({ id, userEmail: email, date: new Date() });
          }
          return calculateWeekNumberAction(isExisting);
        });
    }
  };

  changeFullName = value => this.setState({ fullName: value })

  setCurrentTab = currentTab => this.setState({ currentTab });

  renderOverview = () => (
    <View style={{ flex: 1, marginTop: 10 }}>
      <ProfileMenu />
    </View>
  );

  // verifyPermissions = async () => {
  //   const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
  //
  //   if (result.status !== 'granted') {
  //     Alert.alert('Grant permissions', null, [{ text: 'Okay' }]);
  //     return false;
  //   }
  //   return true;
  // };
  //
  // pickImage = async () => {
  //   const hasPermission = await verifyPermissions();
  //
  //   if (!hasPermission) {
  //     return
  //   }
  //
  //   const image = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     mediaTypes: 'Images',
  //   });
  //
  //   setImage(image.uri);
  // };


  changeBg = () => {

  };

  render() {
    const { fullName, currentTab } = this.state;
    const { profile: { imageUrl }, profileData } = this.props;
    // const routes = [
    //   { key: 'overview', title: 'Overview' },
    //   { key: 'myProfile', title: 'My Profile' },
    // ];
    // const mapSceneObject = {
    //   overview: () => this.renderOverview(),
    //   myProfile: () => <View style={{ backgroundColor: 'white', flex: 1 }}></View>,
    // };

    return (
      <View style={styles.containerCenter}>
        <ProfileHeader
          imageUrl={imageUrl}
          backgroundUrl="" // empty string set default image
          fullName={fullName}
          changeFullNameFuc={this.changeFullName}
          changeBackground={() => {}}
        />
        <ProfileStats followers={0} following={0} friends={0} />
        {/*<TabView*/}
        {/*  renderTabBar={props => (*/}
        {/*    <TabBar*/}
        {/*      {...props}*/}
        {/*      indicatorStyle={styles.indicatorStyle}*/}
        {/*      style={styles.tabContainerStyle}*/}
        {/*      activeColor="black"*/}
        {/*      inactiveColor="darkgray"*/}
        {/*      tabStyle={styles.tabStyle}*/}
        {/*      getLabelText={({ route }) => route.title}*/}
        {/*      labelStyle={styles.labelStyle}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*  navigationState={{ index: currentTab, routes }}*/}
        {/*  renderScene={SceneMap(mapSceneObject)}*/}
        {/*  onIndexChange={index => this.setCurrentTab(index)}*/}
        {/*  initialLayout={{ width: Dimensions.get('window').width, flex: 1 }}*/}
        {/*  contentContainerStyle={{ flex: 1 }}*/}
        {/*/>*/}

        {this.renderOverview()}

        {/* <ProfileMenu /> */}
      </View>
    );
  }
}

ProfileContainer.defaultProps = {
  profile: {
    imageUrl: ''
  }
};

ProfileContainer.propTypes = {
  profile: PropTypes.shape({
    imageUrl: PropTypes.string
  }),
};

const mapStateToProps = state => {
  return {
    profileData: state.state.profile.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeBackgroundImage: () => dispatch(profileActions.changeBackgroundImage()),
    changeAvatarImage: () => dispatch(profileActions.changeAvatarImage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
