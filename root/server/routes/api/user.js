const router = require('express').Router();
const controller = require('../../controllers/appController');
const collection = 'User';

router.route('/').get(async (req, res) => {
  controller.findAll(req, res, collection);
});

router.route('/').post(async (req, res) => {
  controller.create(req, res, collection);
});

router.route('/signup').post((req, res) => {
  controller.checkSignup(req, res, collection);
});

router.route('/login').get((req, res) => {
  console.log('checking if session has logged in user');
  controller.verifyLogin(req, res);
});

router.route('/login').post((req, res) => {
  console.log('checking login');
  controller.checkLogin(req, res, collection);
});

router.route('/logout').post((req, res) => {
  controller.logout(req, res);
});

module.exports = router;
