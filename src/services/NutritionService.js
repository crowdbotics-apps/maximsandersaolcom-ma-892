import Api from '../api';

export default class NutritionService {
  api = Api.getInstance();

  getProductWithBarcode(barcode) {
    return this.api.fetch('GET', `/products/code/?code=${barcode}`, { }) // handle this 49000036756
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  getProductsBySearchString(searchString) {
    return this.api.fetch('GET', `/products/?name=${searchString}`, { })
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

  getCategories(page = 1, limit = 5, offset = 0) {
    return this.api.fetch('GET', `/category/?page=${page}&limit=${limit}&offset=${offset}`, { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }
}
