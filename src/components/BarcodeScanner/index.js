import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import i18n from '../../i18n/i18n';
import NutritionService from '../../services/NutritionService';

const nutritionsService = new NutritionService();

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcodes: [],
      isExist: false
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
            ...barcodes
          ],
          isExist: true,
        }), () => Alert.alert('Barcode', `Product - name: ${result.name}, code: ${result.code}`));
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

  render() {
    const { barcodes, isExist } = this.state;
    return (
      <View
        style={styles.container}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {
            barcodes.length ? (
              <Text style={{ color: isExist ? 'green' : 'red', fontSize: 18 }}>{isExist ? i18n.t('barcodeScanner.supportYourGoals') : i18n.t('barcodeScanner.notSupportYourGoals')}</Text>
            ) : null
          }
        </View>
        <RNCamera
          style={styles.camera}
          ref={this.camera}
          autoFocus="on"
          defaultOnFocusComponent
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onGoogleVisionBarcodesDetected={this.onBarCodeRead}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {
          barcodes.length
            ? (
              <TouchableOpacity
                style={styles.buttonBrowseRecipes}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>{i18n.t('barcodeScanner.browseRecipes')}</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
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
    width: 300,
    height: 150,
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
