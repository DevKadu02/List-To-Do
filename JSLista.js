//Elementos
const todoForm = document.querySelector("#form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelButton = document.querySelector("#cancel-button-edit");
const submit = document.querySelector("#submit");
let oldInputvalue;

// Funções

const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneButton = document.createElement("button");
  doneButton.classList.add("finish-todo");
  doneButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneButton);

  const editButton = document.createElement("button");
  editButton.classList.add("edit-todo");
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editButton);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-todo");
  removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(removeButton);

  todoList.appendChild(todo);
  todoInput.value = "";
  todoInput.focus();

  // Atualiza o LocalStorage com a lista atualizada
  const existingTasks = JSON.parse(localStorage.getItem("todoList")) || [];
  existingTasks.push(text);
  localStorage.setItem("todoList", JSON.stringify(existingTasks));
};

const toggleForm = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputvalue) {
      todoTitle.innerText = text;
    }
  });

  // Atualiza o LocalStorage com a lista atualizada
  const existingTasks = JSON.parse(localStorage.getItem("todoList")) || [];
  const updatedTasks = existingTasks.map((task) =>
    task === oldInputvalue ? text : task
  );
  localStorage.setItem("todoList", JSON.stringify(updatedTasks));
};

// Carrega as tarefas do LocalStorage ao carregar a página
const loadTasksFromLocalStorage = () => {
    const existingTasks = JSON.parse(localStorage.getItem("todoList")) || [];
    
    // Limpa o LocalStorage
    localStorage.removeItem("todoList");
    
    existingTasks.forEach((task) => {
      saveTodo(task);
    });
  };
  
  loadTasksFromLocalStorage();
  ;

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();

    // Atualiza o LocalStorage com a lista atualizada
    const existingTasks = JSON.parse(localStorage.getItem("todoList")) || [];
    const updatedTasks = existingTasks.filter((task) => task !== todoTitle);
    localStorage.setItem("todoList", JSON.stringify(updatedTasks));
  }
  if (targetEl.classList.contains("edit-todo")) {
    toggleForm();
    editInput.value = todoTitle;
    oldInputvalue = todoTitle;
  }
});

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForm();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }
  toggleForm();
});
