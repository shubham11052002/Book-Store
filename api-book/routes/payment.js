const express = require('express');
const paymentcontroller = require('../controllers/PaymentController');
const auth = require('../middleware/auth');
const router = express.Router();
router.post('/create-checkout-session', auth, (req, res) => {
  // console.log("payment route")
  paymentcontroller.doPayment(req, res);

})
router.put('/update/transaction', (req, res) => {
  // console.log('going to update the payment')
  paymentcontroller.updatePayment(req, res);
})
router.get('/transaction', (req, res) => {
  //  console.log('going to fetch transaction')
  paymentcontroller.getTransactions(req, res);
})
router.get('/myorder', (req, res) => {
  paymentcontroller.getMyOrders(req, res);
})
router.post('/review',auth, (req, res) => {
  paymentcontroller.submitReview(req, res);
})
module.exports = router;