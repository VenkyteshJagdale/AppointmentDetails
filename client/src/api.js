import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);


export const deleteAppointment = (appointmentId) => {
  return axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
};

export const getAppointments = () => {
  return axios.get('http://localhost:5000/api/appointments/patient/week');
};

export const createAppointment = (appointment) => {
 return axios.post('http://localhost:5000/api/appointments', appointment);
}

export const updateAppointmentPosition = async (appointmentId, newDay) => {
  try {
    await axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, { day: newDay });
  } catch (error) {
    console.error('Error updating appointment position:', error);
  }
};



