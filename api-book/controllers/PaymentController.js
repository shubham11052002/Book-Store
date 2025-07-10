const Transaction = require('../models/Transaction');
const ProductReview = require('../models/ProductReview')
const stripe = require('stripe')(STRIPE_SECRET_KEY);
async function doPayment(req, res) {
    try {
        // console.log(req.body, 'req.body')
        let { products, data } = req.body;
        const lineItems = products.map((product) => ({

            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.bookName,
                },
                unit_amount: product.price * 100
            },
            quantity: 1
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/payment/success',
            cancel_url: 'http://localhost:5173/payment/fail'
        })
        console.log(session);
        if (session) {
            let transaction = new Transaction(data);
            transaction.products = products;
            transaction.transactionId = session.id;
            await transaction.save();
            // console.log(transaction._id, '_id')
        }
        res.status(200).send({ data: session.id })
    } catch (err) {
        console.log(err.message, 'msg')
    }
}

async function updatePayment(req, res) {
    try {
        // console.log(req.body, " req.body")
        let transaction = await Transaction.findOne({ transactionId: req.body.transactionId })
        transaction.status = 'Success'
        await transaction.save()
        res.status(200).send({ message: 'status has completed' })
    } catch (error) {
        console.log(error, " error in update payment controllers")
        res.status(400).send({ message: 'something went wrong...' })
    }
}

async function getTransactions(req, res) {
    try {
        let transaction = await Transaction.find({});
        //  console.log(transaction, ' transaction')
        res.status(200).send({ success: true, data: transaction });
    } catch (error) {
        console.log(error, ' error comes in getTransactions')
        res.status(400).send({ success: false, message: 'something went wrong in Transections' })
    }
}

async function getMyOrders(req, res) {
    try {
        let email = req.query.email;
        let myorder = await Transaction.find({ email: email })
        console.log(myorder, ' myorders')
        res.status(200).send({ success: true, data: myorder })
    } catch (error) {
        res.status(400).send({ success: false, message: ' ' })
        // console.log(error, ' error comes in controllers of my orders')
    }
}

async function submitReview(req, res) {
    try {
        // console.log(req.body, ' req.body')
        const productReview = new ProductReview(req.body);
        productReview.user = req.user.id;
        await productReview.save();
        res.status(200).send()
    } catch (error) {-
        console.log(error.message)
        res.status(400).send()
    }
}

module.exports = {
    doPayment,
    updatePayment,
    getTransactions,
    getMyOrders,
    submitReview
}