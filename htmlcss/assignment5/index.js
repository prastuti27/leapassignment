//variables
var allTasks = [];
var completed = [];
var remaining = [];

//Adding required elements
const header = document.getElementById("header");

//label
const label = document.createElement("label");
label.innerText = "Task Title";
label.setAttribute("for", "task-input");
header.appendChild(label);

//input
const inputField = document.createElement("input");
inputField.id = "task-input";
inputField.setAttribute("name", "task=input");
inputField.placeholder = "Enter your task";
header.appendChild(inputField);

//button
const addButton = document.createElement("button");
addButton.id = "add-button";
addButton.innerText = "Add";

//All Button
const allButton = document.createElement("button");
allButton.id = "all-button";
allButton.innerText = "All Tasks";

allButton.addEventListener("click", showAllTasks);

//Completed Button
const completedButton = document.createElement("button");
completedButton.id = "completed-button";
completedButton.innerText = "Completed Tasks";

completedButton.addEventListener("click", showCompletedTasks);

//Remaining Button
const remainingButton = document.createElement("button");
remainingButton.id = "remaining-button";
remainingButton.innerText = "Remaining Tasks";
allButton;

remainingButton.addEventListener("click", showRemainingTasks);

header.appendChild(addButton);

// division for buttons
const buttonDivision = document.createElement("div");
buttonDivision.id = "division-button";
header.appendChild(buttonDivision);

buttonDivision.appendChild(remainingButton);
buttonDivision.appendChild(completedButton);
buttonDivision.appendChild(allButton);

//adding event on Add Button
addButton.addEventListener("click", addTask);

//addTaskFunction

function addTask() {
  if (inputField.value !== "") {
    allTasks.push(inputField.value);
    remaining.push(inputField.value);
  }
  inputField.value = "";
  showAllTasks();
}

//container element
const container = document.getElementById("container");

//Creating List Element
const list = document.createElement("ul");
list.setAttribute("id", "task-list");

container.appendChild(list);

//function to make checked
function markCompleted(index) {
  if (completed.includes(allTasks[index])) {
    completed = completed.filter((task) => task !== allTasks[index]);
    remaining.push(allTasks[index]);
  } else {
    completed.push(allTasks[index]);
    remaining = remaining.filter((task) => task !== allTasks[index]);
  }
  const selectedTaskSpan = document.getElementById(`task-${index}-title`);
  if (completed.includes(allTasks[index])) {
    selectedTaskSpan.style.textDecoration = "line-through";
  } else {
    selectedTaskSpan.style.textDecoration = "none";
  }
}

//completed Section
function showCompletedTasks() {
  list.innerHTML = "";
  completed.forEach((task, index) => {
    let newList = document.createElement("li");
    newList.setAttribute("id", `task-${index}`);

    //task title
    let newSpan = document.createElement("span");
    newSpan.id = `task-${index}-title`;
    newSpan.innerText = task;
    newSpan.style.textDecoration = "line-through";

    //button
    let button = document.createElement("button");
    button.id = `btn-${index}`;
    button.innerText = "Mark Done";

    newList.appendChild(newSpan);
    newList.appendChild(button);
    button.addEventListener("click", (e) => markCompleted(index));

    list.appendChild(newList);
  });
}

//Remaining Section
function showRemainingTasks() {
  list.innerHTML = "";

  remaining.forEach((task, index) => {
    let newList = document.createElement("li");
    newList.setAttribute("id", `task-${index}`);

    //task title
    let newSpan = document.createElement("span");
    newSpan.id = `task-${index}-title`;
    newSpan.innerText = task;

    //button
    let button = document.createElement("button");
    button.id = `btn-${index}`;
    button.innerText = "Mark Done";

    newList.appendChild(newSpan);
    newList.appendChild(button);
    button.addEventListener("click", (e) => markCompleted(index));

    list.appendChild(newList);
  });
}

//All Section
function showAllTasks() {
  list.innerHTML = "";
  allTasks.forEach((task, index) => {
    let newList = document.createElement("li");
    newList.setAttribute("id", `task-${index}`);

    //task title
    let newSpan = document.createElement("span");
    newSpan.id = `task-${index}-title`;
    newSpan.innerText = task;
    if (completed.includes(task)) {
      newSpan.style.textDecoration = "line-through";
    }

    //button
    let button = document.createElement("button");
    button.id = `btn-${index}`;
    button.innerText = "Mark Done";

    newList.appendChild(newSpan);
    newList.appendChild(button);
    button.addEventListener("click", (e) => markCompleted(index));

    list.appendChild(newList);
  });
}
