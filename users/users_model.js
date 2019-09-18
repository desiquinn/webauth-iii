const db = require('../data/config.js');

module.exports = {
    add, 
    find, 
    findBy, 
    findById
};

function find() {
    return db('users')
        .select('id', 'username', 'password', 'department')
};

function findById(id) {
    return db('users')
        .where({id})
        .first()
};

function add(user) {
    return db('users')
        .insert(user)
        .then(([id]) => findById(id))
};


function findBy(filter) {
    return db('users')
        .where(filter)
};