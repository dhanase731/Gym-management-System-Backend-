const Gym = require('../models/Gym');

const getGyms = async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.json(gyms);
  } catch (error) {
    console.error('Error fetching gyms:', error);
    res.status(500).json({ message: error.message || 'Error fetching gyms' });
  }
};

const createGym = async (req, res) => {
  try {
    if (!req.body.gymName) {
      return res.status(400).json({ message: 'Gym name is required' });
    }
    const gym = new Gym(req.body);
    await gym.save();
    res.status(201).json(gym);
  } catch (error) {
    console.error('Error creating gym:', error);
    res.status(400).json({ message: error.message || 'Error creating gym' });
  }
};

const updateGym = async (req, res) => {
  try {
    const gym = await Gym.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.json(gym);
  } catch (error) {
    console.error('Error updating gym:', error);
    res.status(400).json({ message: error.message || 'Error updating gym' });
  }
};

const deleteGym = async (req, res) => {
  try {
    const gym = await Gym.findByIdAndDelete(req.params.id);
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error deleting gym:', error);
    res.status(400).json({ message: error.message || 'Error deleting gym' });
  }
};

module.exports = { getGyms, createGym, updateGym, deleteGym };
