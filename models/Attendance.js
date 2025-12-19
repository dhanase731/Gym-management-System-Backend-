const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  memberName: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Late', 'Absent'], default: 'Present' },
  sessionType: { type: String, default: 'Manual' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
