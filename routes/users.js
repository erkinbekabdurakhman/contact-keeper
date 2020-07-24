const express = require('express');
const router = express.Router()

// route    POST api/users
// desc     Register a user
// access   public
router.post('/api/users', (req, res) => {
    res.send('Register User')
});


module.exports = router;

