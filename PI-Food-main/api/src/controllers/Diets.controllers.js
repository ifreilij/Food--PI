const { Sequelize } = require("sequelize");
const { Recipe, Diets } = require("../db");

const dietTypesDb = [
  "gluten free",
  "vegetarian",
  "vegan",
  "pescatarian",
  "paleolithic",
  "primal",
  "fodmap friendly",
  "whole 30",
  "dairy free",
];

const getDietTypes = async (req, res, next) => {
  try {
    dietTypesDb.forEach((e) => {
      Diets.findOrCreate({
        where: { name: e },
      });
    });
    const dietTypes = await Diets.findAll();
    res.send(dietTypes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getDietTypes
};
