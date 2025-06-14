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