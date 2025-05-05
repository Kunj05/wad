require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const app = express();

app.use(express.json());
app.use('/api', bookRoutes);

connectDB(); // Connect to the database

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});
