const express = require('express');
const router = express.Router()

// route    POST api/users
// desc     Get Login in user
// access   public
router.get('/api/auth', (req, res) => {
    res.send('Get Logged in User')
});


// route    POST api/users
// desc     Auth user & get token
// access   public
router.post('/api/auth', (req, res) => {
    res.send('Post Logged in User')
});

module.exports = router;