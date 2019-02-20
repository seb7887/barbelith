const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: 'Post content is required'
    },
    image: {
      type: String
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now() },
        postedBy: { type: ObjectId, ref: 'User' }
      }
    ],
    postedBy: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now() }
  },
  // don't want to create our indices every time (performance hit)
  { autoIndex: false }
);

const autoPopulatePostedBy = function (next) {
  const fields = '_id name avatar';
  this.populate('postedBy', fields);
  this.populate('comments.postedBy', fields);
  next();
}

// it populated 'postedBy' every time we do a findOne / find query
postSchema
  .pre('findOne', autoPopulatePostedBy)
  .pre('find', autoPopulatePostedBy);

// create index on keys for more performant querying/post sorting
postSchema.index({ postedBy: 1, createdAt: 1 });

module.exports = mongoose.model('Post', postSchema);
