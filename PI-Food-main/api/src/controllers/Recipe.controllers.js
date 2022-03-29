const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const apiInfo = await apiUrl.data.results?.map((el) => {
    return {
      id: el.id,
      title: el.title,
      summary: el.summary,
      dietTypes: el.diets,
      spoonacularScore: el.spoonacularScore,
      healthScore: el.healthScore,
      image: el.image,
      analyzedInstructions: el.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };
  });

  return apiInfo;
};
const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
};

// const getApiInfo = () => {
//   return axios
//     .get(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
//     )
//     .then((results) => {
//       const apiInfo = results.data.results?.map((el) => {
//         return {
//           id: el.id,
//           title: el.title,
//           summary: el.summary,
//           dietTypes: el.diets,
//           spoonacularScore: el.spoonacularScore,
//           healthScore: el.healthScore,
//           image: el.image,
//           analyzedInstructions: el.analyzedInstructions[0]?.steps.map((e) => {
//             return {
//               number: e.number,
//               step: e.step,
//             };
//           }),
//         };
//       });
//       return apiInfo
//     })
//     .catch((e) => console.log(e));
// };

// const getAllRecipe = async () => {
//   const apiInfo = await getApiInfo();
//   const dbInfo = await getDbInfo();
//   const infoTotal = dbInfo.concat(apiInfo);
//   return infoTotal;
// };
const getAllRecipe = () => {
  return Promise.all([getApiInfo(), getDbInfo()])
    .then((r) => {
      let arreglofinal = r[0].concat(r[1]);
      return arreglofinal;
    })

    .catch((e) => {
      console.log(e);
    });
};

const getFood = async (req, res, next) => {
  try {
    const { title } = req.query;
    let allRecipes = await getAllRecipe();
    // aca tengo tanto de la API como la DB
    if (title) {
      let recipeByQuery = await allRecipes.filter((e) =>
        e.title.toLowerCase().includes(title.toString().toLowerCase())
      );
      if (recipeByQuery.length) {
        let recipes = recipeByQuery.map((e) => {
          return {
            image: e.image,
            title: e.title,
            dietTypes: e.dietTypes ? e.dietTypes : e.diets.map((e) => e.name),
            healthScore: e.healthScore,
            id: e.id,
            spoonacularScore: e.spoonacularScore,
          };
        });
        return res.status(200).send(recipes);
      }
      res.status(404).send("No existe esa receta");
    } else {
      let recipes = allRecipes.map((e) => {
        return {
          image: e.image ? e.image : "Esta receta no tiene imagen",
          title: e.title,
          dietTypes: e.dietTypes ? e.dietTypes : e.diets.map((e) => e.name),
          healthScore: e.healthScore,
          id: e.id,
          spoonacularScore: e.spoonacularScore,
        };
      });
      return res.status(200).send(recipes);
    }
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  let validate = id.includes("-");
  if (validate) {
    try {
      const idDB = await Recipe.findByPk(id, {
        include: {
          model: Diets,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.status(200).json(idDB);
    } catch (error) {
      next(error);
    }
  } else
    try {
      if (id) {
        const idApi = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );

        if (idApi) {
          const dataApi = {
            image: idApi.data.image,
            title: idApi.data.title,
            dishTypes: idApi.data.dishTypes,
            dietTypes: idApi.data.diets,
            spoonacularScore: idApi.data.spoonacularScore,
            summary: idApi.data.summary,
            healthScore: idApi.data.healthScore,
            analyzedInstructions: idApi.data.analyzedInstructions[0]?.steps.map(
              (e) => {
                return {
                  number: e.number,
                  step: e.step,
                };
              }
            ),
          };
          return res.status(200).json(dataApi);
        } else {
        }
      }
    } catch (error) {
      next(error).send("Recipe not found");
    }
};

const postRecipe = async (req, res, next) => {
  try {
    const {
      title,
      summary,
      healthScore,
      spoonacularScore,
      analyzedInstructions,
      dietTypes,
    } = req.body;

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      spoonacularScore,
      analyzedInstructions,
    });
    let dietTypesRecipeDb = await Diets.findAll({
      where: { name: dietTypes },
    });
    newRecipe.addDiet(dietTypesRecipeDb);
    res.status(200).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

//

module.exports = {
  getFood,
  getAllRecipe,
  getRecipeById,
  postRecipe,
  // orderAlpha,
  // getByDiet,
};

// const orderAlpha = async (req, res) => {
//   const { orderAlpha } = req.params;
//   try {
//     const order = await getAllRecipe();

//     if (orderAlpha === "ASC") {
//       await order.sort(function (a, b) {
//         if (a.title > b.title) return 1;
//         if (b.title > a.title) return -1;
//         return 0;
//       });
//     } else {
//       await order.sort(function (a, b) {
//         if (a.title > b.title) return -1;
//         if (b.title > a.title) return 1;
//         return 0;
//       });
//     }
//     return res.status(200).send(order);
//   } catch (error) {
//     next(error);
//   }
// };

// const getByDiet = async (req, res) => {
//   const { diet } = req.params;

//   try {
//     const allRecipes = await getAllRecipe();

//     if (diet) {
//         let recipeByDiet = await allRecipes.filter((e) =>
//         e.dietTypes?.some((e) => e.toLowerCase() === diet.toLowerCase())
//       );

//       if (recipeByDiet.length) {
//         let recipes = recipeByDiet.map((e) => {
//           return {
//             image: e.image,
//             title: e.title,
//             dietTypes: e.dietTypes ? e.dietTypes : e.diets.map((e) => e.name),
//             healthScore: e.healthScore,
//             id: e.id,
//             spoonacularScore: e.spoonacularScore,
//           };
//         });
//         return res.status(200).json(recipes);
//       }
//       if(!recipeByDiet.length){
//       console.log("no hay recetas con esta dieta " + diet)
//       return res.send("No hay recetas con esa dieta")
//          }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
