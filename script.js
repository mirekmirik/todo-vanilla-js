const btnDelete = document.querySelector(".todolist__task-btn--delete");
const btnUpdate = document.querySelector(".todolist__task-btn--update");
const btnMark = document.querySelector(".todolist__task-btn--mark");
const todoList = document.querySelector('.todolist')
const todoListAll = document.querySelector(".todolist__all");
const todoListMarked = document.querySelector('.todolist__marked');


// const todoListMarked
const btnMarkWrapper = document.querySelector('.todolist__mark-btn-wrapper')
const btnAddTodo = document.querySelector(".form__todolist-btn");
const inputTodo = document.querySelector(".form__todolist-input");
const formTodo = document.querySelector(".form__todolist");
const clearTodoText = document.querySelector('.todolist__clear')
const btnOpenMarkTodo = document.querySelector(".todolist__mark-btn");
const markedTodos = document.querySelector(".todolist__marked");
const dateInYYYYMMDD = new Date().toISOString().slice(0, 10);

let user = [
  {
    description: "Изучать английский",
    date: dateInYYYYMMDD,
    todoNum: 1,
    id: 0,
    isDone: true,
  },
  {
    description: "Учиться",
    date: dateInYYYYMMDD,
    todoNum: 2,
    id: 1,
    isDone: true,
  },
  {
    description: "Прогуляться",
    date: dateInYYYYMMDD,
    todoNum: 3,
    id: 2,
    isDone: false,
  },
  {
    description: "Посмотреть фильм",
    date: dateInYYYYMMDD,
    todoNum: 4,
    id: 3,
    isDone: false,
  },
];
let id = 0;
let inMarkMenu = 0;



let userFilterMark = user.filter((el, _, arr) => {
  allElements = arr.length;
  return el.isDone;
});

// todoList.insertAdjacentHTML('afterbegin','<p class="todolist__clear none">Todo list is clear!</p>')

const initializeAllTodos = function (
  par1 = user,
  par2 = todoList,
  par3 = "afterbegin",
  state
) {
  if (par1.length == 0) {
    console.log(user);
    par2.classList.add("none");
    clearTodoText.classList.remove("none");
    console.log("hi");
    return;
  }
  par2.classList.remove("none");
  clearTodoText.classList.add("none");
  console.log("initialize");
  par1.forEach((el) => {
    const html = `<div class="todolist__task" data-index="${el.id}">
                            <div class="todolist__task-text">
                                <span class="todolist__task-todo-number">${el.todoNum}</span>
                                <p class="todolist__task-desc">${el.description}</p>
                                <span class="todolist__task-date">Added: ${el.date}</span>
                                <span class="todolist__task-id">ID: ${el.id}</span>
                            </div>
                            <div class="todolist__task-btns">
                                <button class="todolist__task-btn todolist__task-btn--delete" type="button">X</button>
                                <button class="todolist__task-btn todolist__task-btn--update" type="button">update</button>
                                <button class="todolist__task-btn todolist__task-btn--mark" type="button">complete</button>
  
                            </div>
                        </div>
                        `;
    par2.insertAdjacentHTML(par3, html);
    console.log(el);
    if (el.isDone) {
      console.log(document.querySelector(".todolist__task"));
      document.querySelector(".todolist__task").style.backgroundColor =
        "rgba(12, 255, 141, 0.8)";
      document.querySelector(
        ".todolist__task-btn--mark"
      ).style.backgroundColor = "greenyellow";
      document.querySelector(".todolist__task-btn--mark").textContent += "d";
    }
  });
};

initializeAllTodos();

const checkIsArrEmpty = function () {
  if (user.length == 0) {
    todoList.classList.add("none");
    clearTodoText.classList.remove("none");
    clearTodoText.textContent = "Todolist is clear!";
  }
};

const deleteTask = function (event) {
  if (!event.target.classList.contains("todolist__task-btn--delete")) return;
  let taskId = event.target
    .closest(".todolist__task")
    .getAttribute("data-index");
  console.log(taskId);

  let findIdxElementInObj = user.findIndex((el) => {
    return el.id == taskId;
  });
  // Remove from Object
  user.splice(findIdxElementInObj, 1);
  // Remove from DOM
  console.log(user);
  event.target.closest(".todolist__task").remove();
  checkIsArrEmpty();
};

