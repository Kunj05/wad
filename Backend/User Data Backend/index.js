const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/users', (req, res) => {
  fs.readFile('./users.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user data' });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
