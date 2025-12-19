const Member = require('../models/Member');

const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: error.message || 'Error fetching members' });
  }
};

const createMember = async (req, res) => {
  try {
    const memberData = { ...req.body };
    // Convert empty gymId to null
    if (!memberData.gymId || memberData.gymId === '') {
      memberData.gymId = null;
    }
    const member = new Member(memberData);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(400).json({ message: error.message || 'Error creating member' });
  }
};

const updateMember = async (req, res) => {
  try {
    const memberData = { ...req.body };
    // Convert empty gymId to null
    if (!memberData.gymId || memberData.gymId === '') {
      memberData.gymId = null;
    }
    const member = await Member.findByIdAndUpdate(req.params.id, memberData, { new: true });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(400).json({ message: error.message || 'Error updating member' });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(400).json({ message: error.message || 'Error deleting member' });
  }
};

module.exports = { getMembers, createMember, updateMember, deleteMember };
