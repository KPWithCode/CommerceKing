const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../build/contracts/Payments.json');
const { Payment } = require('db.js');

const app = new Koa()
const router = new Router()

router.get('/api/getPaymentId')