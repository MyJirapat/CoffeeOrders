const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const Coffee = require('../model/Coffee')

router.get('/',async (req,res) => {
    const result = await Coffee.find()
    res.json( {
        statusCode: 200,
        data: result 
    }) })

router.get('/:id',(req, res) => {
    //get param
    const { id } = req.params
    const result = coffees.find( item => item.coffees.id == id)
    res.json(result)
})

router.post('/', async (req, res) => {
    const payload = req.body
    const coffee = new Coffee({
        name: payload.name,
        des: payload.des,
        price: payload.price,
        imgURL: payload.imgURL
    })
    await coffee.save()
    res.status(201).send(coffee)
})

//delete item from cart
router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id
    console.log('Deleting Item as ID:' + id)
    var removeCallback = Coffee.findOneAndDelete({ _id: id}, res.body, function(err, data) {
        if(!err) {
            console.log("deleted")
            res.send({deleted: id })
        }
    })
})

router.post('/update/:id', async(req, res) => {
    var payload = req.body
    const id = req.params.id
    await Coffee.findByIdAndUpdate(id, { name: payload.name,des: payload.des, price: payload.price,imgURL: payload.imgURL })
    res.status(201).send({status: id + " :removed"})
})

module.exports = router
