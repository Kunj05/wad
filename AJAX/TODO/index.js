const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory storage for tasks
let tasks = [];
let nextId = 1;

// Load tasks from file if it exists
const tasksFile = path.join(__dirname, 'tasks.json');
if (fs.existsSync(tasksFile)) {
    const data = fs.readFileSync(tasksFile, 'utf8');
    tasks = JSON.parse(data);
    nextId = Math.max(...tasks.map(task => task.id), 0) + 1;
}

// Save tasks to file
function saveTasks() {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// API Routes
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Task text is required' });
    }

    const newTask = {
        id: nextId++,
        text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Task text is required' });
    }

    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.text = text;
    saveTasks();
    res.json(task);
});

app.put('/api/tasks/:id/toggle', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;
    saveTasks();
    res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    saveTasks();
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 