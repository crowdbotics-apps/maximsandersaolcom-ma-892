import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SubscriptionContainer from '../../components/SubscriptionContainer';
import Routes from '../../Routes';
import Api from '../../api';
import Loading from '../../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const helper = [
  {
    color: ['#6ecfff', '#2b60ff'],
    benefitList: [
      'Customized Exercise Program',
      'Dynamic social feed',
      'Data and analytics',
    ],
  },
  {
    color: ['#de2121', '#3042b8'],
    benefitList: [
      'Voice diet tracking',
      'Dynamic social feed',
      'Data and analytics',
    ],
  },
  {
    color: ['#e3c42b', '#ff2bf4'],
    benefitList: [
      'Customized Exercise Program',
      'Voice diet tracking',
      'Synergistic diet and exercise strategy',
      'Dynamic social feed',
      'Data and analytics',
    ],
  },
];

const SubscriptionScreen = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [productsAndPlans, setPlansAndProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getPlansAndProducts = async () => {
      const api = Api.getInstance();
      try {
        const getProducts = await api.fetch('GET', '/payment/get_products/');
        const getPlans = await api.fetch('GET', '/payment/get_plans/');
        const allInOne = getProducts.data.data.map((item) => {
          const find = getPlans.data.data.find((find) => find.product === item.id)
          if (find) {
            return {
              plan: find,
              ...item,
            };
          }
          return {
            plan: null,
            ...item,
          };
        });
        setLoading(false);
        setPlansAndProducts(allInOne);
      } catch (err) {
        console.log('err', err);
      }
    };
    getPlansAndProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollableTabView
        renderTabBar={(props) => (
          <View
            {...props}
            style={{borderWidth: 0, color: 'black',flexDirection: 'row', justifyContent: 'space-evenly'}}
          >
            {
              props.tabs.map((item, key) => (
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: key === props.activeTab ? 'bold' : '500'
                  }}
                  onPress={() => props.goToPage(key)}
                >
                  {item}
                </Text>
              ))
            }
          </View>
        )
        }
        tabBarUnderlineStyle={{backgroundColor: 'transparent'}}>
        {productsAndPlans.map((item, key) => (
          <View tabLabel={item.name} style={{borderWidth: 0}}>
            <SubscriptionContainer
              benefitList={helper[key].benefitList}
              price={item.plan.amount}
              gradient={helper[key].color}
              onClick={() =>
                navigation.navigate(Routes.PaymentScreen, {
                  planName: item.name,
                  planPrice: item.plan.amount,
                  planId: item.plan.id,
                })
              }
            />
          </View>
        ))}
      </ScrollableTabView>
    </View>
  );
};

export default SubscriptionScreen;
