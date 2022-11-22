const btnDelete = document.querySelector(".todolist__task-btn--delete");
const btnUpdate = document.querySelector(".todolist__task-btn--update");
const todoList = document.querySelector(".todolist");
// const taskId = document.querySelector('.todolist__task-id')

let dateInYYYYMMDD = new Date().toISOString().slice(0, 10);

let user = [
  {
    description: "Обучение",
    date: dateInYYYYMMDD,
    id: 1,
  },
  {
    description: "Курение",
    date: dateInYYYYMMDD,
    id: 2,
  },
  {
    description: "Отдых",
    date: dateInYYYYMMDD,
    id: 3,
  },
];

const initializeAllTodos = function () {
    user.forEach((el) => {
        const html = `
                      <div class="todolist__task" data-index="${el.id}">
                          <div class="todolist__task-text">
                              <p class="todolist__task-desc">${el.description}</p>
                              <span class="todolist__task-date">${el.date}</span>
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
  // Remove from Object
  let taskId = event.target
    .closest(".todolist__task")
    .getAttribute("data-index");

  let findIdxElementInObj = user.findIndex((el) => {
    return el.id == taskId;
  });

  user.splice(findIdxElementInObj, 1);
  if (user.length == 0) {
    todoList.style.display = "none";
  }
  // Remove from DOM
  event.target.closest(".todolist__task").remove();
  console.log(user);
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
  let updateTodo = prompt("Update your TODO", description.textContent);
  findUser.description = updateTodo;
  description.textContent = updateTodo;
  console.log(user);
};

// Delete
todoList.addEventListener("click", deleteTask.bind(this));


// Update
todoList.addEventListener("click", updateTask.bind(this));



