// This file contains the JavaScript code for the To-Do App. It includes functions to add new tasks, display tasks, delete tasks, and manage local storage for persisting tasks across page reloads.

// Ensure DOM elements are correctly selected
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskButton.addEventListener('click', addTask);

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        displayTask(task);
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = { text: taskText, id: Date.now() };
        displayTask(task);
        saveTask(task);
        taskInput.value = ''; // Clear the input field
    } else {
        console.warn('Task input is empty. Please enter a task.');
    }
}

// Function to display a task
function displayTask(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.setAttribute('data-id', task.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Function to save task to local storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(event) {
    const taskId = event.target.parentElement.getAttribute('data-id');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    event.target.parentElement.remove();
}