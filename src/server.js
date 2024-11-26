const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require('../config');

const app = express();
app.use(express.json()); // For parsing JSON data

// MongoDB connection
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Task Manager Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
