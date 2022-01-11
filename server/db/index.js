//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Guest = require('./models/Guest')
const Product = require('./models/Product')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Guest,
    Product,
  },
}
