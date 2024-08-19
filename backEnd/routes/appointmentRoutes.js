const express = require('express');
const router = express.Router();
const {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsForWeek
} = require('../controllers/appointmentController');

// Create a new appointment
router.post('/', createAppointment);

// Update an appointment
router.put('/:id', updateAppointment);

// Delete an appointment
router.delete('/:id', deleteAppointment);

// Get all appointments for the current week
router.get('/patient/week', getAppointmentsForWeek);

module.exports = router;
