const router = require('express').Router();
const userRoutes = require('./users');
const blogPostRoutes = require('./blogposts');
const commentRoutes = require('./comments');

router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
