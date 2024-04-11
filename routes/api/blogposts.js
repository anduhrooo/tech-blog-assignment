const express = require('express');
const router = express.Router();

const { BlogPost, User, Comment } = require('../../models');

// GET all blogposts
router.get("/", async (req, res) => {
    try {
        const data = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
    }
});

// GET one blogpost
router.get('/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        }

        const blogpost = blogpostData.get({ plain: true });

        res.status(200).json(blogpost);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// CREATE a new blogpost
router.post('/', async (req, res) => {
    try {
        const blogpostData = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

// UPDATE a blogpost
router.put('/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.update(req.body, {
            where: {
                blogpost_id: req.params.id,
            },
        });

        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        }

        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// DELETE a blogpost
router.delete('/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.destroy({
            where: {
                blogpost_id: req.params.id,
            },
        });

        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        }

        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);



module.exports = router;