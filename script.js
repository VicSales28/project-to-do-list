const newTaskInput = document.getElementById('texto-tarefa');
const addTaskBtn = document.getElementById('criar-tarefa');
const tasksList = document.getElementById('lista-tarefas');

//const removeSelectedBtn = document.getElementById('remover-selecionado');
const clearCompletedBtn = document.getElementById('remover-finalizados');
const clearAllTasksBtn = document.getElementById('apaga-tudo');

//const saveItemsBtn = document.getElementById('salvar-tarefas');
//const moveUpBtn = document.getElementById('mover-cima');
//const moveDownBtn = document.getElementById('mover-baixo');

const clearTaskInput = () => {
  newTaskInput.value = '';
};

function changeItemBackgroundColor(event) {
  const listItem = event.target;
  if (document.querySelector('.selected')) {
    document.querySelector('.selected').classList.remove('selected');
  }
  listItem.classList.add('selected');
}

const addNewTask = () => {
  const newListItem = document.createElement('li');
  newListItem.innerText = newTaskInput.value;
  tasksList.appendChild(newListItem);
  clearTaskInput();
  newListItem.addEventListener('click', changeItemBackgroundColor);
};

addTaskBtn.addEventListener('click', addNewTask);

function toggleAsCompleted(event) {
  event.target.classList.toggle('completed');
}

tasksList.addEventListener('dblclick', toggleAsCompleted);

function clearAllTasks() {
  for (let index = tasksList.childNodes.length - 1; index >= 0; index -= 1) {
    tasksList.removeChild(tasksList.childNodes[index]);
  }
}

clearAllTasksBtn.addEventListener('click', clearAllTasks);

const clearCompletedTasks = () => {
  const listItem = document.querySelectorAll('#lista-tarefas li');
  for (let index = 0; index < listItem.length; index += 1) {
    if (listItem[index].classList.contains('completed')) {
      listItem[index].remove();
    }
  }
}
clearCompletedBtn.addEventListener('click', clearCompletedTasks);