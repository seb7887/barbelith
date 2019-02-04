const mongoose = require('mongoose');

const db = require('../models');

const fields = '_id email createdAt updatedAt';

// READ
exports.getUsers = async (req, res) => {
  const users = await db.User.find().select(fields);
  return res.status(200).json(users);
};

exports.getUserById = async (req, res, next, id) => {
  const user = await db.User.findOne({ _id: id });
  req.profile = user;

  const profileId = mongoose.Types.ObjectId(req.profile._id);

  if (profileId.equals(req.user._id)) {
    req.isAuthUser = true;
    return next();
  }
  return next();
};

exports.getAuthUser = (req, res) => {
  if (!req.isAuthUser) {
    res.status(403).json({
      message: 'You are not authenticated. Please sign in or sign up'
    });
    return res.redirect('/signin');
  }
  return res.status(200).json(req.user);
};

// DELETE
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!req.isAuthUser) {
    return res.status(400).json({
      message: 'Unauthorized to perform this action'
    });
  }
  const deletedUser = await db.User.findByIdAndDelete({ _id: userId });
  return res.status(200).json(deletedUser);
};
