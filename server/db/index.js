//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const OrderInfo = require('./models/OrderInfo')
const Order = require('./models/Order')

//associations could go here!
Product.hasMany(OrderInfo)
OrderInfo.belongsTo(Product)

Order.hasMany(OrderInfo)
OrderInfo.belongsTo(Order)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderInfo
  },
}
