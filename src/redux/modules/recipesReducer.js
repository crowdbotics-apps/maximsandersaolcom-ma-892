import initialRecipesState from '../initialState/recipesInitial';
import RecipesService from '../../services/RecipesService';

export const GET_RECIPES_ALL = 'recipes/GET_RECIPES_ALL';
export const GET_ONE_RECIPE = 'recipes/GET_ONE_RECIPE';
export const START_FETCH_RECIPES = 'recipes/START_FETCH_RECIPES';


export default (state = { ...initialRecipesState }, { type, payload }) => {
  switch (type) {
    case START_FETCH_RECIPES: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_RECIPES_ALL: {
      return { 
        ...state,
        allRecipes: payload,
        loading: false
      };
    }
    case GET_ONE_RECIPE: {
      return {
        ...state,
        recipeSelected: payload,
      }
    }
    default: {
      return state;
    }
  }
};

export const getRecipes = () => {
  const recipesService = new RecipesService();
  return (dispatch) => {
    dispatch({ type: START_FETCH_RECIPES });
    return recipesService.getRecipes()
      .then(payload => dispatch({ type: GET_RECIPES_ALL, payload }))
      .catch((err) => console.log("Error ", err));
  };
};

export const selectOneRecipe = (payload) => ({
  type: GET_ONE_RECIPE,
  payload
})
