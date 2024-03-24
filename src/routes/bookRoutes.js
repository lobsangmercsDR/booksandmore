const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Middleware para buscar un libro por ID y adjuntarlo a la respuesta
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book; // Asigna el libro encontrado a res.book para su uso posterior
  next();
}

// POST /books - Crear un nuevo libro
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    yearPublished: req.body.yearPublished,
    genres: req.body.genres,
    categories: req.body.categories,
    available: req.body.available,
    coverImage: req.body.coverImage,
    description: req.body.description,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /books - Leer todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /books/:id - Leer un libro por ID
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// PATCH /books/:id - Actualizar un libro por ID
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  // Añade actualizaciones para otros campos según sea necesario
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /books/:id - Eliminar un libro por ID
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
