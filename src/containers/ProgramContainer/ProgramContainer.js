import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import GradientButton from '../../components/GradientButton';
import ProgramTabHeader from '../../components/ProgramTabHeader';
import CustomProgramTabs from './CustomProgramTabs';
import i18n from '../../i18n/i18n';

const ProgramContainer = ({
  navigation,
  navigation: {
    toggleDrawer
  },
  allSessions,
  getAllSessionsAction,
  pickSessionAction
}) => {
  useEffect(() => {
    getAllSessionsAction();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderForDrawer
        navigation={navigation}
        headerNavProp={{ paddingBottom: 50 }}
        onDrawerButtonPress={() => {
          toggleDrawer();
        }}
      />
      <ScrollableTabView
        style={{ backgroundColor: 'white', flex: 1 }}
        renderTabBar={props => <ProgramTabHeader {...props} />}
      >
        <View style={{ flex: 1 }}>
          <View
            style={styles.buttonContainer}
          >
            <GradientButton
              buttonContainerText={i18n.t('programScreen.startWorkoutButton')}
              buttonContainerStyleProp={styles.findRecipesButtonContainer}
              buttonContainerTextStyle={styles.buttonContainerTextStyle}
              buttonContentContainerProp={{ paddingBottom: 0 }}
              colorsGradient={['#3180BD', '#6EC2FA']}
            />
          </View>
          {
            allSessions && allSessions.map((item, index) => (
              <View
                tabLabel={index}
                style={{ flex: 1 }}
              >
                <CustomProgramTabs navigation={navigation} overviewData={item.workouts} pickSession={pickSessionAction} />
              </View>
            ))
          }
        </View>
      </ScrollableTabView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white'
  },
  findRecipesButtonContainer: {
    width: '90%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 0,
    paddingBottom: 15,
    borderRadius: 10,
    marginRight: 0,
    marginBottom: 0
  },
  buttonContainerTextStyle: {
    fontSize: 21,
    fontWeight: 'normal',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});

export default ProgramContainer;
