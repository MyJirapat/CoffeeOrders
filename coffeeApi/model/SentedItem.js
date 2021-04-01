const mongoose = require('mongoose')

const sentedItem = mongoose.Schema({
    name: String,
    des: String,
    price: Number,
    imgUrl: String,
    amount: Number,
    userId: String
})

module.exports = mongoose.model('SentedItem', sentedItem)
