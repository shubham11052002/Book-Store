const Book = require('../model/Books');
async function addBook(req, res) {
    try {
        console.log(req.body,)
        let book = new Book(req.body)
        await book.save();
        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: flase })
    }
}
async function getBooks(req, res) {
    try {
        let books = await Book.find({});
        console.log(books);
        res.status(200).send({ success: true, data: books });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    addBook,
    getBooks
}