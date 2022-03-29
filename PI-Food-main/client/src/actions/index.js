import axios from "axios";

import {
  GET_RECIPES,
  GET_DETAIL,
  GET_DIETS,
  GET_INPUT,
  ERROR_RECIPE,
  ORDER_BY_ALPHA,
  RESET_ERRORS,
  ORDER_BY_SCORE,
  FILTER_BY_DIET,
} from "./types";



export function getRecipes() {
  return async function (dispatch) {
    try {
      let info = await axios.get("http://localhost:3001/recipe/get");

      dispatch({
        type: GET_RECIPES,
        payload: info.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_RECIPE,
        payload: { data: error.response.data, status: error.response.status },
      });
    }
  };
}
// export function getRecipes() {
//   return function (dispatch) {
//        return axios
//         .get("http://localhost:3001/recipe/get")
//         .then((r) => {
//           return dispatch({
//             type: GET_RECIPES,
//             payload: r.data,
//           });
//         })
//         .catch((e) => console.log(e));

// }
// }

export function getDetail(id) {
  return async function (dispatch) {
    let detail = await axios.get(`http://localhost:3001/recipe/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: detail.data,
    });
  };
}


// export function getDetail(id) {
//   return  function (dispatch) {
//     return axios.get(`http://localhost:3001/recipe/${id}`)
//    .then( (r) => {return dispatch({
//     type: GET_DETAIL,
//     payload: r.data,
//   })})
//    .catch((e)=> console.log(e))
//    };
// }




export function getDietTypes() {
  return async function (dispatch) {
    let dietTypes = await axios.get(`http://localhost:3001/diets/types`);
    return dispatch({
      type: GET_DIETS,
      payload: dietTypes.data.map((e) => e.name),
    });
  };
}



// export function getDietTypes() {
//   return  function (dispatch) {
//     let dietTypes =  axios.get(`http://localhost:3001/diets/types`)
//     .then( (r) => {return dispatch({
//       type: GET_DIETS,
//       payload: r.data.map((e) => e.name),
//     })}
//     )
//     .catch((e) => console.log(e))
//    return dietTypes
//   };
// }





export function addRecipe(payload) {
  return async function () {
    let newRecipe = await axios.post(
      "http://localhost:3001/recipe/create",
      payload
    );
    console.log(newRecipe);
  };
}


export function getInput(title) {
  return async function (dispatch) {
    try {
      let search = await axios.get(
        `http://localhost:3001/recipe/get?title=${title}`
      );
      return dispatch({
        type: GET_INPUT,
        payload: search.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_RECIPE,
        payload: { data: error.response.data, status: error.response.status },
      });
    }
  };
}


export function orderByAlpha(payload) {
  return {
    type: ORDER_BY_ALPHA,
    payload,
  };
}


export function resetErrors() {
  return {
    type: RESET_ERRORS,
    payload: { data: "", status: "200" },
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload,
  };
}

export const filterByDiet = (payload) => {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
};

// export function orderByAlpha(payload) {
//   return async function (dispatch) {
//     let ordenado = await axios.get(
//       `http://localhost:3001/recipe/order/${payload}`
//     );

//     return dispatch({
//       type: "ORDER_BY_ALPHA",
//       payload: ordenado.data,
//     });
//   };
// }

// export const filterByDiet = (payload) => {

//   return async function (dispatch) {
//     let diet = await axios.get(
//       `http://localhost:3001/recipe/get/${payload}`
//     );
//     return dispatch({
//       type: "FILTER_BY_DIET",
//       payload: diet.data,
//     });
//   };
// };
