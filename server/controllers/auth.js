const passport = require('passport');
const db = require('../models');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await new db.User({ name, email, password });
  await db.User.register(newUser, password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).json(user);
  });
};

exports.signin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    if (!user) {
      return res.status(400).json(info.message);
    }

    req.logIn(user, err => {
      if (err) {
        return res.status(500).json(err.message);
      }
    });

    return res.json(user);
  })(req, res, next);
};
