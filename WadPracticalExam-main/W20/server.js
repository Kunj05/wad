const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Middleware to parse request bodies
app.use(bodyParser.json());

// Employee routes
app.use('/api', employeeRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
