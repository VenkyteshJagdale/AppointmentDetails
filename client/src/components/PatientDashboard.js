// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import AppointmentForm from './AppointmentForm';
// import './styles.css';
// import { getAppointments, updateAppointmentPosition, deleteAppointment } from './../api';

// const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
//   moment().startOf('week').add(i, 'days').format('dddd, MMM D')
// );

// const PatientDashboard = () => {
//   const [appointments, setAppointments] = useState(
//     daysOfWeek.reduce((acc, day) => {
//       acc[day] = [];
//       return acc;
//     }, {})
//   );
//   const [showForm, setShowForm] = useState(false);
//   const [formValues, setFormValues] = useState({
//     day: '',
//     fullName: '',
//     gender: 'Male',
//     age: '',
//     timeSlot: '10-11',
//     location: '',
//   });
//   const [draggingItem, setDraggingItem] = useState(null);
//   const [dropIndicator, setDropIndicator] = useState(null);

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await getAppointments();
//       const appointmentsData = response.data;

//       const newAppointments = daysOfWeek.reduce((acc, day) => {
//         acc[day] = appointmentsData
//           .filter((appointment) => appointment.day === day)
//           .map((appointment) => ({
//             id: appointment._id,
//             fullName: appointment.fullName,
//             gender: appointment.gender,
//             age: appointment.age,
//             timeSlot: appointment.timeSlot,
//             location: appointment.location,
//           }));
//         return acc;
//       }, {});

//       setAppointments(newAppointments);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     }
//   };

//   const updateTask = async (taskId, newDay) => {
//     const originalDay = Object.keys(appointments).find(day =>
//       appointments[day].some(app => app.id === taskId)
//     );

//     if (originalDay && originalDay !== newDay) {
//       try {
//         const updatedOriginalDay = appointments[originalDay].filter(app => app.id !== taskId);
//         await updateAppointmentPosition(taskId, newDay);
//         const response = await getAppointments();
//         const updatedAppointment = response.data.find(app => app._id === taskId);

//         setAppointments(prevAppointments => ({
//           ...prevAppointments,
//           [originalDay]: updatedOriginalDay,
//           [newDay]: [
//             ...prevAppointments[newDay],
//             {
//               id: updatedAppointment._id,
//               fullName: updatedAppointment.fullName,
//               gender: updatedAppointment.gender,
//               age: updatedAppointment.age,
//               timeSlot: updatedAppointment.timeSlot,
//               location: updatedAppointment.location,
//             }
//           ],
//         }));
//       } catch (error) {
//         console.error('Error updating appointment position:', error);
//       }
//     }
//   };

//   const handleDragStart = (e, itemId) => {
//     e.dataTransfer.setData('text/plain', itemId);
//     setDraggingItem(itemId);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDropIndicator(e.currentTarget.id);
//   };

//   const handleDragEnd = (e) => {
//     e.preventDefault();
//     setDraggingItem(null);
//     setDropIndicator(null);
//   };

//   const handleDrop = async (e, newDay) => {
//     e.preventDefault();
//     const taskId = e.dataTransfer.getData('text/plain');
//     const originalDay = Object.keys(appointments).find(day =>
//       appointments[day].some(app => app.id === taskId)
//     );

//     if (originalDay !== newDay) {
//       await updateTask(taskId, newDay);
//     }

//     setDropIndicator(null);
//   };

//   const handleDeleteAppointment = async (appointmentId, day) => {
//     try {
//       await deleteAppointment(appointmentId);
//       setAppointments((prevAppointments) => ({
//         ...prevAppointments,
//         [day]: prevAppointments[day].filter((appointment) => appointment.id !== appointmentId),
//       }));
//     } catch (error) {
//       console.error('Error deleting appointment:', error);
//     }
//   };

//   const handleAddAppointment = (day) => {
//     setShowForm(true);
//     setFormValues({ ...formValues, day });
//   };

//   const handleSaveAppointment = async (day, formData) => {
//     try {
//       await fetchAppointments();
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error saving appointment:', error);
//     }
//   };

//   const handleCloseForm = async () => {
//     setShowForm(false);
//     await fetchAppointments();
//   };

//   return (
//     <div className="board-container">
//       <div className="board">
//         {daysOfWeek.map((day) => (
//           <div
//             id={day}
//             key={day}
//             onDragOver={handleDragOver}
//             onDrop={(e) => handleDrop(e, day)}
//             onDragEnd={handleDragEnd}
//             className={`day-column ${dropIndicator === day ? 'bg-blue-100' : ''}`}
//           >
//             <h3>{day}</h3>
//             <button onClick={() => handleAddAppointment(day)}>+ Add Appointment</button>
//             {appointments[day].map((item) => (
//               <div
//                 key={item.id}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, item.id)}
//                 onDragEnd={handleDragEnd}
//                 className={`appointment ${draggingItem === item.id ? 'dragging' : ''}`}
//               >
//                 <div className="appointment-content">
//                   <div className="appointment-header">
//                     <span className="appointment-fullName"><b>Name:</b> {item.fullName}</span>
//                     <span className="appointment-gender"><b>Gender:</b> {item.gender}</span>
//                     <span className="appointment-time"><b>Time Slot:</b> {item.timeSlot}</span>
//                     <span className="appointment-age"><b>Age:</b> {item.age}</span>
//                     <span className="appointment-location"><b>Location:</b> {item.location}</span>
//                   </div>
//                 </div>
//                 <button
//                   className="cancel-button"
//                   onClick={() => handleDeleteAppointment(item.id, day)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {showForm && (
//         <AppointmentForm
//           day={formValues.day}
//           onSave={handleSaveAppointment}
//           onClose={handleCloseForm}
//         />
//       )}
//     </div>
//   );
// };

