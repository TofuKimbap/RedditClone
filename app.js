const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Import MongoDB connection string.
const db = require('./config/keys').mongoURI;

// Import routes.
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const comments = require('./routes/api/comments');

// Connect server to MongoDB.
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully.'))
  .catch(err => console.log(err));

// Make request body available under req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize authentication module.
app.use(passport.initialize());

// Setup passport configuration
require('./config/passport')(passport);

app.get('/', (req, res) => res.send('Hello, World'));

// Use routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);

const port = process.env.PORT || 10000;

app.listen(port, () => console.log(`Server is running on port ${port}.`));
