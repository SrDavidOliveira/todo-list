const input = document.querySelector(".input-task");
const button = document.querySelector(".add-task");
const list = document.querySelector(".task-list");

let tasks = [];

function addTask() {
    if (input.value === "") {
        alert("Por favor, insira uma tarefa antes de adicionar!");
        return;
    }
  tasks.push({
    task: input.value,
    completed: false,
  });
  renderTasks();
  input.value = "";
}

function renderTasks() {
  let newLi = "";

  tasks.forEach((item, position) => {
    newLi += `
        <li class="task-item ${item.completed && "completed"}">
            <img src="./img/checked.png" alt="checked-lista" onclick="taskCompleted(${position})"/>
            <p>${item.task}</p>
            <img src="./img/trash.png" alt="tarefa-excluida" onclick="deleteTask(${position})"/>
        </li>
        `;
  });

  list.innerHTML = newLi;

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function taskCompleted(position) {
    tasks[position].completed = !tasks[position].completed;
    renderTasks();

}

function deleteTask(position) {
    tasks.splice(position, 1);
    renderTasks();

}

function loadTasks() {
    const data = localStorage.getItem('tasks');
    if(data){
        tasks = JSON.parse(data);
        renderTasks();
    }
}

loadTasks();
button.addEventListener("click", addTask);
