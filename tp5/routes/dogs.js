var express = require('express');
var router = express.Router();
var controller= require('../controllers/dogsController');
var favController= require('../controllers/favoritesController');

router.get('/', controller.getImages);//primer carga

router.get('/all/:page', controller.getImagesPage);//paginacion sin filtro

// ---------------------agregar o quitar favoritos---------------------
router.put('/', favController.fav);

module.exports = router;


