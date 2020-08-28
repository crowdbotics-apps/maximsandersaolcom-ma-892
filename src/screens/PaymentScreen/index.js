import React, {PureComponent} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import Api from '../../api';
import Routes from '../../Routes';

export function testID(id) {
  return Platform.OS === 'android'
    ? {accessible: true, accessibilityLabel: id}
    : {testID: id};
}
const ContainerView = Platform.select({
  ios: KeyboardAvoidingView,
  android: View,
});

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51HFNmBKCUkH6lOfuYwulMkvogMKeTnGUmrm12RI2GvAzfMsomfzG356BhX6wJbjJDM3dX7fc4R4omEtpDlNBMpde00eYqSIqCB';

export default class CardTextFieldScreen extends PureComponent {
  static title = 'Card Text Field';

  state = {
    cardData: {
      valid: false,
    },
    error: false
  };

  createCreditCardToken = async (creditCardData, planId) => {
    const card = {
        'card[number]': creditCardData.values.number.replace(/ /g, ''),
        'card[exp_month]': creditCardData.values.expiry.split('/')[0],
        'card[exp_year]': creditCardData.values.expiry.split('/')[1],
        'card[cvc]': creditCardData.values.cvc
    };
    try {
      const token = await fetch('https://api.stripe.com/v1/tokens', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
        },
        method: 'post',
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      }).then(response => response.json());
      console.log('token', token)
      const api = Api.getInstance();
      const createCard = await api.fetch('POST', '/payment/create_card/', { card_token: token.id })
      console.log('createdCard', createCard);
      const createSubscription = await api.fetch('POST', '/payment/create_subscription/', { data: { plan_id: planId } });
      console.log('created subscription', createSubscription)
      if (createSubscription) {
        this.props.navigation.navigate(Routes.ProfileScreen);
      }
    } catch (err) {
      this.setState({
        error: true
      });
    }
  };

  render() {
    const {planName, planPrice, planId} = this.props.navigation.state.params || {};
    const {
      cardData: {valid},
    } = this.state;

    return (
      <ContainerView
        behavior="padding"
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
        onStartShouldSetResponder={() => true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Text style={{fontWeight: '500', fontSize: 30, marginBottom: 20, textAlign: 'center'}}>
            {planName}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 20,
              color: 'grey',
              textAlign: 'center'
            }}>
            Cost: ${planPrice}
            <Text style={{fontSize: 14}}> /month</Text>
          </Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <CreditCardInput
            requiresName
            onChange={(cardData) => this.setState({ cardData })}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {
            this.state.error && (
              <Text style={{ color: 'red', fontSize: 15 }}>Unable to process payment</Text>
            )
          }
          <TouchableOpacity disabled={!valid} onPress={() => this.createCreditCardToken(this.state.cardData, planId)}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>BUY NOW</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ContainerView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  spoiler: {
    width: 300,
  },
  params: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 50,
  },
});
