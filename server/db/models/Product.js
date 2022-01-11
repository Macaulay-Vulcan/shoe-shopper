const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const Product = db.define('product', {
  type: { // DECIDE UPON WHAT TYPES OF SHOES!
    type: Sequelize.STRING,
    defaultValue: 'other',
    validate: {
      isIn: [['basketball', 'runner', 'boot', 'other']],
    }
  },
  brand: {
    type: Sequelize.STRING,
    defaultValue: 'other',
    validate: {
      isIn: [['Nike', 'Adidas', 'Reebok', 'other']]
    }
  },
  image: { // revisit and work on extension/filename validation
    type: Sequelize.STRING,
    defaultValue: 'https://www.ariadellcorta.com/wp-content/uploads/2017/04/Photo-Image-Coming-Soon-Icon-1.jpg',
  },
  color: {
    type: Sequelize.STRING,
    defaultValue: 'multi',
    validate: {
      isIn: [['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white', 'black', 'brown', 'multi']],
    }
  },
  price: { // might need to check later
    type: Sequelize.INTEGER,
    validate: {
      isFloat: true,
    },
  },
})

module.exports = Product
