const {Router} = require('express')
const {getFood,getRecipeById, postRecipe,orderAlpha, getByDiet } = require('../controllers/Recipe.controllers')
const router = Router()

router.get('/get', getFood)
router.get('/:id', getRecipeById)
router.post('/create', postRecipe)


// router.get('/get/:diet', getByDiet)
// router.get('/order/:orderAlpha', orderAlpha)
// router.get('/orderscore/:orderByScore', functOrderByScore)
module.exports = router;