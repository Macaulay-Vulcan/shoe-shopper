const Sequelize = require('sequelize');
const db = require('../db');

const ProductInfo = db.define('productInfo', {
  color: {
    type: Sequelize.STRING,
    defaultValue: 'multi',
    validate: {
      isIn: [
        [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'purple',
          'white',
          'black',
          'brown',
          'multi',
        ],
      ],
    },
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
})

module.exports = ProductInfo;
