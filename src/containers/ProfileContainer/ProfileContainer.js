import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileStats from '../../components/ProfileStats';
import ProfileMenu from '../../components/ProfileMenu';

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
  }

  componentDidMount() {
    const { profile: { name: fullName } } = this.props;
    this.setState({
      fullName
    });
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
