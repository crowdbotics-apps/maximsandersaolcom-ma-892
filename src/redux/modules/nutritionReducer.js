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
export const SET_SELECTED_MEAL = 'nutration/SET_SELECTED_MEAL';
export const CREATED_NEW_MEAL = 'nutration/CREATED_NEW_MEAL';
export const NEW_MEALS = 'nutrition/NEW_MEALS';

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
      };
    }
    case REMOVE_ALL_SELECTED_PRODUCTS: {
      return {
        ...state,
        selectedProducts: initialNutrition.selectedProducts,
        selectedProductsStats: initialNutrition.selectedProductsStats
      };
    }
    case REMOVE_SELECTED_PRODUCT: {
      return {
        ...state,
        searchStringState: '',
        searchActive: false,
        selectedProducts: state.selectedProducts.filter(item => item.id !== payload.id),
        selectedProductsStats: {
          calories: state.selectedProductsStats.calories - (payload.calories * payload.portion),
          proteins: state.selectedProductsStats.proteins - (payload.proteins * payload.portion),
          carbohydrate: state.selectedProductsStats.carbohydrate - (payload.carbohydrate * payload.portion),
          fat: state.selectedProductsStats.fat - (payload.fat * payload.portion)
        },
      };
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
        error: payload
      };
    }
    case APPEND_CATEGORIES: {
      return {
        ...state,
        categories: payload
      };
    }
    case SET_SELECTED_MEAL: {
      return {
        ...state,
        selectedMeal: payload.selectedMeal,
        selectedProducts: payload.selectedProducts,
        selectedProductsStats: payload.selectedProductsStats,
      };
    }
    case CREATED_NEW_MEAL: {
      return {
        ...state,
        selectedMeal: payload.selectedMeal,
        selectedProducts: payload.selectedProducts,
        selectedProductsStats: payload.selectedProductsStats,
      };
    }
    case NEW_MEALS: {
      return {
        ...state,
        meals: payload
      };
    }
    default: {
      return state;
    }
  }
};

export const setSelectedMeal = selectedMeal => (dispatch) => {
  const { food_items: foodItems } = selectedMeal;
  const getProductsFromMeal = foodItems.map(item => ({
    portion: item.portion, ...item.food, measure: null, foodId: item.id
  }));
  dispatch({
    type: SET_SELECTED_MEAL,
    payload: {
      selectedMeal: {
        ...selectedMeal,
        isEmpty: !!foodItems.length,
      },
      selectedProducts: getProductsFromMeal.map(item => ({ ...item, onServer: true })),
      selectedProductsStats: {
        calories: selectedMeal.calories,
        carbohydrate: selectedMeal.carbohydrate,
        fat: selectedMeal.fat,
        proteins: selectedMeal.protein
      },
    }
  });
};

export const setSelectedProducts = selectedItem => (dispatch, getState) => {
  const { nutrition: { selectedProducts } } = getState();
  const findSelectedItem = selectedProducts.find(item => item.id === selectedItem.id);
  return dispatch({
    type: SET_SELECTED_PRODUCT,
    payload: !findSelectedItem && [...selectedProducts, { ...selectedItem, measure: null, portion: 0, onServer: false }] || selectedProducts,
  });
};

export const removeSelectedProducts = itemForRemove => (dispatch, getState) => {
  const { nutrition: { selectedMeal, meals } } = getState();
  if (itemForRemove.onServer) {
    return nutritionsService.deleteFood(itemForRemove.foodId, selectedMeal.id)
      .then(() => dispatch({
        type: REMOVE_SELECTED_PRODUCT,
        payload: itemForRemove
      }))
      .then(() => nutritionsService.getMeal(selectedMeal.id))
      .then((getMealResult) => {
        const newMealArray = meals.map((item2) => {
          if (item2.date_time === getMealResult.date_time) {
            return getMealResult;
          }
          return item2;
        });
        dispatch({ type: NEW_MEALS, payload: newMealArray });
      })
      .catch((err) => { throw err; });
  }
  return dispatch({
    type: REMOVE_SELECTED_PRODUCT,
    payload: itemForRemove
  });
}


