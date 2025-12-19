const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
  gymName: { type: String, required: true },
  name: { type: String }, // Alias for backwards compatibility
  phone: { type: String },
  address: { type: String },
  year: { type: Number },
  fee: { type: Number },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gym', gymSchema);
