const Sequelize = require('sequelize')
const db = require('../db')

const OrderInfo = db.define('orderInfo', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    total_price: { // cents
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
})

module.exports = OrderInfo;