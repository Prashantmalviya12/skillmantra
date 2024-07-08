// routes/permissions.js
const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');

// Get all permissions for a user
router.get('/:userId', async (req, res) => {
  try {
    const permissions = await Permission.find({ userId: req.params.userId });
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update permission for a specific page
router.post('/update', async (req, res) => {
  const { userId, page, hasAccess } = req.body;
  try {
    let permission = await Permission.findOne({ userId, page });
    if (permission) {
      permission.hasAccess = hasAccess;
    } else {
      permission = new Permission({ userId, page, hasAccess });
    }
    await permission.save();
    res.json(permission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
