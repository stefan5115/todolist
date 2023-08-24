// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo); // why do we not need to add () to the function
todoList.addEventListener("click", deleteOrCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // Prevent form from submitting - the button is not refreshing the page
  event.preventDefault();
  // todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create LI
  const newTodo = document.createElement("li");
  // newTodo.innerText = "hey";
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); // we are sticking the newTodo li inside the div element we created
  // Check Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<a>&#10004;</a>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<a>&#10060;</a>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // Append to list
  todoList.appendChild(todoDiv);

  // Add Todo to Localstorage
  saveLocalTodos(todoInput.value);
  // Clear Todo input value
  todoInput.value = "";
}

function deleteOrCheck(e) {
  console.log(e.target); // click on a li to see what event we are getting when clicking different elements
  const item = e.target;
  // Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Check todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    todo.classList.remove("uncompleted");
  } 
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos); // add some todos and test the console.log(todos) output.
  todos.forEach(function (todo) {
    console.log(e.target.value);
    switch (e.target.value) {
      // value = all completed uncompleted
      case "all":
        todo.style.display = "flex"; // we have flex here because we styled our elements with flex. Try also block out.
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("uncompleted")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Check if we have Todos already in the local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.toggle("uncompleted");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Check Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<a>&#10004;</a>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<a>&#10060;</a>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // To be able to delete a specific todo, we need the index of the the item
  console.log("todo", todo); // we get the element with the class="todo fall"
  console.log("todo.children", todo.children);
  console.log("todo.children[0]", todo.children[0].innerText);

  const todoIndex = todo.children[0].innerText;
  console.log("todoIndex", todos.indexOf(todoIndex));

  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}