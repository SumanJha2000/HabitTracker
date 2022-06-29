const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ctrl.js');

router.get('/toggle', ctrl.toggleStatus);
router.get('/', ctrl.getHabits);
router.post("/create", ctrl.postHabit);
router.get('/week', ctrl.getWeekView);
router.get("/delete/:id", ctrl.deleteHabit);






module.exports = router;