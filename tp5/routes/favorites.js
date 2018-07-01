var express = require('express');
var router = express.Router();
var controller= require('../controllers/dogsController');

//---------------filtro favoritos---------------------
router.get('/', controller.favoritesAll);//favoritos

router.get('/:page', controller.favoritesPage);//paginacion favoritos 

module.exports = router;


