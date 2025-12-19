const Billing = require('../models/Billing');
const ActivityLog = require('../models/ActivityLog');

const getBills = async (req, res) => {
  try {
    const bills = await Billing.find().populate('memberId').populate('gymId');
    res.json(bills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(400).json({ message: error.message });
  }
};

const createBill = async (req, res) => {
  try {
    const { memberId, memberName, gymId, gymName, plan, amount, dueDate, paymentMethod } = req.body;
    
    if (!memberId || !amount || !dueDate) {
      return res.status(400).json({ message: 'Member, amount, and due date are required' });
    }

    const bill = new Billing({
      memberId,
      memberName,
      gymId: gymId || null,
      gymName,
      plan: plan || 'Basic',
      amount,
      dueDate,
      paymentMethod,
      status: 'Pending'
    });

    await bill.save();
    const populatedBill = await bill.populate('memberId').populate('gymId');
    res.status(201).json(populatedBill);
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(400).json({ message: error.message });
  }
};

const updateBill = async (req, res) => {
  try {
    const { status, paymentMethod, paidAt } = req.body;
    const bill = await Billing.findByIdAndUpdate(
      req.params.id,
      {
        status: status || undefined,
        paymentMethod: paymentMethod || undefined,
        paidAt: status === 'Paid' ? new Date() : paidAt
      },
      { new: true }
    ).populate('memberId').populate('gymId');
    
    res.json(bill);
  } catch (error) {
    console.error('Error updating bill:', error);
    res.status(400).json({ message: error.message });
  }
};

const deleteBill = async (req, res) => {
  try {
    await Billing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Error deleting bill:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getBills, createBill, updateBill, deleteBill };
