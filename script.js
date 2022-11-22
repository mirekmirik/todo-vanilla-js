const btnDelete = document.querySelector(".todolist__task-btn--delete");
const btnUpdate = document.querySelector(".todolist__task-btn--update");
const todoList = document.querySelector(".todolist");
const btnAddTodo = document.querySelector(".form__todolist-btn");
const inputTodo = document.querySelector(".form__todolist-input");

const dateInYYYYMMDD = new Date().toISOString().slice(0, 10);

let user = [
//   {
//     description: "Обучение",
//     date: dateInYYYYMMDD,
//     id: 1,
//   },
//   {
//     description: "Курение",
//     date: dateInYYYYMMDD,
//     id: 2,
//   },
//   {
//     description: "Отдых",
//     date: dateInYYYYMMDD,
//     id: 3,
//   },
];
let id = 0;




const initializeAllTodos = function () {
    if (user.length == 0) {
      todoList.style.display = "none";
    }
    user.forEach((el) => {
        const html = `
                      <div class="todolist__task" data-index="${el.id}">
                          <div class="todolist__task-text">
                              <span class="todolist__task-todo-number">${el.todoNum+1}</span>
                              <p class="todolist__task-desc">Overview: ${el.description}</p>
                              <span class="todolist__task-date">Added: ${el.date}</span>
                              <span class="todolist__task-id">ID: ${el.id}</span>
                          </div>
                          <div class="todolist__task-btns">
                              <button class="todolist__task-btn todolist__task-btn--delete" type="button">X</button>
                              <button class="todolist__task-btn todolist__task-btn--update" type="button">update</button>
                          </div>
                      </div>
                      `;
    todoList.insertAdjacentHTML('afterbegin', html)
    })
    
};
initializeAllTodos();

const deleteTask = function (event) {
  if (!event.target.classList.contains("todolist__task-btn--delete")) return;
  let taskId = event.target
    .closest(".todolist__task")
    .getAttribute("data-index");

  let findIdxElementInObj = user.findIndex((el) => {
    return el.id == taskId;
  });
  // Remove from Object
  user.splice(findIdxElementInObj, 1);
  if (user.length == 0) {
    todoList.style.display = "none";
  }
  // Remove from DOM
  //   event.target.closest(".todolist__task").remove();
  todoList.innerHTML = '';
  initializeAllTodos();
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
  let updateTodoDescription = prompt("Update your TODO description", description.textContent);
  // Update Object
  findUser.description = updateTodoDescription;
  // Update DOM
  description.textContent = updateTodoDescription;
  console.log(findUser, user)
};
const addTask = function(event) {
    // Add into Object
     event.preventDefault();
     let newTodo = {
       description: inputTodo.value,
       date: dateInYYYYMMDD,
       id: id++,
       todoNum: user.length
     };
     user.push(newTodo);
     console.log(user);
    // Add into DOM
        //  const html = `
        //                   <div class="todolist__task" data-index="${newTodo.id}">
        //                       <div class="todolist__task-text">
        //                           <span class="todolist__task-todo-number">${newTodo.todoNum+1}</span>
        //                           <p class="todolist__task-desc">${newTodo.description}</p>
        //                           <span class="todolist__task-date">Added: ${newTodo.date}</span>
        //                           <span class="todolist__task-id">ID: ${newTodo.id}</span>
        //                       </div>
        //                       <div class="todolist__task-btns">
        //                           <button class="todolist__task-btn todolist__task-btn--delete" type="button">X</button>
        //                           <button class="todolist__task-btn todolist__task-btn--update" type="button">update</button>
        //                       </div>
        //                   </div>
        //                   `;

        //  todoList.insertAdjacentHTML("afterbegin", html);
    todoList.innerHTML = '';
    inputTodo.value = "";
    initializeAllTodos();
    todoList.style.display = "block";
};

// Delete
todoList.addEventListener("click", deleteTask.bind(this));

// Update
todoList.addEventListener("click", updateTask.bind(this));

// Create
btnAddTodo.addEventListener('click', addTask.bind(this));
    


