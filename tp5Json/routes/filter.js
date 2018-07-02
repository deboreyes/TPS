var express = require('express');
var router = express.Router();
var controller= require('../controllers/dogsController');

router.post('/',controller.filter); //button filtrar

router.get('/:page',controller.filter);//paginacion filtro

module.exports = router;


