const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // Allow requests from any origin

// Define route to serve users data
app.get('/api/users', (req, res) => {
  // Read users.json file
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading file' });
    }
    try {
      // Parse JSON data and send it as response
      const users = JSON.parse(data);
      res.json(users);
    } catch (parseErr) {
      console.error('Failed to parse JSON:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Define port for the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
