const mongoose = require('mongoose');
require('dotenv').config()

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost/miniadsWaybill');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

module.exports = connectToDatabase;