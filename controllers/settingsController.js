const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne() || {};
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: error.message || 'Error fetching settings' });
  }
};

const updateSettings = async (req, res) => {
  try {
    // Find existing settings document or create one
    let settings = await Settings.findOne();
    
    if (settings) {
      // Update existing settings
      Object.assign(settings, req.body);
      await settings.save();
    } else {
      // Create new settings
      settings = new Settings(req.body);
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(400).json({ message: error.message || 'Error updating settings' });
  }
};

module.exports = { getSettings, updateSettings };
