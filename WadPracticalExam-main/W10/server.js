const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "tasks.json");

app.use(express.static("public"));
app.use(express.json());

// Load tasks from file
const loadTasks = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

// Save tasks to file
const saveTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

// Get tasks
app.get("/tasks", (req, res) => {
  res.json(loadTasks());
});

// Add task
app.post("/tasks", (req, res) => {
  const tasks = loadTasks();
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  saveTasks(tasks);
  res.json(newTask);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id == req.params.id);
  if (task) task.text = req.body.text;
  saveTasks(tasks);
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  let tasks = loadTasks();
  tasks = tasks.filter((t) => t.id != req.params.id);
  saveTasks(tasks);
  res.json({ success: true });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
