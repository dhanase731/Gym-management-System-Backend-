const Trainer = require('../models/Trainer');

const getTrainers = async (req, res) => {
  const trainers = await Trainer.find();
  res.json(trainers);
};

const getTrainer = async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);
  res.json(trainer);
};

const createTrainer = async (req, res) => {
  const trainer = new Trainer(req.body);
  await trainer.save();
  res.status(201).json(trainer);
};

const updateTrainer = async (req, res) => {
  const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(trainer);
};

const deleteTrainer = async (req, res) => {
  await Trainer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = { getTrainers, getTrainer, createTrainer, updateTrainer, deleteTrainer };
