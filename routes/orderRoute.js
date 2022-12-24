const express = require('express');
const router = express.Router()
const orderController = require('../controller/orderController');
const bodyParser = require('body-parser')

router.post('/', bodyParser.urlencoded({ extended: true }),orderController.postOrder);
router.get('/', orderController.getOrder );
router.post('/cancel',bodyParser.urlencoded({ extended: true }),orderController.cancelOrder );
router.post('/deleteall',bodyParser.urlencoded({ extended: true }),orderController.emptyOrdert );
module.exports = router