// export default PatientDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import moment from 'moment';
import AppointmentForm from './AppointmentForm';
import './styles.css';
import { getAppointments, updateAppointmentPosition, deleteAppointment } from './../api';

const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
  moment().startOf('week').add(i, 'days').format('dddd, MMM D')
);

const PatientDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [appointments, setAppointments] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {})
  );
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    day: '',
    fullName: '',
    gender: 'Male',
    age: '',
    timeSlot: '10-11',
    location: '',
  });
  const [draggingItem, setDraggingItem] = useState(null);
  const [dropIndicator, setDropIndicator] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      const appointmentsData = response.data;

      const newAppointments = daysOfWeek.reduce((acc, day) => {
        acc[day] = appointmentsData
          .filter((appointment) => appointment.day === day)
          .map((appointment) => ({
            id: appointment._id,
            fullName: appointment.fullName,
            gender: appointment.gender,
            age: appointment.age,
            timeSlot: appointment.timeSlot,
            location: appointment.location,
          }));
        return acc;
      }, {});

      setAppointments(newAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const updateTask = async (taskId, newDay) => {
    const originalDay = Object.keys(appointments).find(day =>
      appointments[day].some(app => app.id === taskId)
    );

    if (originalDay && originalDay !== newDay) {
      try {
        const updatedOriginalDay = appointments[originalDay].filter(app => app.id !== taskId);
        await updateAppointmentPosition(taskId, newDay);
        const response = await getAppointments();
        const updatedAppointment = response.data.find(app => app._id === taskId);

        setAppointments(prevAppointments => ({
          ...prevAppointments,
          [originalDay]: updatedOriginalDay,
          [newDay]: [
            ...prevAppointments[newDay],
            {
              id: updatedAppointment._id,
              fullName: updatedAppointment.fullName,
              gender: updatedAppointment.gender,
              age: updatedAppointment.age,
              timeSlot: updatedAppointment.timeSlot,
              location: updatedAppointment.location,
            }
          ],
        }));
      } catch (error) {
        console.error('Error updating appointment position:', error);
      }
    }
  };

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('text/plain', itemId);
    setDraggingItem(itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDropIndicator(e.currentTarget.id);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setDraggingItem(null);
    setDropIndicator(null);
  };

  const handleDrop = async (e, newDay) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const originalDay = Object.keys(appointments).find(day =>
      appointments[day].some(app => app.id === taskId)
    );

    if (originalDay !== newDay) {
      await updateTask(taskId, newDay);
    }

    setDropIndicator(null);
  };

  const handleDeleteAppointment = async (appointmentId, day) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments((prevAppointments) => ({
        ...prevAppointments,
        [day]: prevAppointments[day].filter((appointment) => appointment.id !== appointmentId),
      }));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleAddAppointment = (day) => {
    setShowForm(true);
    setFormValues({ ...formValues, day });
  };

  const handleSaveAppointment = async (day, formData) => {
    try {
      await fetchAppointments();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleCloseForm = async () => {
    setShowForm(false);
    await fetchAppointments();
  };

  const handleLogout = () => {
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="board-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="board">
        {daysOfWeek.map((day) => (
          <div
            id={day}
            key={day}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, day)}
            onDragEnd={handleDragEnd}
            className={`day-column ${dropIndicator === day ? 'bg-blue-100' : ''}`}
          >
            <h3>{day}</h3>
            <button onClick={() => handleAddAppointment(day)}>+ Add Appointment</button>
            {appointments[day].map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragEnd={handleDragEnd}
                className={`appointment ${draggingItem === item.id ? 'dragging' : ''}`}
              >
                <div className="appointment-content">
                  <div className="appointment-header">
                    <span className="appointment-fullName"><b>Name:</b> {item.fullName}</span>
                    <span className="appointment-gender"><b>Gender:</b> {item.gender}</span>
                    <span className="appointment-time"><b>Time Slot:</b> {item.timeSlot}</span>
                    <span className="appointment-age"><b>Age:</b> {item.age}</span>
                    <span className="appointment-location"><b>Location:</b> {item.location}</span>
                  </div>
                </div>
                <button
                  className="cancel-button"
                  onClick={() => handleDeleteAppointment(item.id, day)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showForm && (
        <AppointmentForm
          day={formValues.day}
          onSave={handleSaveAppointment}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default PatientDashboard;

