const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(cors());
// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API route
app.get('/api/employees', (req, res) => {
  fs.readFile(path.join(__dirname, 'employees.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading employees.json:', err);
      return res.status(500).json({ error: 'Failed to load employee data' });
    }

    try {
      const employees = JSON.parse(data);
      res.json(employees);
    } catch (parseErr) {
      console.error('Error parsing employees.json:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format in employees.json' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
