const db = require('../models');

const fields = '_id email createdAt updatedAt';

exports.getUsers = async (req, res) => {
  const users = await db.User.find().select(fields);
  return res.status(200).json(users);
};
