const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const book = require('./routes/books');
const user = require('./routes/user');
const payment = require('./routes/payment');
const contact = require('./routes/contact');
const connect = require('./connection');

dotenv.config();

connect();

const app = express();
const port = 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// ✅ Register all routes
app.use(contact);
app.use(book);
app.use(user);
app.use(payment);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
