import React, { useState } from 'react';
import './modal.css';
import { createAppointment } from './../api';

const AppointmentForm = ({ day, onSave, onClose }) => {
  // State to manage form data [VJ]
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    timeSlot: '10-11',
    location: '',
  });

  // Handle changes in input fields [VJ]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission [VJ]
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare appointment data [VJ]
    const appointment = { ...formData, day };

    try {
      // Call API to create appointment [VJ]
      await createAppointment(appointment);

      // Notify parent component about the new appointment and close the modal [VJ]
      onSave(day, formData);
      onClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Book Appointment for {day}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="10-11">10-11 AM</option>
            <option value="11-12">11-12 PM</option>
            <option value="12-1">12-1 PM</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <button type="submit">Save Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
