const Appointment = require('../models/Appointment');

// Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.json(savedAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an appointment
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { day } = req.body;

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.day = day;
        await appointment.save();

        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all appointments for the current week
const getAppointmentsForWeek = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsForWeek
};
