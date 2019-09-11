import Api from '../api';

export default class NutritionService {
  api = Api.getInstance();

  getProductWithBarcode(barcode) {
    return this.api.fetch('GET', `/products/code/?code=${49000036756}`, { }) // handle this 49000036756
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

  getCategories() {
    return this.api.fetch('GET', '/category/', { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }
}
