const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    id: String,
    itemId: String,
    paid: Boolean
})

// model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
    Payment
}