// routes/protected.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); // import the middleware

// This route is protected. Only users with a valid token can access it.
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}, you're authenticated!` });
});

module.exports = router;
