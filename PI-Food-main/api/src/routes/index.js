const { Router } = require('express');
const Recipe = require('./Recipe')
const Diets = require('./Diets')
// Importar todos los routers;

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', Recipe)
router.use('/diets', Diets)

module.exports = router;
