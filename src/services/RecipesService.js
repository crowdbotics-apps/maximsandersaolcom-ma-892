import Api from '../api';

export default class NutritionService {
  api = Api.getInstance();

  getRecipes() {
    return this.api.fetch('GET', '/recipe/', { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  getOneRecipe(recipeId) {
    return this.api.fetch('GET', `/recipe/${recipeId}`, { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  getRecipesByCategory(category) {
    return this.api.fetch('GET', `/recipe/search?category=${category.slug}`, { })
      .then(response => ({
        categoryName: category.name,
        recipes: response.data.results,
        recipesObj: response.data,
        slug: category.slug
      }))
      .catch((err) => { throw err; });
  }

  getRecipeByNameOrCategory(name = '', category = '', page = 1, limit = 5, offset = 0) {
    return this.api.fetch('GET', `/recipe/search?category=${category}&name=${name}&page=${page}&limit=${limit}&offset=${offset}`, { })
      .then(response => ({
        recipes: response.data.results,
        recipesObj: response.data
      }))
      .catch((err) => { throw err; });
  }

  getRecipeByCode(code = '') {
    return this.api.fetch('GET', `/recipe/search?code=${code}`, { })
      .then(response => response.data)
      .catch((err) => { throw err; });
  }

  addRemoveFavorites(recipeId) {
        return this.api.fetch('GET', `/recipe/${recipeId}/toggle_fav/`, { })
            .then(response => response)
            .catch((err) => { throw err; });
  }

}
