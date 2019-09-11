
import initialNutrition from '../initialState/nutritionInitial';
import NutritionService from '../../services/NutritionService';

const nutritionsService = new NutritionService();

export const SCANNED_SUCCESS = 'nutrition/SCANNED_SUCCESS';
export const LOGOUT_SUCCESS = 'nutrition/LOGOUT_SUCCESS';
export const SET_ERROR = 'nutrition/SET_ERROR';
export const RESET_ERRORS = 'nutrition/RESET_ERRORS';
export const GET_MEALS_BY_DATE = 'nutrition/GET_MEALS_BY_DATE';
export const GET_MEALS_BY_DATE_FAILED = 'nutrition/GET_MEALS_BY_DATE_FAILED';
export const GET_CATEGORIES = 'nutrition/GET_CATEGORIES';

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
    case GET_CATEGORIES: {
      return {
        ...state,
        categories: payload
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
    console.error('error', err);
    throw err;
  });

export const getMealsByDateAction = date => dispatch => nutritionsService
  .getMealsByDate(date)
  .then((payload) => {
    const arrayWithProcentage = payload.map((item) => {
      const sum = item.calories + item.carbohydrate + item.fat;
      const arrayOfProcentages = [
        { name: 'protein', procentage: (item.protein * 100) / sum, color: 'rgb(68,161,248)' },
        { name: 'carbohydrate', procentage: (item.carbohydrate * 100) / sum, color: 'rgb(240,187,64)' },
        { name: 'fat', procentage: (item.fat * 100) / sum, color: 'rgb(220,58,38)' },
      ];
      return {
        ...item,
        pieArray: arrayOfProcentages
      };
    });
    dispatch({ type: GET_MEALS_BY_DATE, payload: arrayWithProcentage });
  })
  .catch((err) => {
    dispatch({ type: GET_MEALS_BY_DATE_FAILED, payload: err });
  });

export const getCategories = () => dispatch => nutritionsService
  .getCategories()
  .then((payload) => {
    const { results } = payload;
    dispatch({ type: GET_CATEGORIES, payload: results });
  });
