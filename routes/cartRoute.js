const express = require('express');
const router = express.Router()
const cartController = require('../controller/cartController');
const bodyParser = require('body-parser')

router.post('/', bodyParser.urlencoded({ extended: true }),cartController.postCart );
router.get('/',cartController.getCart );
router.post('/save',bodyParser.urlencoded({ extended: true }),cartController.postSave );
router.post('/delete',bodyParser.urlencoded({ extended: true }),cartController.deleteProduct );
router.post('/deleteall',bodyParser.urlencoded({ extended: true }),cartController.emptyCart );
module.exports = router

