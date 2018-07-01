var express = require('express');
var router = express.Router();
var controller= require('../controllers/dogController');

router.get('/:id', controller.getImage)

module.exports = router;
