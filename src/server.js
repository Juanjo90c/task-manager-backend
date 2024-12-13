const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron')
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


// Server ping for avoiding MongoDB crash for Idling
const PingSchema = new mongoose.Schema({ lastPing: Date });
const PingModel = mongoose.model('Ping', PingSchema);

cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Pinging MongoDB...');
    // Update or insert a document in the Ping collection
    const pingDoc = await PingModel.findOneAndUpdate(
      {}, // Search for any document
      { lastPing: new Date() }, // Update or set the lastPing field
      { upsert: true, new: true } // Create the document if it doesn't exist
    );
    console.log('Ping successful:', pingDoc);
  } catch (error) {
    console.error('Ping to MongoDB failed:', error.message);
  }
});
