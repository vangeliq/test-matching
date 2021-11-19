// models/Book.js

const mongoose = require('mongoose');

const UserInputSchema = new mongoose.Schema({
  userInput: {
    type: String,
    required: true
  }
});

module.exports = UserInput = mongoose.model('UserInput', UserInputSchema);