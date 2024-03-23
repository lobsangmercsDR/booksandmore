const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  yearPublished: {
    type: Number,

  },
  categories: [{
    type: String,
  }],
  available: {
    type: Boolean,
    default: true,
  },
  coverImage: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
