const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
const bookcontrollers = require('../controllers/bookcontrollers');
router.post('/add/book', (req, res) => {
    bookcontrollers.addBook(req, res);
});
router.get('/books', (req, res) => {
    console.log('we are i get books')
    bookcontrollers.getBooks(req, res)
})
module.exports = router;