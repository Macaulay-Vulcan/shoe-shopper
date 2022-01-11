const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const Product = db.define('product', {
  type: {

  },
  brand: {

  },
  size: {

  },
  image: {

  },
  color: {

  },
  quantity: {

  },
  price: {

  }
})

module.exports = Product
