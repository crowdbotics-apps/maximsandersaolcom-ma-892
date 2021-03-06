import initialRecipesState from '../initialState/recipesInitial';
import RecipesService from '../../services/RecipesService';
import uniq from '../../utils/removeDuplicateInArray';
import { TOGGLE_LIKE } from "./feedReducer";
import AsyncStorage from "@react-native-community/async-storage";

export const GET_RECIPES_ALL = 'recipes/GET_RECIPES_ALL';
export const GET_ONE_RECIPE = 'recipes/GET_ONE_RECIPE';
export const START_FETCH_RECIPES = 'recipes/START_FETCH_RECIPES';
export const FETCH_RECIPES_BY_CATEGORIE = 'recipes/FETCH_RECIPES_BY_CATEGORIE';
export const GET_RECIPES_BY_INGREDIENT = 'recipes/GET_RECIPES_BY_INGREDIENT';
export const APPEND_RECIPES = 'recipes/APPEND_RECIPES';
export const TOGGLE_FAVORITE_RECIPE = 'recipes/TOGGLE_FAVORITE_RECIPE';


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
    case APPEND_RECIPES: {
      return {
        ...state,
        allRecipes: payload.recipes,
        recipesObj: payload.recipes,
        loading: false
      };
    }
    case TOGGLE_FAVORITE_RECIPE: {
      return {
        ...state,
        favoriteRecipes: payload
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

export const getRecipeByNameOrCategory = ({
  name = '',
  category = '',
  page = 1,
  limit = 5,
  offset = 0
}) => {
  const recipesService = new RecipesService();
  return (dispatch, getState) => {
    dispatch({ type: START_FETCH_RECIPES });
    return recipesService.getRecipeByNameOrCategory(name, category, page, limit, offset)
      .then((payload) => {
        const { recipes, recipesObj } = payload;
        if (offset !== 0) {
          if (recipes.length > 0) {
            const { recipes: { allRecipes: existingRecipes } } = getState();
            const withoutDuplicate = uniq([...existingRecipes, ...recipes], 'id');
            dispatch({
              type: APPEND_RECIPES,
              payload: {
                recipes: withoutDuplicate,
                recipesObj
              }
            });
          }
        } else {
          dispatch({ type: GET_RECIPES_ALL, payload });
        }
        // has more
        return recipes.length === limit;
      })
      .catch(err => console.log("err", err))
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

const recipesService = new RecipesService();

export const addRemoveFavorites = recipeId => (dispatch, getState) => recipesService.addRemoveFavorites(recipeId)
    .then((res) => {

      console.log('RESPONSE FROM ADD TO FAV' ,res)
      // const { feeds: { feeds: feedsArray } } = getState();  //TODO: change here
      // const newFeedArray = feedsArray.map((item) => {
      //   if (item.id === recipeId) {
      //     const helper = {
      //       ...item,
      //       liked: !item.liked,
      //       likes: item.liked ? item.likes - 1 : item.likes + 1
      //     };
      //     return helper;
      //   }
      //   return item;
      // });
      // dispatch({ type: TOGGLE_FAVORITE_RECIPE, payload: newFeedArray });
    })
    .catch((err) => { throw err; });

