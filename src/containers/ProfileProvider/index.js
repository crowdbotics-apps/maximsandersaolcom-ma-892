import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../../redux/modules/authReducer';

const mainActions = {
  logOut
};

class ProfileProvider extends React.Component {
  render() {
    const { children, profile, logOut: logOutAction } = this.props;
    return React.cloneElement(children, { screenProps: { profile, logOutAction } });
  }
}

const mapState = ({ auth = {} }) => ({
  profile: auth && auth.profile,
});

const mapActions = dispatch => bindActionCreators(mainActions, dispatch);

export default connect(mapState, mapActions)(ProfileProvider);
