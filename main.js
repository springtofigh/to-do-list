
const todoInput = document.querySelector(".todo-inpute");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


// EVENTS
todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click", deleteCompleteTodo);
filterOption.addEventListener("click" , filterTodo );
document.addEventListener("DOMContentLoaded" , getTodos);

// =========================>>>> FUNCTIONS   <<<<=========================

//add to do jobs
function addTodo(event) {
    event.preventDefault();
    // TO DO JOBS STYLES
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
    // TO DO TEXT
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    
    // SAVE USER TEXT IN LOCAL STORAGE
    saveLocalTodo(todoInput.value);
    
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    
    // COMPLETED BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class= 'fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton)

    // DELETE AND TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class= 'fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

// TO DO REMOVE BUTTON
function deleteCompleteTodo(event) {
    const item = event.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodo(todo);
        // REMOVE ELEMENT
        todo.remove();
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

// FILTER OPTIONS
function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
    switch (event.target.value) {
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
        if (todo.classList.contains("completed")) {
            todo.style.display = "none";
        } else {
            todo.style.display = "flex";
        }
        break;
    }
    })
}

// SAVE TO LOCAL STORAGE
function saveLocalTodo(todo) {
    let todos;
    // FIRST TIME SOMETHING ADD TO LOCAL STORAGE
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        // SOMETHING WAS SAVED 
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

// REMOVE FROM LOCAL STORAGE
function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
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

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv)
})
}