const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
let PORT = 3000

//MongoDB
const dbBucket = "mongodb+srv://pete:peterparker@chuanprojectcluster.07gng.mongodb.net/coffeeDB?retryWrites=true&w=majority"

const mongoose = require('mongoose')
mongoose.connect(dbBucket, { useUnifiedTopology: true, useNewUrlParser: true })

//Middlewares
app.use(cors())

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */

 app.use(express.urlencoded({
    extended: true
  })); 
 app.use(express.json());
 
var coffeeRouter = require('./routes/coffees')
var cartItemRouter = require('./routes/cartItems')
var sentedItemRouter = require('./routes/sentedItems')

app.use('/coffees', coffeeRouter)
app.use('/cartItems', cartItemRouter)
app.use('/sentedItems', sentedItemRouter)

app.get('/', (req,res) => {
    res.send('Database Connected Successfully at port ' + PORT)
})

app.listen(PORT, () => {
    console.log('server is listening at http://localhost:3000/')
})

