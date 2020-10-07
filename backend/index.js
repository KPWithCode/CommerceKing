const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../build/contracts/Payments.json');
// const { Payment } = require('./models/payModel');
const mongoose = require('mongoose');
// const paymentRouter = require('./routes/api/payments');


const app = new Koa()
const router = new Router()

// const items = {
//     '1': {id: 1, url: 'http://UrlToDownloadItem1' },
//     '2': {id: 2, url: 'http://UrlToDownloadItem2' },

// }
// router.get('/api/getPaymentId/:itemId', async ctx => {
//     const paymentId = (Math.random() * 1000).toFixed(0);
//     await Payment.create({
//         id: paymentId,
//         itemId: ctx.params.itemId,
//         paid: false
//     })
//     ctx.body = {
//         paymentId
//     }
// })
// router.get('/api/getItemUrl/:paymentId', async ctx => {
//     const payment = await Payment.findOne({id: ctx.params.paymentId})
//     if (payment && payment.paid === true) {
//         ctx.body = {
//             url: items[payment.itemId].url
//         }
//     } else {
//         ctx.body = {
//             url:''
//         };
//     }
// });
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())



// app.use('/payments', paymentRouter);

const DB = require('./config/keys').mongoURI
//  Connect to Mongo
mongoose.connect(DB,{useNewUrlParser: true})
.then(() => console.log('Mongo DB connected 🚀🚀🚀'))
.catch(err => console.log(err))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Commerce commencing on port ${port} 🛍️🛍️🛍️`))


const listenToEvents = () => {
    // 9545 is the default host when deploying smart contracts to ganache
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545');
    const networkId = '5777';

    const paymentProcessor = new ethers.Contract(
        PaymentProcessor.networks[networkId].address,
        PaymentProcessor.abi,
        provider
    )
    paymentProcessor.on('PaymentDone', async (payer, amount, paymentId,date) => {
        console.log(`
        from ${payer}
        amount ${amount}
        paymentId ${paymentId}
        date ${(new Date(date.toNumber() * 1000)).toLocaleString()}
        `)
        const payment = await Payment.findOne({id: paymentId});
        if (payment) {
            payment.paid = true;
            await payment.save();
        }
    });
}
listenToEvents()