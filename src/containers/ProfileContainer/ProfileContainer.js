import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileStats from '../../components/ProfileStats';
import ProfileMenu from '../../components/ProfileMenu';
import SessionService from '../../services/SessionService';
import WeekHelper from '../../utils/WeekHelper';

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    width: '100%'
  },
});

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
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
  }

  changeFullName = value => this.setState({ fullName: value })

  render() {
    const { fullName } = this.state;
    const { profile: { imageUrl } } = this.props;
    return (
      <View style={styles.containerCenter}>
        <ProfileHeader
          imageUrl={imageUrl}
          backgroundUrl="" // empty string set default image
          fullName={fullName}
          changeFullNameFuc={this.changeFullName}
        />
        <ProfileStats followers={0} following={0} friends={0} />
        <ProfileMenu />
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

export default ProfileContainer;
