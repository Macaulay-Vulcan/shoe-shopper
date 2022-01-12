const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    order_total: { // cents
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Order;