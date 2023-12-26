class TaskManager {
  allTasks: string[];
  completed: string[];
  remaining: string[];
  inputField: HTMLInputElement | null;
  list: HTMLUListElement | null;
  searchField: HTMLInputElement | null;
  searchButton: HTMLButtonElement | null;

  constructor() {
    this.allTasks = [];
    this.completed = [];
    this.remaining = [];
    this.inputField = document.getElementById("task-input") as HTMLInputElement;
    this.list = document.getElementById("task-list") as HTMLUListElement;
    this.searchField = document.getElementById(
      "search-input"
    ) as HTMLInputElement;
    this.searchButton = document.getElementById(
      "search-button"
    ) as HTMLButtonElement;

    this.init();
  }

  init() {
    const header = document.getElementById("header");
    if (header && this.inputField) {
      const addButton = document.getElementById("add-button");
      const allButton = document.getElementById("all-button");
      const completedButton = document.getElementById("completed-button");
      const remainingButton = document.getElementById("remaining-button");

      addButton?.addEventListener("click", () => this.addTask());
      allButton?.addEventListener("click", () => this.showAllTasks());
      completedButton?.addEventListener("click", () =>
        this.showCompletedTasks()
      );
      remainingButton?.addEventListener("click", () =>
        this.showRemainingTasks()
      );
      if (this.searchButton && this.searchField) {
        this.searchButton.addEventListener("click", () => this.searchTasks());
      }
    }
  }

  searchTasks() {
    if (this.searchField) {
      const searchTerm = this.searchField.value.toLowerCase();
      const filteredTasks = this.allTasks.filter((task) =>
        task.toLowerCase().includes(searchTerm)
      );
      this.renderTaskList(filteredTasks);
    }
  }

  addTask() {
    if (this.inputField && this.inputField.value !== "") {
      this.allTasks.push(this.inputField.value);
      this.remaining.push(this.inputField.value);
      this.inputField.value = "";
      this.showAllTasks();
    }
  }

  markCompleted(index: number) {
    if (this.completed.includes(this.allTasks[index])) {
      this.completed = this.completed.filter(
        (task) => task !== this.allTasks[index]
      );
      this.remaining.push(this.allTasks[index]);
    } else {
      this.completed.push(this.allTasks[index]);
      this.remaining = this.remaining.filter(
        (task) => task !== this.allTasks[index]
      );
    }
    this.updateTaskDisplay(index);
  }

  updateTaskDisplay(index: number) {
    const selectedTaskSpan = document.getElementById(`task-${index}-title`);
    if (selectedTaskSpan) {
      selectedTaskSpan.style.textDecoration = this.completed.includes(
        this.allTasks[index]
      )
        ? "line-through"
        : "none";
    }
  }

  createTaskElement(task: string, index: number): HTMLLIElement {
    const newList = document.createElement("li");
    newList.setAttribute("id", `task-${index}`);

    const newSpan = document.createElement("span");
    newSpan.id = `task-${index}-title`;
    newSpan.innerText = task;

    const button = document.createElement("button");
    button.id = `btn-${index}`;
    button.innerText = "Done";
    button.addEventListener("click", () => this.markCompleted(index));

    newList.appendChild(newSpan);
    newList.appendChild(button);

    return newList;
  }

  renderTaskList(tasks: string[]) {
    if (this.list) {
      this.list.innerHTML = "";
      tasks.forEach((task, index) => {
        const newList = this.createTaskElement(task, index);
        this.list?.appendChild(newList);
        this.updateTaskDisplay(index);
      });
    }
  }

  showAllTasks() {
    this.renderTaskList(this.allTasks);
  }

  showCompletedTasks() {
    this.renderTaskList(this.completed);
  }

  showRemainingTasks() {
    this.renderTaskList(this.remaining);
  }
}

const taskManager = new TaskManager();
