const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  description: {
    type: Sequelize.TEXT
  },
  type: { 
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
  image: { 
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
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  size: {
    type: Sequelize.STRING,
    defaultValue: '1',
  },
  unit_price: { // in cents
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
})

module.exports = Product
