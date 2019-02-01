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
