document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const todoList = document.getElementById('todoList');

    // Load tasks when page loads
    loadTasks();

    // Add new task
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: taskText })
            })
            .then(response => response.json())
            .then(task => {
                createTaskElement(task);
                taskInput.value = '';
            })
            .catch(error => console.error('Error:', error));
        }
    }

    function loadTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                todoList.innerHTML = '';
                tasks.forEach(task => createTaskElement(task));
            })
            .catch(error => console.error('Error:', error));
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = task.id;
        if (task.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTask(task.id, span));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    function editTask(id, spanElement) {
        const currentText = spanElement.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        
        // Replace span with input
        spanElement.replaceWith(input);
        input.focus();

        // Handle save on Enter or blur
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                fetch(`/api/tasks/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: newText })
                })
                .then(response => response.json())
                .then(updatedTask => {
                    spanElement.textContent = updatedTask.text;
                    input.replaceWith(spanElement);
                })
                .catch(error => {
                    console.error('Error:', error);
                    input.replaceWith(spanElement);
                });
            } else {
                input.replaceWith(spanElement);
            }
        };

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });

        input.addEventListener('blur', saveEdit);
    }

    function toggleTask(id) {
        fetch(`/api/tasks/${id}/toggle`, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(updatedTask => {
            const taskElement = document.querySelector(`[data-id="${id}"]`);
            if (updatedTask.completed) {
                taskElement.classList.add('completed');
            } else {
                taskElement.classList.remove('completed');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function deleteTask(id) {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const taskElement = document.querySelector(`[data-id="${id}"]`);
            taskElement.remove();
        })
        .catch(error => console.error('Error:', error));
    }
}); 