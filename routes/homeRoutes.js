const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');

router.get('/sessiondata', (req, res)=>{
    res.json(req.session)
})  

router.get('/', async (reg, res) => {
    res.render('homepage');
});



module.exports = router;