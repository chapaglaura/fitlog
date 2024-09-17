const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  // CRUD
  create: function (req, res, collection) {
    console.log(collection, req.body);
    db[collection]
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  update: function (req, res, collection) {
    db[collection]
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body
      )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  delete: function (req, res, collection) {
    db[collection]
      .findById({
        _id: req.params.id,
      })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAll: function (req, res, collection) {
    db[collection]
      .find(req.query)
      .sort({
        name: 1,
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByUserID: function (req, res, collection) {
    console.log(req.params);
    db[collection]
      .findOne({
        userID: req.params.userID,
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res, collection) {
    const user = req.user;
    db[collection]
      .findById(req.params.id)
      .then((dbModel) => res.json({ dbModel, user }))
      .catch((err) => res.status(422).json(err));
  },

  // LOGIN
  verifyLogin: function (req, res) {
    return res.json(req.session.user);
  },
  login: function (req, res, collection) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.json({
        error: {
          message: 'Something went wrong.',
        },
      });
    }

    db[collection]
      .findOne({
        username,
      })
      .then((user) => {
        console.log('user:', user);
        if (!user) {
          res.json({
            error: {
              message: 'Username not found.',
            },
          });
        }
        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            console.log('domatch:', doMatch);
            if (doMatch) {
              console.log('matching');
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save((err) => {
                console.log(err);
                res.json(user);
              });
            }
            res.json({
              error: {
                message: 'Something went wrong.',
              },
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              error: {
                message: err.message,
              },
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          error: {
            message: err.message,
          },
        });
      });
  },
  signup: function (req, res, collection) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.json({
        error: {
          message: 'Something went wrong.',
        },
      });
    }

    db[collection]
      .findOne({
        username,
      })
      .then((userDoc) => {
        if (userDoc) {
          res.json({
            error: {
              message: 'Username already exists.',
            },
          });
        }
        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const user = new db[collection]({
              username,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            res.json(result);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  logout: function (req, res) {
    req.session.destroy();
    res.json(true);
  },
};
