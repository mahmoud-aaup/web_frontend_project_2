// ------------ Constants and Selectors ------------
const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ------------ Utility Functions ------------
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
