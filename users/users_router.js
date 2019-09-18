const express = require('express');

const db = require('../users/users_model');
const restricted = require('../auth/restricted-middleware.js');

const router = express.Router();

router.get('/', restricted, (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log('Get Users Error', err)
            res.status(500).json({Error: 'Unable to get Users'})
        })
});

module.exports = router;