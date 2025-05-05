const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors()); // Allow requests from any origin

// Define route to serve products data
app.get('/api/products', (req, res) => {
  // Read products.json file
  fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading file' });
    }
    try {
      // Parse JSON data and send it as response
      const products = JSON.parse(data);
      res.json(products);
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
