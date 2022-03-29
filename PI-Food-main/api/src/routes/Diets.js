const { Router } = require("express");
const { getDietTypes } = require("../controllers/Diets.controllers");
const router = Router();

router.get("/types", getDietTypes);
module.exports = router;
