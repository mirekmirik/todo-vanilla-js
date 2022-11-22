const btnDelete = document.querySelector(".todolist__task-btn--delete");
const btnUpdate = document.querySelector(".todolist__task-btn--update");
const todoList = document.querySelector(".todolist");
// const taskId = document.querySelector('.todolist__task-id')

let user = [
  {
    description: "Обучение",
    date: Date.now(),
    id: 1,
  },
  {
    description: "Обучение",
    date: Date.now(),
    id: 2,
  },
  {
    description: "Обучение",
    date: Date.now(),
    id: 3,
  },
];

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
  if(user.length == 0) {
    todoList.style.display = 'none';
  }
  // Remove from DOM
  event.target.closest(".todolist__task").remove();
  console.log(user);
};

// const updateTask = function (event) {};

todoList.addEventListener("click", deleteTask.bind(this));
