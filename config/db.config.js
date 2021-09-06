const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb://127.0.0.1:27017/sdf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

module.exports = connection;
