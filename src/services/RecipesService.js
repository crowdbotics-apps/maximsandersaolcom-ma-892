import Api from '../api';

export default class NutritionService {
  api = Api.getInstance();

  getRecipes() {
    return this.api.fetch('GET', `/recipe/`, { })
      .then((response) => {
        return response.data;
      })
      .catch((err) => { throw err; });
  }

  getOneRecipe(recipeId) {
    return this.api.fetch('GET', `/recipe/${recipeId}`, { })
      .then((response) => {
        return response.data;
      })
      .catch((err) => { throw err; });
  }
}
