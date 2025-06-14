const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const taskForm = document.getElementById("task-form");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ------------ Utility Functions ------------
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = () => {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "done") return task.done;
    if (currentFilter === "todo") return !task.done;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    
    li.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });
};
// ------------ Input Validation ------------
const isValidTask = task => {
  if (!task) {
    showError("Task cannot be empty.");
    return false;
  }
  if (!isNaN(task[0])) {
    showError("Task cannot start with a number.");
    return false;
  }
  if (task.length < 5) {
    showError("Task must be at least 5 characters.");
    return false;
  }
  return true;
};

const showError = message => {
  errorMessage.textContent = message;
};

const clearError = () => {
  errorMessage.textContent = "";
};

// ------------ Add Task ------------
const addTask = () => {
  const taskName = taskInput.value.trim();
  if (!isValidTask(taskName)) return;

  tasks.push({ name: taskName, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  clearError();
};
// ------------ Toggle Task Done ------------
const toggleTask = index => {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
};
// ------------ Delete Task ------------
const deleteTask = index => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};
// ------------ Delete All Tasks ------------
const deleteAllTasks = () => {
  if (tasks.length === 0) {
    alert("No tasks to delete.");
    return;
  }
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
};
// ------------ Delete Done Tasks ------------
const deleteDoneTasks = () => {
  if (tasks.every(task => !task.done)) {
    alert("No done tasks to delete.");
    return;
  }
  if (confirm("Delete all done tasks?")) {
    tasks = tasks.filter(task => !task.done);
    saveTasks();
    renderTasks();
  }
};

// ------------ Filter Tasks ------------
const filterTasks = filter => {
  currentFilter = filter;
  renderTasks();
};
// ------------ Event Listeners ------------
taskForm.addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

renderTasks();
