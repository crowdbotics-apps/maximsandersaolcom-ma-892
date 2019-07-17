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


export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcodes: [],
    };
    this.camera = React.createRef();
  }

  onBarCodeRead = (e) => {
    if (e.barcodes.length) {
      this.setState(prevState => ({
        barcodes: [
          ...prevState.barcodes,
          ...e.barcodes
        ]
      }), () => Alert.alert('Barcode', `${e.barcodes[0].data}`));
    }
  }

  render() {
    const { barcodes } = this.state;
    return (
      <View
        style={styles.container}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {
            barcodes.length ? (
              <Text style={{ color: 'green', fontSize: 18 }}>{i18n.t('barcodeScanner.supportYourGoals')}</Text>
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
