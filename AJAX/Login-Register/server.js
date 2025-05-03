const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');  // Required to read and write files
const path = require('path');  // For handling file paths
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());  // Enable CORS

app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Path to users.json
const usersFilePath = path.join(__dirname, 'users.json');

// Function to read users from the users.json file
const readUsersFromFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];  // If the file doesn't exist, return an empty array
    }
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);  // Parse the JSON data
};

// Function to write users to the users.json file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

// Endpoint to register a new user
app.post('/api/register', (req, res) => {
    const { name, email, mobile, dob, city, address, username, password } = req.body;

    // Simple validation
    if (!name || !email || !mobile || !dob || !city || !address || !username || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Read existing users from the file
    const users = readUsersFromFile();

    // Check if username already exists
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Add new user to the users array
    const newUser = { name, email, mobile, dob, city, address, username, password };
    users.push(newUser);

    // Write updated users list back to the file
    writeUsersToFile(users);

    res.status(201).json({ success: true, message: 'Registration successful' });
});

// Endpoint to login a user
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Read users from the file
    const users = readUsersFromFile();

    // Validate credentials
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Endpoint to get all registered users (optional)
app.get('/api/users', (req, res) => {
    const users = readUsersFromFile();

    if (users.length === 0) {
        return res.status(200).json({ success: true, message: 'No users registered' });
    }
    res.status(200).json(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
