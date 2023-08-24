
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo); 
todoList.addEventListener("click", deleteOrCheck);
filterOption.addEventListener("click", filterTodo);


function addTodo(event) {
  
  event.preventDefault();
  
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  
  const newTodo = document.createElement("li");
  
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); 
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<a>&#10004;</a>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<a>&#10060;</a>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  
  todoList.appendChild(todoDiv);

  
  saveLocalTodos(todoInput.value);
 
  todoInput.value = "";
}

function deleteOrCheck(e) {
  console.log(e.target); 
  const item = e.target;
 
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
   
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    todo.classList.remove("uncompleted");
  } 
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos); 
  todos.forEach(function (todo) {
    console.log(e.target.value);
    switch (e.target.value) {
     
      case "all":
        todo.style.display = "flex"; 
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
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.toggle("uncompleted");
    
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<a>&#10004;</a>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
   
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<a>&#10060;</a>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

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
 
  console.log("todo", todo); 
  console.log("todo.children", todo.children);
  console.log("todo.children[0]", todo.children[0].innerText);

  const todoIndex = todo.children[0].innerText;
  console.log("todoIndex", todos.indexOf(todoIndex));

  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}