const Router = require('@koa/router');
const { Payment } = require('../../models/payModel');
const router = new Router()

const items = {
    '1': {id: 1, url: 'http://UrlToDownloadItem1' },
    '2': {id: 2, url: 'http://UrlToDownloadItem2' },

}
router.get('/api/getPaymentId/:itemId', async ctx => {
    const paymentId = (Math.random() * 1000).toFixed(0);
    await Payment.create({
        id: paymentId,
        itemId: ctx.params.itemId,
        paid: false
    })
    ctx.body = {
        paymentId
    }
})
router.get('/api/getItemUrl/:paymentId', async ctx => {
    const payment = await Payment.findOne({id: ctx.params.paymentId})
    if (payment && payment.paid === true) {
        ctx.body = {
            url: items[payment.itemId].url
        }
    } else {
        ctx.body = {
            url:''
        };
    }
});

module.exports = router