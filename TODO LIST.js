document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));

    form.addEventListener('submit', e => {
        e.preventDefault();
        addTask(input.value);
        input.value = '';
    });

    function addTask(text) {
        const task = { text, completed: false };
        addTaskToDOM(task.text, task.completed);
        savedTasks.push(task);
        saveTasks();
    }

    function addTaskToDOM(text, completed) {
        const li = document.createElement('li');
        li.textContent = text;
        if (completed) li.classList.add('completed');

        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTask(li));

        const completeBtn = document.createElement('button');
        completeBtn.textContent = completed ? '✔️' : '⏳';
        completeBtn.addEventListener('click', () => toggleComplete(li, completeBtn));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', () => deleteTask(li));

        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    }

    function editTask(li) {
        const newText = prompt('Edit task:', li.firstChild.textContent);
        if (newText) {
            li.firstChild.textContent = newText;
            updateTask(li);
        }
    }

    function deleteTask(li) {
        li.remove();
        updateTasks();
    }

    function toggleComplete(li, button) {
        li.classList.toggle('completed');
        button.textContent = li.classList.contains('completed') ? '✔️' : '⏳';
        updateTask(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }

    function updateTasks() {
        savedTasks.length = 0;
        list.querySelectorAll('li').forEach(li => {
            savedTasks.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed')
            });
        });
        saveTasks();
    }

    function updateTask(li) {
        const index = [...list.children].indexOf(li);
        savedTasks[index] = {
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        };
        saveTasks();
    }
});
