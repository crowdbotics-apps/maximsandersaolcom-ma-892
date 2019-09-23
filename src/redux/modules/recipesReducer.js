import initialRecipesState from '../initialState/recipesInitial';
import RecipesService from '../../services/RecipesService';

export const GET_RECIPES_ALL = 'recipes/GET_RECIPES_ALL';
export const GET_ONE_RECIPE = 'recipes/GET_ONE_RECIPE';
export const START_FETCH_RECIPES = 'recipes/START_FETCH_RECIPES';
export const FETCH_RECIPES_BY_CATEGORIE = 'recipes/FETCH_RECIPES_BY_CATEGORIE';
export const GET_RECIPES_BY_INGREDIENT = 'recipes/GET_RECIPES_BY_INGREDIENT';

export default (state = { ...initialRecipesState }, { type, payload }) => {
  switch (type) {
    case START_FETCH_RECIPES: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_RECIPES_ALL: {
      return {
        ...state,
        allRecipes: payload.recipes,
        allRecipesObj: payload,
        loading: false
      };
    }
    case GET_ONE_RECIPE: {
      return {
        ...state,
        recipeSelected: payload,
      };
    }
    case FETCH_RECIPES_BY_CATEGORIE: {
      return {
        ...state,
        recipesByCategory: payload,
        loading: false
      };
    }
    case GET_RECIPES_BY_INGREDIENT: {
      return {
        ...state,
        recipesByIngredient: payload
      };
    }
    default: {
      return state;
    }
  }
};

export const selectOneRecipe = payload => ({
  type: GET_ONE_RECIPE,
  payload
});

export const getRecipesByCategory = (categoriesWithSlugs = []) => {
  const recipesService = new RecipesService();
  return (dispatch) => {
    const recipesByCategorieAll = categoriesWithSlugs
      .map(item => recipesService.getRecipesByCategory(item));
    Promise.all(recipesByCategorieAll)
      .then((payload) => {
        dispatch({ type: FETCH_RECIPES_BY_CATEGORIE, payload });
      });
  };
};

export const getRecipeByNameOrCategory = ({ name = '', category = '', page = 1, limit = 5 }) => {
  const recipesService = new RecipesService();
  return (dispatch) => {
    dispatch({ type: START_FETCH_RECIPES });
    return recipesService.getRecipeByNameOrCategory(name, category, page, limit)
      .then((payload) => {
        dispatch({ type: GET_RECIPES_ALL, payload });
        // has more
        return payload.recipesObj.next !== null;
      });
  };
};

export const getRecipeByCode = (code) => {
  const recipesService = new RecipesService();
  return (dispatch) => {
    dispatch({ type: START_FETCH_RECIPES });
    return recipesService.getRecipeByCode(code)
      .then(payload => dispatch({ type: GET_RECIPES_BY_INGREDIENT, payload }));
  };
};
