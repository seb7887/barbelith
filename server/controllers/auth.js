const passport = require('passport');
const db = require('../models');

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await new db.User({ name, email, password });
  await db.User.register(newUser, password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.json(user.name);
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

exports.signout = (req, res) => {
  res.clearCookie('barbelith.sid');
  req.logout();
  res.status(200).json({ message: 'You are now signed out' });
};
