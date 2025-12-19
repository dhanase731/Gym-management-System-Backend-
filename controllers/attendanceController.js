const Attendance = require('../models/Attendance');

const getAttendance = async (req, res) => {
  try {
    const { date } = req.query;
    const filter = {};
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }
    const items = await Attendance.find(filter).populate('member').populate('memberId');
    res.json(items);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: error.message || 'Error fetching attendance' });
  }
};

const createAttendance = async (req, res) => {
  try {
    if (!req.body.memberId && !req.body.memberName) {
      return res.status(400).json({ message: 'Member ID or name is required' });
    }
    
    const attendanceData = {
      memberId: req.body.memberId,
      member: req.body.memberId, // Also save to member field for backwards compatibility
      memberName: req.body.memberName,
      status: req.body.status || 'Present',
      sessionType: req.body.sessionType || 'Manual',
      date: req.body.date ? new Date(req.body.date) : new Date()
    };
    
    console.log('Creating attendance with data:', attendanceData);
    const attendance = new Attendance(attendanceData);
    const saved = await attendance.save();
    const populated = await Attendance.findById(saved._id).populate('memberId').populate('member');
    console.log('Saved attendance:', populated);
    res.status(201).json(populated);
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(400).json({ message: error.message || 'Error creating attendance' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json(attendance);
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(400).json({ message: error.message || 'Error updating attendance' });
  }
};

module.exports = { getAttendance, createAttendance, updateAttendance };
