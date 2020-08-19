import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import ProfileContainer from '../../containers/ProfileContainer';
import * as profileActions from '../../redux/actions/profile';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import SubscriptionContainer from '../../components/SubscriptionContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
const SubscriptionScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollableTabView
        renderTabBar={() => <DefaultTabBar style={{borderWidth: 0}} />}
        tabBarUnderlineStyle={{backgroundColor: 'transparent'}}>
        <View tabLabel="Diet" style={{borderWidth: 0}}>
          <SubscriptionContainer
            benefitList={[
              'Customized Exercise Program',
              'Dynamic social feed',
              'Data and analytics',
            ]}
            price={9.99}
            gradient={['#6ecfff', '#2b60ff']}
          />
        </View>
        <View tabLabel="Exercise" style={{borderWidth: 0}}>
          <SubscriptionContainer
            gradient={['#de2121', '#3042b8']}
            price={9.99}
            benefitList={[
              'Customized Exercise Program',
              'Dynamic social feed',
              'Data and analytics',
            ]}
          />
        </View>
        <View tabLabel="Pro" style={{borderWidth: 0}}>
          <SubscriptionContainer
            gradient={['#e3c42b', '#ff2bf4']}
            price={14.99}
            benefitList={[
              'Customized Exercise Program',
              'Dynamic social feed',
              'Data and analytics',
            ]}
          />
        </View>
      </ScrollableTabView>
    </View>
  );
};

export default SubscriptionScreen;
