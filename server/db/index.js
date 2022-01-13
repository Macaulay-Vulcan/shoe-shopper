//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const ProductInfo = require('./models/ProductInfo')
const OrderInfo = require('./models/OrderInfo')
const Order = require('./models/Order')

//associations could go here!
Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

ProductInfo.hasMany(OrderInfo)
OrderInfo.belongsTo(ProductInfo)

Order.hasMany(OrderInfo)
OrderInfo.belongsTo(Order)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Product,
    ProductInfo,
    Order,
    OrderInfo
  },
}
