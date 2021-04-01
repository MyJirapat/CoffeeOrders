const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coffeeSchema = new Schema({
    name: String,
    des: String,
    price: Number,
    imgURL: String
})

const CoffeeModel = mongoose.model('Coffee', coffeeSchema)

module.exports =  CoffeeModel
