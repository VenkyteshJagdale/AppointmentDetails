const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  day: { 
    type: String,
    required: true,
  },
  fullName: { 
    type: String,
    required: true,
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  age: { 
    type: Number,
    required: true,
  },
  timeSlot: { 
    type: String, 
    enum: ['10-11', '11-12', '12-1'],
    required: true,
  },
  location: { 
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
