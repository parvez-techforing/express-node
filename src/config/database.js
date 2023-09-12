const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;

