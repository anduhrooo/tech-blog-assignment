const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');

// CREATE a new comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            blogpost_id: req.body.blogpost_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
