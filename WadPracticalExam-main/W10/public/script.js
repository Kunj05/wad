async function fetchTasks() {
  const res = await fetch("/tasks");
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input value="${task.text}" onchange="updateTask(${task.id}, this.value)" />
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;
  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  input.value = "";
  fetchTasks();
}

async function updateTask(id, text) {
  await fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Load tasks on page load
fetchTasks();
