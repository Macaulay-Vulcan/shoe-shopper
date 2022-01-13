const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: 'other',
    validate: {
      isIn: [['basketball', 'runner', 'boot', 'lifestyle', 'other']],
    },
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.ariadellcorta.com/wp-content/uploads/2017/04/Photo-Image-Coming-Soon-Icon-1.jpg',
  },
  unit_price: {
    // in cents
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});

module.exports = Product;
