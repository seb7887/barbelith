const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true, // no whitespaces = " hello " -> "hello"
      lowercase: true,
      unique: true,
      required: 'Email is required'
    },
    name: {
      type: String,
      trim: true,
      unique: true,
      minlength: 4,
      maxlength: 12,
      required: 'Name is required'
    },
    avatar: {
      type: String,
      required: 'Avatar image is required',
      default: '/static/images/avatar.png'
    },
    about: {
      type: String,
      trim: true
    },
    following: [{ type: ObjectId, ref: 'User' }],
    followers: [{ type: ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const autoPopulateFollowingAndFollowers = function (next) {
  const fields = '_id name avatar'
  this.populate('following', fields);
  this.populate('followers', fields);
  next();
}

userSchema.pre('findOne', autoPopulateFollowingAndFollowers);

// passport takes our schema and sets up a passport local authentication strategy
// using our email as username field
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// it give us a better 'unique' error, rather than '11000 duplicate key'
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
