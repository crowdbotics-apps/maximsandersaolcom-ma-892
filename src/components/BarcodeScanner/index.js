import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import { BlurView } from 'react-native-blur';
import i18n from '../../i18n/i18n';
import NutritionService from '../../services/NutritionService';

const nutritionsService = new NutritionService();

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcodes: [],
      isExist: false,
      result: {},
    };
    this.camera = React.createRef();
  }

  onBarCodeRead = async (e) => {
    const { barcodes } = e;
    if (barcodes.length) {
      const [first] = barcodes;
      try {
        const result = await nutritionsService.getProductWithBarcode(first.data);
        this.setState(prevState => ({
          barcodes: [
            ...prevState.barcodes,
            ...barcodes,
            result
          ],
          isExist: true,
        }));
      } catch (err) {
        this.setState(prevState => ({
          barcodes: [
            ...prevState.barcodes,
            ...barcodes
          ],
          isExist: false
        }));
      }
    }
  }

  showAlert = () => {
    const { result, isExist } = this.state;
    if (isExist) {
      Alert.alert('Barcode', `Product - name: ${result.name}, code: ${result.code}`);
    }
  }

  render() {
    const { barcodes, isExist } = this.state;
    return (
      <RNCamera
        style={styles.camera}
        ref={this.camera}
        autoFocus="on"
        defaultOnFocusComponent
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onGoogleVisionBarcodesDetected={this.onBarCodeRead}
      >
        <BlurView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          viewRef={null}
          blurType="light"
          blurAmount={10}
        >
          {
            barcodes.length ? (
              <Text style={{ color: isExist ? 'green' : 'red', fontSize: 18 }}>{isExist ? i18n.t('barcodeScanner.supportYourGoals') : i18n.t('barcodeScanner.notSupportYourGoals')}</Text>
            ) : null
          }
        </BlurView>
        <View style={{ flex: 1, backgroundColor: 'transparent' }} />
        <BlurView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          viewRef={null}
          blurType="light"
          blurAmount={10}
        >
          {
          barcodes.length
            ? (
              <TouchableOpacity
                style={styles.buttonBrowseRecipes}
                onPress={() => this.showAlert()}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>{i18n.t('barcodeScanner.browseRecipes')}</Text>
              </TouchableOpacity>
            )
            : null
          }
        </BlurView>
      </RNCamera>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonBrowseRecipes: {
    width: 200,
    height: 70,
    borderWidth: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
