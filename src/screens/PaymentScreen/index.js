import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PaymentCardTextField} from 'tipsi-stripe';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 50,
  },
});

const PaymentScreen = ({navigation}) => {
  const [valid, setValid] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cvc, setCvc] = useState('');
  const {planName, planPrice} = navigation.state.params || {};
  const handleFieldParamsChange = (valid, params) => {
    setValid(valid);
  };

  if (!planName || !planPrice) return navigation.goBack();
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: '500', fontSize: 30, marginBottom: 20}}>
        {planName} plan
      </Text>
      <Text
        style={{
          fontWeight: '400',
          fontSize: 20,
          marginBottom: 100,
          color: 'grey',
        }}>
        Cost: ${planPrice}
        <Text style={{fontSize: 14}}> /month</Text>
      </Text>

      <PaymentCardTextField
        // ref={ (ref) => {
        //     this.paymentCardInput = ref;
        // }}
        style={styles.field}
        // cursorColor={...}
        // textErrorColor={...}
        // placeholderColor={...}
        // numberPlaceholder={...}
        // expirationPlaceholder={...}
        // cvcPlaceholder={...}
        disabled={false}
        onParamsChange={handleFieldParamsChange}
      />
      <TouchableOpacity disabled={!valid}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>BUY NOW</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
