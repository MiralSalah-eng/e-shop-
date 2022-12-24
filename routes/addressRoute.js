const { Router } = require('express');
const authController = require('../controller/authController');
const bodyParser = require('body-parser')
const router = Router();
const addressController = require('../controller/addressController')
const orderController = require('../controller/orderController')

router.post('/', bodyParser.urlencoded({ extended: true }) ,addressController.postToAddress)
router.post('/add', bodyParser.urlencoded({ extended: true }) ,addressController.setUserAddres)
router.get('/', addressController.getAddress)

module.exports = router;