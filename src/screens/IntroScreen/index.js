import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from '../../i18n/i18n';

import { testAction } from '../../redux/modules/authReducer';


const mainActions = {
  testAction
};

const IntroScreen = ({ navigation, testAction }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('TestScreen');
        testAction();
      }}
    >
      <Text>Press</Text>
    </TouchableHighlight>
    <Text>{i18n.t('loginScreen.welcome')}</Text>
  </View>
);

export default connect(
  ({ auth: { authenticated } }) => ({
    authenticated
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(IntroScreen);