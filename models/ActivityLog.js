const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
  type: { type: String, enum: ['watering','fertilize','note','reminder'], required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', activitySchema);
