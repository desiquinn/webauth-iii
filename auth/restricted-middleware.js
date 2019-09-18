const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log("Middleware 401 Error:", err)
                res.status(401).json({message: 'You Shall Not Pass'});
            } else {
                req.user = {username: decodedToken.username};
                next();
            }
        })
    } else {
        res.status(400).json({message: 'no credentials provided'});
    }
}