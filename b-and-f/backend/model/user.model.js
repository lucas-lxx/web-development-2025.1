const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  course: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ira: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;