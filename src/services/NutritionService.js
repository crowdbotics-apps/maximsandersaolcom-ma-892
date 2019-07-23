import Api from '../api';

export default class NutritionService {
  api = Api.getInstance();

  getProductWithBarcode(barcode) {
    return this.api.fetch('GET', `/products/code/?code=${barcode}`, { })
      .then((response) => {
        return response.data;
      })
      .catch((err) => { throw err; });
  }
}
