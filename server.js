require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect DB
connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/gym_management');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/members', require('./routes/members'));
app.use('/api/gyms', require('./routes/gyms'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/trainers', require('./routes/trainers'));
app.use('/api/attendance', require('./routes/attendance'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Gym Management System API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth (register, login)',
      members: '/api/members',
      gyms: '/api/gyms',
      billing: '/api/billing',
      settings: '/api/settings',
      trainers: '/api/trainers',
      attendance: '/api/attendance'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Cron job
const startCron = require('./jobs/cron');
startCron(process.env.CRON_SCHEDULE || '*/1 * * * *');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
