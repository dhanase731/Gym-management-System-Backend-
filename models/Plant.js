const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wateringIntervalDays: { type: Number, default: 7 },
  fertilizeIntervalDays: { type: Number, default: 30 },
  nextWateringDate: { type: Date },
  nextFertilizeDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plant', plantSchema);
