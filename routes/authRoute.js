const { Router } = require('express');
const authController = require('../controller/authController');
const {noAuth , requireAuth} = require('../middleware/authmiddleware')
const bodyParser = require('body-parser')

const router = Router();

router.get('/signup',noAuth, authController.getSignUp);
router.post('/signup',noAuth, bodyParser.urlencoded({ extended: true }) ,authController.postSignup);
router.get('/login',noAuth, authController.getLogin);
router.post('/login',noAuth, bodyParser.urlencoded({ extended: true }),authController.postLogin);
router.get('/logout',requireAuth,authController.logout);

module.exports = router;