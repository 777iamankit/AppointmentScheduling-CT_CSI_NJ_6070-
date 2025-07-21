const express = require("express");
const router = express.Router(); // Use Router(), not express() here
const Event = require("../model/event.js"); // adjust path as needed

// GET /api/events - fetch from MongoDB and classify as past/upcoming
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ day: 1, time: 1 });

    const now = new Date();

    const formattedEvents = events.map((event) => {
      const dateString = `${event.day} ${event.time}`;
      const eventDate = new Date(dateString);

      return {
        title: event.title,
        date: `${event.day} - ${event.time}`,
        type: eventDate > now ? "upcoming" : "past",
      };
    });

    res.json(formattedEvents);
  } catch (err) {
    console.error("❌ Error fetching events:", err.message);
    res.status(500).json({ error: "Failed to fetch events from database" });
  }
});


module.exports=router;