const updateTask = function (event) {
  if (!event.target.classList.contains("todolist__task-btn--update")) return;
  let description = event.target
    .closest("div")
    .previousElementSibling.querySelector(".todolist__task-desc");
  let taskId = event.target
    .closest(".todolist__task")
    .getAttribute("data-index");
  let findUser = user.find((el) => el.id == taskId);
  let updateTodoDescription = prompt(
    "Update your TODO description",
    description.textContent
  );
  if (
    updateTodoDescription == findUser.description ||
    updateTodoDescription.length == 0
  )
    return alert(
      "Your input value is equal to previous input value OR length input value empty, pls change input"
    );

  // Update Object
  findUser.description = updateTodoDescription;
  // Update DOM
  // todoList.innerHTML = "";
  // initializeAllTodos();
  description.textContent = updateTodoDescription;
  console.log(findUser, user);
};

const addTask = function (event) {
  // Add into Object
  event.preventDefault();
  if (inputTodo.value == "") {
    return alert("Input не может быть пустым!");
  }
  let newTodo = {
    description: inputTodo.value,
    date: dateInYYYYMMDD,
    id: user.length,
    todoNum: user.length + 1,
    isDone: false,
  };
  user.push(newTodo);
  console.log(user);
  // Update DOM
  inputTodo.value = "";
  if (inMarkMenu == 1) {
    inMarkMenu = 0;
    btnOpenMarkTodo.textContent = "You in Mark menu now";
    todoList.innerHTML = "";
    initializeAllTodos();
    todoList.classList.remove("none");
  }
  btnOpenMarkTodo.textContent = "Mark Menu";
  todoList.innerHTML = "";
  initializeAllTodos();
  todoList.classList.remove("none");
};

const markTask = function (event) {
  if (!event.target.classList.contains("todolist__task-btn--mark")) return;
  console.log(event.target);

  const getAttribute = event.target
    .closest(".todolist__task")
    .getAttribute("data-index");
  console.log(user);
  const findUser = user.find((el) => {
    return el.id == getAttribute;
  });
  let getMarkBtn = event.target
    .closest(".todolist__task")
    .querySelector(".todolist__task-btn--mark");
  let getTask = event.target.closest(".todolist__task");
  if (findUser.isDone) {
    console.log(getMarkBtn);
    findUser.isDone = false;
    getMarkBtn.style.backgroundColor = "white";
    getMarkBtn.textContent = "complete";
    getTask.style.backgroundColor = "orange";
    console.log(user);
    return;
  }
  findUser.isDone = true;
  getMarkBtn.style.backgroundColor = "greenyellow";
  getMarkBtn.textContent = "completed";
  getTask.style.backgroundColor = "rgba(12, 255, 141, 0.8)";
};

const transactionToMarkTodos = function () {
  let userFilterMark = user.filter((el, _, arr) => {
    allElements = arr.length;
    return el.isDone;
  });
  todoList.innerHTML = "";
  inMarkMenu = inMarkMenu == 0 ? 1 : 0;
  if (inMarkMenu) {
    btnOpenMarkTodo.textContent = "You in Completed todos now";
    initializeAllTodos(userFilterMark, todoList, "afterbegin");
  } else {
    btnOpenMarkTodo.textContent = "Completed todos";
    todoList.innerHTML = "";
    console.log(user);
    console.log("ss");
    initializeAllTodos();
  }
};

// Delete
todoList.addEventListener("click", deleteTask.bind(this));

// Update
todoList.addEventListener("click", updateTask.bind(this));

// Mark
todoList.addEventListener("click", markTask.bind(this));

// Create
btnAddTodo.addEventListener("click", addTask.bind(this));

// Toggle Mark-list / All-list
btnOpenMarkTodo.addEventListener("click", transactionToMarkTodos.bind(this));



