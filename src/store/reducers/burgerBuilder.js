import * as Type from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1,
  meat: 1.5,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      building: true
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      building: true
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name]
  };
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false
  });
};
// prettier-ignore
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.ADD_INGREDIENT: return addIngredient(state, action);
    case Type.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case Type.SET_INGREDIENTS: return setIngredients(state, action);
    case Type.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
    default: return state;
  }
};

export default reducer;
