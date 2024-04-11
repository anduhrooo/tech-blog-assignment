const { BlogPost } = require('../models')

const blogPostData = [
    {
      "title": "Tech",
      "content": "this is a tech blog.",
      "user_id": "1",
    },
    {
      "title": "cybersecurity",
      "content": "taking a byte out of crime!",
      "user_id": "2",
    },
    {
      "title": "music",
      "content": "techno",
      "user_id": "3",
    }
  ]

const seedBlogPostData = () => BlogPost.bulkCreate(blogPostData);

module.exports = seedBlogPostData;