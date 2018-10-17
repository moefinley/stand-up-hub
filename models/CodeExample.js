const mongoose = require('mongoose');

const CodeExampleSchema = new mongoose.Schema({
  description: String,
  fileName: String
});

module.exports = mongoose.model('CodeExample', CodeExampleSchema);
