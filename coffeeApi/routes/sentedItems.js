const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const SentedItem = require('../model/SentedItem')
const Coffee = require('../model/CartItem')
const CartItem = require('../model/CartItem')


router.get('/', async (req, res) => {
    const result = await SentedItem.find()
    res.json({
        statusCode: 200,
        data: result
    })
})

router.post('/', async (req, res) => {
    const payload = req.body
    const sentedItem = new SentedItem({
        name: payload.name,
        des: payload.des,
        price: payload.price,
        imgURL: payload.imgURL,
        amount: payload.amount,
        userId: payload.userId
    })
    await sentedItem.save()
    res.status(201).send(sentedItem)
})

router.post('/list', (req, res) => {
    console.log("begin adding to sentedItems")
    const payload = req.body.listData
    console.log(payload)
    var index;
    for (index = 0; payload.length; index++) {
        const sentedItem = new SentedItem({
            name: payload[index].name,
            des: payload[index].des,
            price: payload[index].price,
            imgUrl: payload[index].imgUrl,
            amount: payload[index].amount,
            userId: payload[index].userId
        })
        sentedItem.save()
    }
    res.status(201).send(payload)
})

router.post('/clearCartItems', (req, res) => {
    console.log("clearCartItem")
    CartItem.collection.drop();
    res.status(201).send({ remove: "successful" })
})

module.exports = router
