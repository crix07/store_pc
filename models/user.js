'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
  nombre: { type:String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  role: String,
  productsCart: {
    ASIN: String,
    name: String,
    price: String,
    image: String
  }
})


module.exports = mongoose.model('User', User)
