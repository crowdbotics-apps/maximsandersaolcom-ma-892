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
        recipesObj: response.data
      }))
      .catch((err) => { throw err; });
  }

  getRecipeByNameOrCategory(name = '', category = '') {
    return this.api.fetch('GET', `/recipe/search?category=${category}&name=${name}`, { })
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
}
