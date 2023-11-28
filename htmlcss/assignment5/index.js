const root = document.getElementById("root");

const todoInput = document.createElement("input");
todoInput.type = "text";
todoInput.placeholder = "Add new task";
todoInput.id = "todoInput";

const addButton = document.createElement("button");
addButton.textContent = "Add";
addButton.id = "addButton";

const todoList = document.createElement("ul");
todoList.id = "todoList";

addButton.addEventListener("click", addTodoItem);

function addTodoItem() {
  const newTodoText = todoInput.value.trim();
  if (newTodoText) {
    const todoItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    function toggleTodoItem() {
      todoItem.classList.toggle("crossed-out", checkbox.checked);
    }

    checkbox.addEventListener("change", toggleTodoItem);

    const todoText = document.createElement("span");
    todoText.textContent = newTodoText;

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);

    todoList.appendChild(todoItem);

    todoInput.value = "";
  }
}

function showRemaining() {
  const remainingItems = document.querySelectorAll(
    "#todoList li:not(.crossed-out)"
  );

  remainingItems.forEach((item) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = item.querySelector("span").textContent;
    todoList.appendChild(taskItem);
  });
}

function showCompleted() {
  const completedItems = document.querySelectorAll("#todoList li.crossed-out");

  completedItems.forEach((item) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = item.querySelector("span").textContent;
    todoList.appendChild(taskItem);
  });
}

const remainingButton = document.createElement("button");
remainingButton.textContent = "Show Remaining";
remainingButton.addEventListener("click", showRemaining);
remainingButton.id = "remainingButton";

const showCompletedButton = document.createElement("button");
showCompletedButton.textContent = "Show Completed";
showCompletedButton.addEventListener("click", showCompleted);
showCompletedButton.id = "showCompletedButton";

root.appendChild(todoInput);
root.appendChild(addButton);
root.appendChild(todoList);
root.appendChild(remainingButton);
root.appendChild(showCompletedButton);
