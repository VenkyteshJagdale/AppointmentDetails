const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Connect to Database
connectDB();

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
