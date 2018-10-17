const mongoose = require('mongoose');

const NamePickerSchema = new mongoose.Schema({
  lastSelectedName: String,
  teamMembers: [{
    name: String,
    selected: Boolean
  }]
});

module.exports = mongoose.model('NamePicker', NamePickerSchema);
