require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

const run = async () => {
  await connectDB(process.env.MONGODB_URI);
  const admin = await User.findOne({ email: 'admin@example.com' });
  if (!admin) {
    await User.create({ name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' });
    console.log('Admin user created: admin@example.com / admin123');
  } else {
    console.log('Admin exists');
  }
  process.exit(0);
};

run();
