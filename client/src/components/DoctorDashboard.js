import React, { useState, useEffect } from 'react';
import { getAppointments } from '../api'; // [VJ] Import API function to fetch appointments
import './DoctorDashboard.css';
import moment from 'moment';

// Generate an array of days for the current week [VJ]
const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
  moment().startOf('week').add(i, 'days').format('dddd, MMM D')
);

const DoctorDashboard = () => {
  // State to store appointments categorized by day of the week [VJ]
  const [appointments, setAppointments] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {})
  );

  // Fetch appointments from the server when the component mounts [VJ]
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await getAppointments('doctorId'); // [VJ] Replace 'doctorId' with the actual logged-in doctor's ID

        // Organize appointments by day of the week [VJ]
        const appointmentsByDay = daysOfWeek.reduce((acc, day) => {
          acc[day] = data.filter(app => app.day === day);
          return acc;
        }, {});

        setAppointments(appointmentsByDay);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="doctor-dashboard">
      <h2>Current Week's Appointments</h2>
      <div className="board">
        {daysOfWeek.map(day => (
          <div key={day} className="day-column">
            <h3>{day}</h3>
            <ul>
              {appointments[day]?.map(appointment => (
                <li key={appointment._id} className="appointment-item">
                  <div className="appointment-details">
                    <div><strong>Patient Name:</strong> {appointment.fullName}</div>
                    <div><strong>Gender:</strong> {appointment.gender}</div>
                    <div><strong>Age:</strong> {appointment.age}</div>
                    <div><strong>Time Slot:</strong> {appointment.timeSlot}</div>
                    <div><strong>Location:</strong> {appointment.location}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
