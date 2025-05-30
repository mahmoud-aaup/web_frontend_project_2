let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
} 

function addTask() {
  const input = document.getElementById("new-task");
  const taskText = input.value.trim();
  if (taskText === "") return;
  tasks.push({ text: taskText, done: false });
  input.value = "";
  saveTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function deleteDoneTasks() {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
  }
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (currentFilter === "done" && !task.done) ||
      (currentFilter === "todo" && task.done)
    ) return;

    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${index})">
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})"> 🗑️ </button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Initial load
renderTasks();
