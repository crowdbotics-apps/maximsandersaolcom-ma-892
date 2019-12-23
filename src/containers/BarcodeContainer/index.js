import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductWithBarcodeAction, setSelectedProductsBarCode } from '../../redux/modules/nutritionReducer';
import BarcodeScanner from '../../components/BarcodeScanner';

const mapState = state => ({
  scannedProduct: state.nutrition && state.nutrition.scannedProduct,
});

const mainActions = {
  getProductWithBarcodeAction,
  setSelectedProductsBarCode
};

export default connect(
  mapState,
  dispatch => bindActionCreators(mainActions, dispatch)
)(BarcodeScanner);
