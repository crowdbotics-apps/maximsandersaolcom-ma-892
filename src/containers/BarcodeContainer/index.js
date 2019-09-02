import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductWithBarcodeAction } from '../../redux/modules/nutritionReducer';
import BarcodeScanner from '../../components/BarcodeScanner';

const mapState = state => ({
  scannedProduct: state.nutrition && state.nutrition.scannedProduct,
});

const mainActions = {
  getProductWithBarcodeAction,
};

export default connect(
  mapState,
  dispatch => bindActionCreators(mainActions, dispatch)
)(BarcodeScanner);
