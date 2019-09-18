const express = require('express');
const AuthRouter = require('../auth/auth_router.js');
const UsersRouter = require('../users/users_router');

server = express();

server.use(express.json());
server.use('/api/auth', AuthRouter);
server.use('/api/users', UsersRouter);

module.exports = server;