const express = require('express');
const router = express.Router();
const { User, BlogPost, Comment } = require('../../models');
const bcrypt = require('bcrypt');

// CREATE a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.user = {
            id:foundUser.user_id,
            email:foundUser.email
        }

        return res.json(foundUser)
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOGIN a user
router.post("/login", async (req, res) => {
    try {
        const foundUser = await User.findOne({
            where:{
                email:req.body.email
            }
        });
        if(!foundUser){
            return res.status(401).json({msg:'invalid user/password combination'})
        }
        if(!bcrypt.compareSync(req.body.password, foundUser.password)){
            return res.status(401).json({msg:'invalid user/password combination'})
        }
        //added session data to user login
        req.session.user = {
            id:foundUser.user_id,
            email:foundUser.email
        }
        
        return res.json(foundUser)
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
        
    }
    });

//USER LOGOUT
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({msg:"logged out"})
});

// get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{ model: BlogPost }],
        });
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: BlogPost }],
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
