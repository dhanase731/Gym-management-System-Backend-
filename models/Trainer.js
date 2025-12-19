const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  phone: { type: String },
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  status: { type: String, default: 'Active' }
});

module.exports = mongoose.model('Trainer', trainerSchema);
