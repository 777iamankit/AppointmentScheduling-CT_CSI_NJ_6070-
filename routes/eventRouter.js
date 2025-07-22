// routes/eventRouter.js
const express = require('express');
const router = express.Router();
const Event = require("../model/event.js");

// POST: Add new event
router.post('/add-event', async (req, res) => {
  try {
    const { title, day, time } = req.body;
    const newEvent = new Event({ title, day, time });
    await newEvent.save();
    res.status(201).json({ message: 'Event saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving event' });
  }
});

// GET: Send list of events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});


const Event = require('../models/Event');

// DELETE /api/events/:id
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointment." });
  }
});


module.exports = router;
