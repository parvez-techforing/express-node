const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const mongoose = require('./config/database'); // Import the database configuration

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

// Once the database connection is open, start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});

// Handle database connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
