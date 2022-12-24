var express = require('express');
var router = express.Router();

const productDetailsController = require('../controller/productDetailsController');

router.get('/:id',productDetailsController.getProductDetails);

module.exports = router

