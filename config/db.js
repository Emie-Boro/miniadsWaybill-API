const mongoose = require('mongoose');
require('dotenv').config()

async function connectToDatabase(url) {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

module.exports = connectToDatabase;