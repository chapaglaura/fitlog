require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dbConfig = require('./config/db.config');
const db = require('./models');

const PORT = process.env.PORT || 3000;
const app = express();

const store = new MongoDBStore({
  uri: dbConfig.url,
  collection: 'sessions',
});

const routes = require('./routes');

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: 'my secret',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
    resave: false,
    saveUninitialized: false,
    store,
  })
);

if (process.env.NODE_ENV === 'production') {
  console.log('IS PROD');
  app.use(express.static('client/build'));
}

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  db.User.findById(req.session.user._id)
    .then((user) => {
      console.log(user, 'user');
      if (user) {
        req.user = user;
        return next();
      }
    })
    .catch((err) => console.log(err));
});

app.get('/api', function (req, res) {
  res.json(req.session.user);
});

app.use(routes);

mongoose
  .connect(dbConfig.url, {})
  .then((res) => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
