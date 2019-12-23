import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import SubscriptionButton from '../../components/SubscriptionButton';
import Routes from '../../Routes';
import i18n from '../../i18n/i18n';

const continueProgramImage = require('../../assets/continue_program.jpg');
const findClassesImage = require('../../assets/find_classes.jpg');
const discoverMoreImage = require('../../assets/discover_more.jpg');

const SelectSubscriptionContainer = ({ navigation: { navigate } }) => (
  <SafeAreaView style={style.safeArea}>
    <HeaderForDrawer
      hideHamburger
      headerNavProp={{
        backgroundColor: 'white'
      }}
    />
    <ScrollView
      style={style.scrollViewContainter}
      contentContainerStyle={style.contentContainerStyle}
    >
      <SubscriptionButton
        onPress={() => navigate(Routes.ProgramScreen)}
        buttonLabel={i18n.t('selectSubscriptionScreen.buttons.continueProgram')}
        imageBackground={continueProgramImage}
      />
      <SubscriptionButton
        onPress={() => {}}
        buttonLabel={i18n.t('selectSubscriptionScreen.buttons.findClasses')}
        imageBackground={findClassesImage}
      />
      <SubscriptionButton
        onPress={() => {}}
        buttonLabel={i18n.t('selectSubscriptionScreen.buttons.discoverMore')}
        imageBackground={discoverMoreImage}
      />
    </ScrollView>
  </SafeAreaView>
);

const style = StyleSheet.create({
  contentContainerStyle: {
    flex: 1
  },
  scrollViewContainter: {
    flex: 1
  },
  safeArea: {
    flex: 1
  }
});

export default SelectSubscriptionContainer;
