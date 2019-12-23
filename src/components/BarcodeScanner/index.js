import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import { BlurView } from 'react-native-blur';
import Routes from '../../Routes';

const DESIRED_RATIO = '16:9';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratio: '16:9'
    };
    this.camera = React.createRef();
  }

  onBarCodeRead = async (e) => {
    const { getProductWithBarcodeAction, navigation, setSelectedProductsBarCode } = this.props;
    const { barcodes } = e;
    if (barcodes.length) {
      const [first] = barcodes;
      try {
        await getProductWithBarcodeAction(first.data);
        if (navigation.getParam('logFood', false)) {
          await setSelectedProductsBarCode();
          const prevScreen = navigation.getParam('prevScreen', false);
          if (prevScreen === Routes.MealRegulatorNutritionScreen) {
            return navigation.replace(Routes.LogFoodsNutritionScreen);
          }
          return navigation.navigate(Routes.LogFoodsScreen);
        }
        return navigation.navigate(Routes.IngredientScreen);
      } catch (err) { throw err; }
    }
  }

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      const ratiosed = ratios.find(ratio => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
      this.setState({ ratio: ratiosed });
    }
  }

  render() {
    const { ratio } = this.state;
    return (
      <RNCamera
        style={styles.camera}
        ref={this.camera}
        autoFocus="on"
        defaultOnFocusComponent
        aspect={1}
        onCameraReady={this.prepareRatio}
        ratio={ratio}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onGoogleVisionBarcodesDetected={this.onBarCodeRead}
      >
        <BlurView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
          }}
          viewRef={null}
          blurType="light"
          blurAmount={10}
        />
        <View style={{ flex: 1, backgroundColor: 'transparent' }} />
        <BlurView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
          }}
          viewRef={null}
          blurType="light"
          blurAmount={10}
        />
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
