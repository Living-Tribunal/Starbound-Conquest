const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('users', 'user', 'pass', {
    dialect: 'sqlite',
    host: './newusers.db',
});

module.exports = sequelize
