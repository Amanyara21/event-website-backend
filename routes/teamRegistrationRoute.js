const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');


// Create Team Route
router.post('/team', teamController.createTeam);

// Update existing team
// router.put('/team/:teamId', teamController.updateTeam);

module.exports = router;
