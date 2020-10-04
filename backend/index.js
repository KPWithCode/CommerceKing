const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../build/contracts/Payments.json');
const { Payment } = require('./db.js');
const mongoose = require('mongoose');


const app = new Koa()
const router = new Router()

router.get('/api/getPaymentId/:itemId', async ctx => {
    ctx.body = 'hello world'
})

app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())


const DB = require('./config/keys').mongoURI

//  Connect to Mongo
mongoose.connect(DB,{useNewUrlParser: true})
.then(() => console.log('Mongo DB connected 🚀🚀🚀'))
.catch(err => console.log(err))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Commerce commencing on port ${port} 🛍️🛍️🛍️`))
