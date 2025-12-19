const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', default: null },
  plan: { type: String, default: 'Standard' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  joinDate: { type: Date, default: Date.now },
  joinedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);
