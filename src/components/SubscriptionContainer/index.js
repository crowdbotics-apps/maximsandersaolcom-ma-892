import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SubscriptionContainer = ({
  setItem,
  onClick,
  gradient = [],
  price,
  benefitList = [],
}) => {
  const [modal, setModal] = useState(false);
  const [accessCode, setAccessCode] = useState(false);

  return (
    <View style={styles.container}>
      <Modal transparent visible={modal}>
        <View style={styles.modalWrapper}>
          <Text style={styles.modalTitle}>Do you have An Access Code?</Text>
          <View style={styles.buttonWrapper}>
            {!accessCode ? (
              <>
                <TouchableOpacity onPress={() => setAccessCode(true)}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalTitle}>Yes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModal(false)}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalTitle}>No</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    height: 46,
                    width: 200,
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setAccessCode(false);
                    setModal(false);
                  }}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalTitle}>Enter</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.content}>
        <LinearGradient
          style={styles.content1}
          colors={gradient}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 1.0}}>
          <Text style={styles.price}>
            ${price}
            <Text style={styles.priceMonth}>/month</Text>
          </Text>
          <View style={styles.list}>
            <FlatList
              data={benefitList}
              renderItem={({item}) => (
                <Text style={styles.listItem}>{`\u2022   ${item}`}</Text>
              )}
            />
          </View>
          <View style={styles.privacyPolicyWrapper}>
            <Text style={styles.privacyPolicy}>
              By subscribing to Orum Training, you agree to our Privacy Policy
              and Terms of Service
            </Text>
          </View>
        </LinearGradient>
        <TouchableOpacity onPress={() => setModal(true)}>
          <View style={styles.button}>
            <Text
              style={{
                fontSize: 12,
                color: gradient[1],
              }}>
              BUY NOW
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 40,
          width: '100%',
          backgroundColor: gradient[0],
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          zIndex: -1,
          marginTop: 2,
          opacity: 0.2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  content1: {
    flex: 1,
    borderRadius: 50,
  },
  content: {
    flex: 1,
    overflow: 'visible',
  },
  price: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 30,
    marginTop: 100,
  },
  priceMonth: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '100%',
    transform: [{translateX: '-50%'}, {translateY: '-20%'}],
    left: '50%',
  },
  privacyPolicyWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  privacyPolicy: {
    color: '#fff',
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
    padding: 40,
  },
  list: {
    marginTop: 70,
    paddingHorizontal: 30,
  },
  listItem: {
    color: '#fff',
    marginTop: 20,
  },
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 100,
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#fff',
    width: 100,
    borderRadius: 10,
    margin: 10,
  },
});

export default SubscriptionContainer;
