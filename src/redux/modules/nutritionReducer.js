
import initialNutrition from '../initialState/nutritionInitial';
import NutritionService from '../../services/NutritionService';
import uniq from '../../utils/removeDuplicateInArray';

const nutritionsService = new NutritionService();

export const SCANNED_SUCCESS = 'nutrition/SCANNED_SUCCESS';
export const LOGOUT_SUCCESS = 'nutrition/LOGOUT_SUCCESS';
export const SET_ERROR = 'nutrition/SET_ERROR';
export const RESET_ERRORS = 'nutrition/RESET_ERRORS';
export const GET_MEALS_BY_DATE = 'nutrition/GET_MEALS_BY_DATE';
export const GET_MEALS_BY_DATE_FAILED = 'nutrition/GET_MEALS_BY_DATE_FAILED';
export const GET_CATEGORIES = 'nutrition/GET_CATEGORIES';
export const APPEND_CATEGORIES = 'nutrition/APPEND_CATEGORIES';
export const PRODUCTS_WITH_SEARCH = 'nutrition/PRODUCTS_WITH_SEARCH';
export const SET_SELECTED_PRODUCT = 'nutrition/SET_SELECTED_PRODUCT';
export const REMOVE_SELECTED_PRODUCT = 'nutrition/REMOVE_SELECTED_PRODUCT';
export const REMOVE_ALL_SELECTED_PRODUCTS = 'nutrition/REMOVE_ALL_SELECTED_PRODUCTS';
export const UNSET_SEARCH_ACTIVE = 'nutrition/UNSET_SEARCH_ACTIVE';
export const SET_SEARCH_STRING = 'nutrition/SET_SEARCH_STRING';
export const EDIT_SELECTED_PRODUCT = 'nutrition/EDIT_SELECTED_PRODUCT';

export default (state = { ...initialNutrition }, { type, payload }) => {
  switch (type) {
    case SCANNED_SUCCESS: {
      return {
        ...state,
        scannedProduct: payload
      };
    }
    case SET_SEARCH_STRING: {
      return {
        ...state,
        searchStringState: payload,
      };
    }
    case PRODUCTS_WITH_SEARCH: {
      return {
        ...state,
        products: payload.results,
        searchActive: true,
      };
    }
    case SET_SELECTED_PRODUCT: {
      return {
        ...state,
        selectedProducts: payload,
        searchStringState: '',
        searchActive: false,
      };
    }
    case EDIT_SELECTED_PRODUCT: {
      return {
        ...state,
        selectedProducts: payload.selectedProducts,
        selectedProductsStats: payload.selectedProductsStats
      }
    }
    case REMOVE_ALL_SELECTED_PRODUCTS: {
      return {
        ...state,
        selectedProducts: initialNutrition.selectedProducts,
        selectedProductsStats: initialNutrition.selectedProductsStats
      }
    }
    case REMOVE_SELECTED_PRODUCT: {
      return {
        ...state,
        searchStringState: '',
        searchActive: false,
        selectedProducts: state.selectedProducts.filter(item => item.id !== payload.id),
        selectedProductsStats: {
          calories: state.selectedProductsStats.calories - (payload.calories * payload.quantity),
          proteins: state.selectedProductsStats.proteins - (payload.proteins * payload.quantity),
          carbohydrate: state.selectedProductsStats.carbohydrate - (payload.carbohydrate * payload.quantity),
          fat: state.selectedProductsStats.fat - (payload.fat * payload.quantity)
        },
      }
    }
    case UNSET_SEARCH_ACTIVE: {
      return {
        ...state,
        searchActive: false,
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
    case APPEND_CATEGORIES: {
      return {
        ...state,
        categories: payload
      };
    }
    default: {
      return state;
    }
  }
};

export const setSelectedProducts = selectedItem => (dispatch, getState) => {
  const { nutrition: { selectedProducts } } = getState();
  const findSelectedItem = selectedProducts.find(item => item.id === selectedItem.id);
  return dispatch({
    type: SET_SELECTED_PRODUCT,
    payload: !findSelectedItem && [...selectedProducts, { ...selectedItem, measure: null, quantity: 0 }] || selectedProducts,
  });
};

export const removeSelectedProducts = itemForRemove => ({
  type: REMOVE_SELECTED_PRODUCT,
  payload: itemForRemove
});

export const removeAllSelectedProducts = () => ({
  type: REMOVE_ALL_SELECTED_PRODUCTS
})

export const editSelectedProducts = (itemForEdit, fieldForEdit, value) => (dispatch, getState) => {
  const { nutrition: { selectedProducts, selectedProductsStats } } = getState();
  const initForReduce = { calories: 0, proteins: 0, fat: 0, carbohydrate: 0 };
  let selectedProductsClone = JSON.parse(JSON.stringify(selectedProducts));
  const itemForEditIndex = selectedProductsClone.findIndex(item => item.id === itemForEdit.id);

  selectedProductsClone[itemForEditIndex] = {
    ...selectedProductsClone[itemForEditIndex],
    [fieldForEdit]: parseFloat(value).toFixed(1),
  };
  
  const selectedStatsChanged = selectedProductsClone.reduce((prevVal, currVal) => ({
    calories: (prevVal.calories) + (currVal.calories * currVal.quantity),
    proteins: prevVal.proteins + (currVal.proteins * currVal.quantity),
    fat: prevVal.fat + (currVal.fat * currVal.quantity),
    carbohydrate: prevVal.carbohydrate + (currVal.carbohydrate * currVal.quantity),
  }), initForReduce);

  return dispatch({
    type: EDIT_SELECTED_PRODUCT,
    payload: {
      selectedProducts: selectedProductsClone,
      selectedProductsStats: selectedStatsChanged
    },
  });
};

export const unsetSearchActive = () => ({ type: UNSET_SEARCH_ACTIVE });

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


export const getProductsBySearchString = searchString => (dispatch) => {
  dispatch({ type: SET_SEARCH_STRING, payload: searchString });
  return nutritionsService
    .getProductsBySearchString(searchString)
    .then((payload) => {
      dispatch({ type: PRODUCTS_WITH_SEARCH, payload: { results: payload.results, searchString } });
      return true;
    })
    .catch((err) => {
      console.error('error', err);
      throw err;
    });
};

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

export const getCategories = (page, limit, offset) => (dispatch, getState) => nutritionsService
  .getCategories(page, limit, offset)
  .then((payload) => {
    const { results } = payload;
    // dispatch({ type: GET_CATEGORIES, payload: results });
    if (offset !== 0) {
      if (results.length > 0) {
        const { nutrition: { categories: existingCategories } } = getState();
        const withoutDuplicate = uniq([...existingCategories, ...results], 'id');
        dispatch({
          type: APPEND_CATEGORIES,
          payload: withoutDuplicate
        });
      }
    } else {
      dispatch({ type: GET_CATEGORIES, payload: results });
    }
    // has more
    return results.length === limit;
  });