export const removeAllSelectedProducts = () => (dispatch, getState) => {
  const { nutrition: { selectedMeal, selectedProducts, meals } } = getState();
  const itemsForRemove = selectedProducts.filter(item => item.onServer);
  if (itemsForRemove.length) {
    return Promise.all(itemsForRemove.map(item => nutritionsService.deleteFood(item.foodId, selectedMeal.id)))
      .then(() => dispatch({ type: REMOVE_ALL_SELECTED_PRODUCTS }))
      .then(() => nutritionsService.getMeal(selectedMeal.id))
      .then((getMealResult) => {
        const newMealArray = meals.map((item2) => {
          if (item2.date_time === getMealResult.date_time) {
            return getMealResult;
          }
          return item2;
        });
        dispatch({ type: NEW_MEALS, payload: newMealArray });
      })
      .catch(err => console.log('err', err));
  }
  if (itemsForRemove.length !== selectedProducts.length) {
    return dispatch({ type: REMOVE_ALL_SELECTED_PRODUCTS });
  }
  return dispatch({ type: REMOVE_ALL_SELECTED_PRODUCTS });
};

export const editSelectedProducts = (itemForEdit, fieldForEdit, value) => (dispatch, getState) => {
  const { nutrition: { selectedProducts, selectedProductsStats } } = getState();
  const initForReduce = { calories: 0, proteins: 0, fat: 0, carbohydrate: 0 };
  let selectedProductsClone = JSON.parse(JSON.stringify(selectedProducts));
  const itemForEditIndex = selectedProductsClone.findIndex(item => item.id === itemForEdit.id);

  selectedProductsClone[itemForEditIndex] = {
    ...selectedProductsClone[itemForEditIndex],
    // eslint-disable-next-line radix
    [fieldForEdit]: fieldForEdit === 'portion' ? parseInt(value) : value,
  };
  
  const selectedStatsChanged = selectedProductsClone.reduce((prevVal, currVal) => ({
    calories: (prevVal.calories) + (currVal.calories * currVal.portion),
    proteins: prevVal.proteins + (currVal.proteins * currVal.portion),
    fat: prevVal.fat + (currVal.fat * currVal.portion),
    carbohydrate: prevVal.carbohydrate + (currVal.carbohydrate * currVal.portion),
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

export const getMealsByDateAction = date => (dispatch, getState) => nutritionsService
  .getMealsByDate(date)
  .then((payload) => {
    const removeEmptyMeal = payload.filter(mealItem => mealItem.food_items.length); 
    const arrayWithProcentage = removeEmptyMeal.map((item) => {
      const sum = item.calories + item.carbohydrate + item.fat;
      const arrayOfProcentages = [
        { name: 'protein', procentage: (item.protein * 100) / sum, color: 'rgb(68,161,248)' },
        { name: 'carbohydrate', procentage: (item.carbohydrate * 100) / sum, color: 'rgb(240,187,64)' },
        { name: 'fat', procentage: (item.fat * 100) / sum, color: 'rgb(220,58,38)' },
      ];
      return {
        ...item,
        pieArray: arrayOfProcentages,
      };
    });
    const { nutrition: { meals: mealsFromStore } } = getState();
    const withoutDuplicateMeals = uniq([...arrayWithProcentage, ...mealsFromStore], 'date_time');
    const sortMeals = withoutDuplicateMeals.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
    dispatch({ type: GET_MEALS_BY_DATE, payload: sortMeals });
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

export const createNewMealSpeach = (query, fromSentence, dateTime) => (dispatch, getState) => {
  const { nutrition: { selectedMeal: mealFromStore } } = getState();
  if (typeof mealFromStore.id !== 'undefined') {
    return nutritionsService.addFood(mealFromStore.id, {}, query, fromSentence, dateTime)
      .then(res => res)
      .then(() => nutritionsService.getMeal(mealFromStore.id))
      .then((getMealResult) => {
        const selectedMeal = { ...getMealResult };
        const selectedProducts = getMealResult.food_items.map(item => ({
          ...item.food, measure: null, portion: item.portion, onServer: true, foodId: item.id
        }));
        const selectedProductsStats = {
          carbohydrate: parseFloat(Math.round(getMealResult.carbohydrate * 100) / 100).toFixed(2),
          fat: parseFloat(Math.round(getMealResult.fat * 100) / 100).toFixed(2),
          proteins: parseFloat(Math.round(getMealResult.protein * 100) / 100).toFixed(2)
        };
        dispatch({
          type: CREATED_NEW_MEAL,
          payload: {
            selectedMeal,
            selectedProducts,
            selectedProductsStats
          }
        });
        const { nutrition: { meals } } = getState();
        const newMealArray = meals.map((item2) => {
          if (item2.date_time === getMealResult.date_time) {
            return getMealResult;
          }
          return item2;
        });
        dispatch({ type: NEW_MEALS, payload: newMealArray });
      })
      .catch((err) => { throw err; });
  }
  nutritionsService
    .createMeal({ date_time: dateTime, query, from_sentence: fromSentence })
    .then(result => result)
    .then(res => nutritionsService.getMeal(res.id))
    .then((getMealResult) => {
      const selectedMeal = { ...getMealResult };
      const selectedProducts = getMealResult.food_items.map(item => ({
        ...item.food, measure: null, portion: item.portion, onServer: true, foodId: item.id
      }));
      const selectedProductsStats = {
        carbohydrate: parseFloat(Math.round(getMealResult.carbohydrate * 100) / 100).toFixed(2),
        fat: parseFloat(Math.round(getMealResult.fat * 100) / 100).toFixed(2),
        proteins: parseFloat(Math.round(getMealResult.protein * 100) / 100).toFixed(2)
      };
      dispatch({
        type: CREATED_NEW_MEAL,
        payload: {
          selectedMeal,
          selectedProducts,
          selectedProductsStats
        }
      });
      const { nutrition: { meals } } = getState();
      const newMealArray = meals.map((item2) => {
        if (item2.date_time === getMealResult.date_time) {
          return getMealResult;
        }
        return item2;
      });
      dispatch({ type: NEW_MEALS, payload: newMealArray });
    })
    .catch(err => console.log('err', err));
}

export const logFood = () => (dispatch, getState) => {
  const { nutrition: { selectedMeal, selectedProducts, meals } } = getState();
  if (typeof selectedMeal.id === 'undefined') {
    const arrayForServer = selectedProducts.map(item => ({
      food_name: item.name,
      item_id: item.id,
      portion: item.portion
    }));
    return nutritionsService.createMeal({ date_time: selectedMeal.date_time, nix_food_items: arrayForServer })
      .then(result => result)
      .then(res => nutritionsService.getMeal(res.id))
      .then((getMealResult) => {
        const newMealArray = meals.map((item2) => {
          if (item2.date_time === getMealResult.date_time) {
            return getMealResult;
          }
          return item2;
        });
        dispatch({ type: NEW_MEALS, payload: newMealArray });
      })
      .catch((err) => { throw err; });
  }
  const itemsForAdd = selectedProducts.filter(item => !item.onServer);
  if (itemsForAdd.length) {
    return Promise.all(itemsForAdd.map(item => nutritionsService.addFood(selectedMeal.id, { nix_food_items: [{ food_name: item.name, portion: item.portion, item_id: item.id }] }, '', false, selectedMeal.date_time, item.id)))
      .then(result => result)
      .then(() => nutritionsService.getMeal(selectedMeal.id))
      .then((getMealResult) => {
        const newMealArray = meals.map((item2) => {
          if (item2.date_time === getMealResult.date_time) {
            return getMealResult;
          }
          return item2;
        });
        dispatch({ type: NEW_MEALS, payload: newMealArray });
      })
      .catch(err => console.log('aa', err))
  }
};
