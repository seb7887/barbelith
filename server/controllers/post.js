const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');

const db = require('../models');

const imageUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    // storing images giles up to 1mb
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith('image/')) {
      next(null, true);
    } else {
      next({ message: `That filetype isn't allowed!` }, false);
    }
  }
};

exports.uploadImage = multer(imageUploadOptions).single('image');

exports.resizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `/static/uploads/${
    req.user.name
    }-${Date.now()}.${extension}`;
  const image = await jimp.read(req.file.buffer);
  await image.resize(750, jimp.AUTO);
  await image.write(`./${req.body.image}`);
  return next();
};

exports.addPost = async (req, res) => {
  const fields = '_id name avatar';
  req.body.postedBy = req.user._id;
  const post = await new db.Post(req.body).save();
  await db.Post.populate(post, {
    path: 'postedBy',
    select: fields
  });
  return res.status(200).json(post);
};

exports.getPostById = async (req, res, next, id) => {
  const post = await db.Post.findOne({ _id: id });
  req.post = post;

  const posterId = mongoose.Types.ObjectId(req.post.postedBy._id);
  if (req.user && posterId.equals(req.user._id)) {
    req.isPoster = true;
    return next();
  }
  return next();
};

exports.getPostsByUser = async (req, res) => {
  const posts = await db.Post.find({ postedBy: req.profile._id }).sort({
    createdAt: 'desc'
  });
  return res.status(200).json(posts);
};

exports.getPostFeed = async (req, res) => {
  const { following, _id } = req.profile;

  following.push(_id);
  const posts = await db.Post.find({ postedBy: { $in: following } }).sort({
    createdAt: 'desc'
  });
  return res.status(200).json(posts);
};
