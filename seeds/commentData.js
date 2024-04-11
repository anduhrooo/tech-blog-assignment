const { Comment } = require('../models')

const commentData =
[
    {
      "content": "yes, this is a tech blog.",
      "user_id": "1",
      "blogpost_id": "1",
    }
  ]

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData;