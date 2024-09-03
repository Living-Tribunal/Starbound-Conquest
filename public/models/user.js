const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    salt: {
        type: DataTypes.BLOB,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'user',
})

module.exports = User
