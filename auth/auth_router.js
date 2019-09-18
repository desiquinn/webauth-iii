const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../users/users_model');
const secrets = require('../config/secrets.js');

const router = express.Router();

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash; // why are we doing this?

    // console.log("Logout Sessions:", req.session)
    // console.log("Logout Token:", req.headers.authorization)

    db.add(user)
        .then(saved => {
            const token = getToken(user);
            res.status(201).json({saved, token});
        })
        .catch(err => {
            console.log("Register Error:", err);
            res.status(500).json({message: "Error While Registering New User"})
        })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // console.log("Logout Sessions:", req.session)
    // console.log("Logout Token:", req.headers.authorization)

    db.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = getToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Invalid Credentials'});
            }
        })
        .catch(err => {
            console.log("Login Error:", err);
            res.status(500).json({message: "Error While Loging In"})
        })
});

function getToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;