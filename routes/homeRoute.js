const express = require('express');
const router = express.Router()
const productController = require('../controller/productController');
const {isAdmin} = require('../middleware/authmiddleware')

router.get('/', productController.getProducts);
router.post('/remove', isAdmin,productController.removeProduct);

module.exports = router

