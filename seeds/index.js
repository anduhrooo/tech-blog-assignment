const seedUserData = require('./userData');
const seedBlogPostData = require('./blogPostData');
const seedCommentData = require('./commentData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUserData();
  console.log('\n----- USERS SEEDED -----\n');

  await seedBlogPostData();
  console.log('\n----- BLOG POSTS SEEDED -----\n');

  await seedCommentData();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();
