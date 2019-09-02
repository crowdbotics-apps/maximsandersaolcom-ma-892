
import initialNutrition from '../initialState/nutritionInitial';
import NutritionService from '../../services/NutritionService';

const nutritionsService = new NutritionService();

export const SCANNED_SUCCESS = 'nutrition/SCANNED_SUCCESS';
export const LOGOUT_SUCCESS = 'nutrition/LOGOUT_SUCCESS';
export const SET_ERROR = 'nutrition/SET_ERROR';
export const RESET_ERRORS = 'nutrition/RESET_ERRORS';
export const GET_MEALS_BY_DATE = 'nutrition/GET_MEALS_BY_DATE';
export const GET_MEALS_BY_DATE_FAILED = 'nutrition/GET_MEALS_BY_DATE_FAILED';

export default (state = { ...initialNutrition }, { type, payload }) => {
  switch (type) {
    case SCANNED_SUCCESS: {
      return {
        ...state,
        scannedProduct: payload
      };
    }
    case GET_MEALS_BY_DATE: {
      return {
        ...state,
        meals: payload
      };
    }
    case GET_MEALS_BY_DATE_FAILED: {
      return {
        ...state,
        meals: [],
        error: payload
      };
    }
    default: {
      return state;
    }
  }
};

export const getProductWithBarcodeAction = barCode => dispatch => nutritionsService
  .getProductWithBarcode(barCode)
  .then((payload) => {
    dispatch({ type: SCANNED_SUCCESS, payload });
    return true;
  })
  .catch((err) => {
    console.log('error', err);
    throw err;
  });

export const getMealsByDateAction = date => dispatch => nutritionsService
  .getMealsByDate(date)
  .then((payload) => {
    dispatch({ type: GET_MEALS_BY_DATE, payload });
  })
  .catch((err) => {
    dispatch({ type: GET_MEALS_BY_DATE_FAILED, payload: err });
  });

export const getRecipesAction = () => () => nutritionsService
  .getRecipes()
  .then(res => console.log('res', res))
  .catch((err) => { throw err; });
