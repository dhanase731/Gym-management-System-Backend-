const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  memberName: { type: String },
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  gymName: { type: String },
  plan: { type: String, default: 'Basic' },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paymentMethod: { type: String },
  status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' },
  paidAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Billing', billingSchema);
