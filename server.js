const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8080;
const book = require('./controllers/routes/book');
// const config = require('config'); //we load the db location from the JSON files

//db connection      
const url = 'mongodb://localhost:27017/bookstore';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to the server');
});

//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({ message: "Welcome to our Bookstore!" }));

app.route("/book")
    .get(book.getBooks)
    .post(book.postBook);
app.route("/book/:id")
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing