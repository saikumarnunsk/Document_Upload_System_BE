const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  tenant: String,
  category: String,
  filePath: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Upload', uploadSchema);
