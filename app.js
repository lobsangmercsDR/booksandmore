const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./src/routes/authRoutes');
const booksRoutes = require('./src/routes/bookRoutes');

require('dotenv').config();
require('./src/models/User'); // Ajusta la ruta según la ubicación de tu modelo User.

require('./src/config/passport')(passport);


const app = express();


//Middleware for parsing JSON data
app.use(express.json());
// Passport middleware
app.use(passport.initialize())
// Auth routes
app.use('/auth', authRoutes);
app.use('/books', booksRoutes);

//Connect to MongoDB


const mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.get('/a', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ success: true, message: 'You are authenticated'});
});

