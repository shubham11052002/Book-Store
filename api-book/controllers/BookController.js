const Book = require("../models/Book");
const ProductReview = require('../models/ProductReview');
const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = {
  cloud_name: "dmvkdb242",
  api_key: 829329545992856,
  api_secret: "4pNMsXoXu3GkLGEwTf2Y9wKELNY"
};

async function addBook(req, res) {
  try {
    // console.log(req.body, "req.body");
    if (req.file) {
      cloudinary.config({
        cloud_name: "dmvkdb242",
        api_key: 829329545992856,
        api_secret: "4pNMsXoXu3GkLGEwTf2Y9wKELNY"
      });
      const upload = await cloudinary.uploader.upload(req.file.path);
      req.body.bookImage = upload.secure_url;
    }
    let book = new Book(req.body);
    // console.log(req.body.isDiscountApplicable);
    if (req.body.isDiscountApplicable === "on") {
      if (req.body.discountType === "Fixed") {
        book.finalPrice = req.body.price - req.body.discountedUnit;
      } else {
        book.finalPrice =
          req.body.price - (req.body.price * req.body.discountedUnit) / 100;
      }
    } else {
      req.body.finalPrice = req.body.price;
    }
    if (req.body.isDiscountApplicable === "on") {
      const price = parseFloat(req.body.price);
      const discountedUnit = parseFloat(req.body.discountedUnit);

      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: "Invalid price value" });
      }

      if (isNaN(discountedUnit) || discountedUnit < 0) {
        return res.status(400).json({ error: "Invalid discount value" });
      }

      if (req.body.discountType === "Fixed") {
        book.finalPrice = price - discountedUnit;
      } else {
        book.finalPrice = price - (price * discountedUnit) / 100;
      }

      if (book.finalPrice < 0) {
        return res
          .status(400)
          .json({ error: "Final price cannot be negative" });
      }
    } else {
      const price = parseFloat(req.body.price);
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: "Invalid price value" });
      }
      book.finalPrice = price;
    }
    await book.save();
    res.status(200).send({ success: true, message: "Data Saved Successfully" });
  } catch (err) {
    console.log(err);
  }
}

async function getBooks(req, res) {
  try {
    const search = req.query.search || "";
    const books = await Book.find({
      bookName: new RegExp(search, "i")
    }).sort("-created_at");

    res.status(200).json({
      success: true,
      data: books
    });
  } catch (err) {
    console.error("Error in getBooks:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching books",
      error: err.message
    });
  }
}

async function getBooks(req, res) {
  try {
    console.log("here")
    let books = await Book.find({
      bookName: new RegExp(req.query.search, "i")
    }).sort("-created_at");

    res.status(200).send({ success: true, data: books });
  } catch (err) {
    res.status(200).send({ success: true, message: "Some Thing went wrong" });
  }
}

async function getBookForEdit(req, res) {
  try {
    let id = req.params.id;
    let book = await Book.findOne({ _id: id });
    res.status(200).send({ success: true, data: book });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "something went wrong" });
  }
}


async function editBook(req, res) {
  try {
    const id = req.params.id;
    let book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    book.bookName = req.body.bookName;
    book.authorName = req.body.authorName;
    book.bookDescription = req.body.bookDescription;
    book.price = req.body.price;
    book.isDiscountApplicable = req.body.isDiscountApplicable;
    book.binding = req.body.binding;
    book.returnPolicy = req.body.returnPolicy;
    book.language = req.body.language;
    book.pages = req.body.pages;
    book.status = req.body.status;
    book.category = req.body.category;
    book.discountType = req.body.discountType;
    book.discountedUnit = req.body.discountedUnit;
    book.edition = req.body.edition;
    book.seller = req.body.seller;
    book.publisher = req.body.publisher;
    book.quantityAvailable = req.body.quantityAvailable;

    if (
      req.body.price !== undefined ||
      req.body.isDiscountApplicable !== undefined ||
      req.body.discountType !== undefined ||
      req.body.discountedUnit !== undefined
    ) {
      const price = parseFloat(book.price);
      if (isNaN(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid price value"
        });
      }

      if (
        book.isDiscountApplicable === "on" ||
        book.isDiscountApplicable === true
      ) {
        const discountedUnit = parseFloat(book.discountedUnit);

        if (book.discountType === "Fixed") {
          book.finalPrice = price - discountedUnit;
        } else if (book.discountType === "Percentage") {
          book.finalPrice = price - (price * discountedUnit) / 100;
        }

        if (book.finalPrice < 0) {
          return res.status(400).json({
            success: false,
            message: "Final price cannot be negative"
          });
        }
      } else {
        book.finalPrice = price;
      }
    }

    await book.save();
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book
    });
  } catch (err) {
    console.error("Error in editBook:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the book",
      error: err.message
    });
  }
}

async function getBookForUser(req, res) {
  try {
    console.log("Getting Book for user...");
    let id = req.params.id;
    let book = await Book.findOne({ _id: id });
    console.log(book, "book");
    res.status(200).send({ success: true, data: book });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "something went wrong" });
  }
}

async function getBooksForUser(req, res) {
  try {
    console.log("here")
    let books = await Book.find({});
    console.log(books, 'boks')
    res.status(200).send({ success: true, data: books });
  } catch (err) {
    console.log(err);
  }
}

 async function getReviews(req,res){
  try {
    let reviews = await ProductReview.find({}).populate('product').populate('user');
    res.status(200).send({success:true,data:reviews})

  } catch (error) {
    res.status(400).send({success:false,message:'error'})
    console.log(error, ' error in getReviews ')
  }
 }

module.exports = {
  addBook,
  getBooks,
  getBookForEdit,
  editBook,
  getBookForUser,
  getBooksForUser,
  getReviews
};
