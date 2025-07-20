// routes/dashboard.js
const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
  const query = req.query.q || '';
  const results = [
    { result: `Searched for "${query}"` },
    { result: `More results for "${query}"` }
  ];
  res.json(results);
});

router.get('/notifications', (req, res) => {
  const notifications = [
    { id: 1, text: 'Meeting at 10AM' },
    { id: 2, text: 'New message received' }
  ];
  res.json(notifications);
});

module.exports = router;
