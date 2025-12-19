const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  gymName: { type: String },
  contactEmail: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  membershipPlans: [{
    name: { type: String },
    description: { type: String },
    price: { type: Number }
  }],
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    paymentReminders: { type: Boolean, default: true }
  },
  key: { type: String },
  value: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);
