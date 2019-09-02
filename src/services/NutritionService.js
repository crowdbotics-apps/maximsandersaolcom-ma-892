import Api from '../api';

export default class NutritionService {
  api = Api.getInstance();

  getProductWithBarcode(barcode) {
    return this.api.fetch('GET', `/products/code/?code=${barcode}`, { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  getMealsByDate(date) {
    return this.api.fetch('GET', `/meal/get_by_date/?date=${date}`, { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  getRecipes() {
    return this.api.fetch('GET', '/recipe/', { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }
}
