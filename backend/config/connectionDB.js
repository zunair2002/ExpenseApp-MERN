const mongoose = require('mongoose');

const connectionDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/expenseDB');
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('Connection error:', error);
  }
};

module.exports = connectionDB; 