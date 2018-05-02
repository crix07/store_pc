'use strict'


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User')

const ProductSchema = new Schema({
  ASIN: {type: String, unique: true},
  DetailPageURL: String,
  image: String,
  name: String,
  price: String,
  Quantity: { type:Number, required:true },
  user: {type: Schema.ObjectId, ref: "Autor"}
});

module.exports = mongoose.model('Product', ProductSchema);
