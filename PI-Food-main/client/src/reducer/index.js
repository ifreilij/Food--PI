
import {GET_RECIPES, GET_DETAIL,GET_DIETS, GET_INPUT,ERROR_RECIPE,ORDER_BY_ALPHA,RESET_ERRORS,ORDER_BY_SCORE,FILTER_BY_DIET } from "../actions/types"

const initialState = {
  recipes: [],
  allRecipes: [],
  detail: [],
  diets: [],
  errorsNotFound: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case ERROR_RECIPE:
    
      return {
        ...state,
        errorsNotFound: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_BY_DIET:
     
      const recipe = state.allRecipes;
      const filter =
        action.payload === "all"
          ? recipe
          : recipe.filter((c) =>
              c.dietTypes?.some(
                (e) => e.toLowerCase() === action.payload.toLowerCase()
              )
            );
      return {
        ...state,
        recipes: filter,
      };

    case ORDER_BY_ALPHA:
      let orderByAlpha =
        action.payload === "ASC"
          ? state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              if (b.title.toLowerCase() > a.title.toLowerCase()) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
              if (b.title.toLowerCase() > a.title.toLowerCase()) return 1;
              return 0;
            });

      return {
        ...state,
        recipes: orderByAlpha,
        allRecipes: orderByAlpha,
      };

    case ORDER_BY_SCORE:
      let orderByScore =
        action.payload === "ASC"
          ? state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) return 1;
              if (b.spoonacularScore > a.spoonacularScore) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) return -1;
              if (b.spoonacularScore > a.spoonacularScore) return 1;
              return 0;
            });

      return {
        ...state,
        recipes: orderByScore,
        allRecipes: orderByScore,
      };

    case RESET_ERRORS:
      return {
        ...state,
        errorsNotFound: {},
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    

    case GET_INPUT:
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
