const router = require('express').Router();
const controller = require('../../controllers/appController');
const collection = 'User';

router.route('/signup').post((req, res) => {
  controller.signup(req, res, collection);
});

router.route('/login').get((req, res) => {
  controller.verifyLogin(req, res);
});

router.route('/login').post((req, res) => {
  controller.login(req, res, collection);
});

router.route('/logout').post((req, res) => {
  controller.logout(req, res);
});

module.exports = router;
