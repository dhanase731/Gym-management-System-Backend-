require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Gym = require('./models/Gym');
const Member = require('./models/Member');
const Trainer = require('./models/Trainer');
const Billing = require('./models/Billing');
const Settings = require('./models/Settings');
const Attendance = require('./models/Attendance');

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gym_management';
    await connectDB(uri);

    // Clear collections (safe for dev)
    await Promise.all([
      User.deleteMany({}),
      Gym.deleteMany({}),
      Member.deleteMany({}),
      Trainer.deleteMany({}),
      Billing.deleteMany({}),
      Settings.deleteMany({}),
      Attendance.deleteMany({})
    ]);

    // Create a test user
    const user = new User({ name: 'Dev Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' });
    await user.save();

    // Gyms
    const gym1 = new Gym({ name: 'Downtown Gym', address: '123 Main St' });
    const gym2 = new Gym({ name: 'Uptown Fitness', address: '45 High Rd' });
    await gym1.save();
    await gym2.save();

    // Members
    const member1 = new Member({ name: 'Alice', email: 'alice@example.com', phone: '9876543210', gym: gym1._id });
    const member2 = new Member({ name: 'Bob', email: 'bob@example.com', phone: '9123456780', gym: gym2._id });
    await member1.save();
    await member2.save();

    // Trainers
    const trainer1 = new Trainer({ name: 'Tom', specialization: 'Cardio', gym: gym1._id });
    const trainer2 = new Trainer({ name: 'Sara', specialization: 'Strength', gym: gym2._id });
    await trainer1.save();
    await trainer2.save();

    // Billing
    const bill1 = new Billing({ member: member1._id, amount: 1500, dueDate: new Date(Date.now() + 7*24*60*60*1000) });
    const bill2 = new Billing({ member: member2._id, amount: 2000, dueDate: new Date(Date.now() - 2*24*60*60*1000) }); // overdue
    await bill1.save();
    await bill2.save();

    // Settings
    await new Settings({ key: 'currency', value: 'INR' }).save();

    // Attendance
    await new Attendance({ member: member1._id, status: 'present' }).save();

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
