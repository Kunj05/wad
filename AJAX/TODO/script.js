document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const todoList = document.getElementById('todoList');

    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/tasks');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const task = JSON.parse(xhr.responseText);
                    createTaskElement(task);
                    taskInput.value = '';
                } else {
                    console.error('Error adding task');
                }
            };
            xhr.send(JSON.stringify({ text: taskText }));
        }
    }

    function loadTasks() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/tasks');
        xhr.onload = () => {
            if (xhr.status === 200) {
                const tasks = JSON.parse(xhr.responseText);
                todoList.innerHTML = '';
                tasks.forEach(task => createTaskElement(task));
            } else {
                console.error('Error loading tasks');
            }
        };
        xhr.send();
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = task.id;
        if (task.completed) li.classList.add('completed');

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
        spanElement.replaceWith(input);
        input.focus();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', `/api/tasks/${id}`);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const updatedTask = JSON.parse(xhr.responseText);
                        spanElement.textContent = updatedTask.text;
                        input.replaceWith(spanElement);
                    } else {
                        console.error('Error updating task');
                        input.replaceWith(spanElement);
                    }
                };
                xhr.send(JSON.stringify({ text: newText }));
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
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `/api/tasks/${id}/toggle`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const updatedTask = JSON.parse(xhr.responseText);
                const taskElement = document.querySelector(`[data-id="${id}"]`);
                taskElement.classList.toggle('completed', updatedTask.completed);
            } else {
                console.error('Error toggling task');
            }
        };
        xhr.send();
    }

    function deleteTask(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/api/tasks/${id}`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const taskElement = document.querySelector(`[data-id="${id}"]`);
                taskElement.remove();
            } else {
                console.error('Error deleting task');
            }
        };
        xhr.send();
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//     const taskInput = document.getElementById('taskInput');
//     const addTaskBtn = document.getElementById('addTask');
//     const todoList = document.getElementById('todoList');

//     loadTasks();

//     addTaskBtn.addEventListener('click', addTask);
//     taskInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             addTask();
//         }
//     });

//     function addTask() {
//         const taskText = taskInput.value.trim();
//         if (taskText) {
//             fetch('/api/tasks', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ text: taskText })
//             })
//             .then(response => {
//                 if (!response.ok) throw new Error('Failed to add task');
//                 return response.json();
//             })
//             .then(task => {
//                 createTaskElement(task);
//                 taskInput.value = '';
//             })
//             .catch(error => console.error(error));
//         }
//     }

//     function loadTasks() {
//         fetch('/api/tasks')
//             .then(response => {
//                 if (!response.ok) throw new Error('Failed to load tasks');
//                 return response.json();
//             })
//             .then(tasks => {
//                 todoList.innerHTML = '';
//                 tasks.forEach(task => createTaskElement(task));
//             })
//             .catch(error => console.error(error));
//     }

//     function createTaskElement(task) {
//         const li = document.createElement('li');
//         li.className = 'todo-item';
//         li.dataset.id = task.id;
//         if (task.completed) li.classList.add('completed');

//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         checkbox.checked = task.completed;
//         checkbox.addEventListener('change', () => toggleTask(task.id));

//         const span = document.createElement('span');
//         span.className = 'task-text';
//         span.textContent = task.text;

//         const editBtn = document.createElement('button');
//         editBtn.className = 'edit-btn';
//         editBtn.textContent = 'Edit';
//         editBtn.addEventListener('click', () => editTask(task.id, span));

//         const deleteBtn = document.createElement('button');
//         deleteBtn.className = 'delete-btn';
//         deleteBtn.textContent = 'Delete';
//         deleteBtn.addEventListener('click', () => deleteTask(task.id));

//         li.appendChild(checkbox);
//         li.appendChild(span);
//         li.appendChild(editBtn);
//         li.appendChild(deleteBtn);
//         todoList.appendChild(li);
//     }

//     function editTask(id, spanElement) {
//         const currentText = spanElement.textContent;
//         const input = document.createElement('input');
//         input.type = 'text';
//         input.value = currentText;
//         input.className = 'edit-input';
//         spanElement.replaceWith(input);
//         input.focus();

//         const saveEdit = () => {
//             const newText = input.value.trim();
//             if (newText && newText !== currentText) {
//                 fetch(`/api/tasks/${id}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ text: newText })
//                 })
//                 .then(response => {
//                     if (!response.ok) throw new Error('Failed to update task');
//                     return response.json();
//                 })
//                 .then(updatedTask => {
//                     spanElement.textContent = updatedTask.text;
//                     input.replaceWith(spanElement);
//                 })
//                 .catch(error => {
//                     console.error(error);
//                     input.replaceWith(spanElement);
//                 });
//             } else {
//                 input.replaceWith(spanElement);
//             }
//         };

//         input.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') {
//                 saveEdit();
//             }
//         });

//         input.addEventListener('blur', saveEdit);
//     }

//     function toggleTask(id) {
//         fetch(`/api/tasks/${id}/toggle`, {
//             method: 'PUT'
//         })
//         .then(response => {
//             if (!response.ok) throw new Error('Failed to toggle task');
//             return response.json();
//         })
//         .then(updatedTask => {
//             const taskElement = document.querySelector(`[data-id="${id}"]`);
//             taskElement.classList.toggle('completed', updatedTask.completed);
//         })
//         .catch(error => console.error(error));
//     }

//     function deleteTask(id) {
//         fetch(`/api/tasks/${id}`, {
//             method: 'DELETE'
//         })
//         .then(response => {
//             if (!response.ok) throw new Error('Failed to delete task');
//             const taskElement = document.querySelector(`[data-id="${id}"]`);
//             taskElement.remove();
//         })
//         .catch(error => console.error(error));
//     }
// });
