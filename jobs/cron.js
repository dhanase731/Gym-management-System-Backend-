const cron = require('node-cron');
const Billing = require('../models/Billing');
const ActivityLog = require('../models/ActivityLog');

const startCron = (schedule) => {
  // Run a simple job to mark overdue bills and log a reminder
  cron.schedule(schedule, async () => {
    console.log('[cron] Running overdue check');
    try {
      const now = new Date();
      const overdue = await Billing.find({ dueDate: { $lt: now }, status: 'pending' }).populate('member');
      for (const bill of overdue) {
        bill.status = 'overdue';
        await bill.save();
        await ActivityLog.create({ plant: null, type: 'reminder', notes: `Bill overdue for ${bill.member?.name || bill.member}`, date: now });
        console.log(`[cron] Marked bill ${bill._id} as overdue`);
      }
    } catch (err) {
      console.error('[cron] Error', err.message);
    }
  });
};

module.exports = startCron;
