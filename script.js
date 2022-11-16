const newTaskInput = document.getElementById('texto-tarefa');
const addTaskBtn = document.getElementById('criar-tarefa');
const tasksList = document.getElementById('lista-tarefas');
const removeSelectedBtn = document.getElementById('remover-selecionado');
const clearCompletedBtn = document.getElementById('remover-finalizados');
const clearAllTasksBtn = document.getElementById('apaga-tudo');
const saveItemsBtn = document.getElementById('salvar-tarefas');
const previousSavedList = localStorage.getItem('listTasks');
const moveUpBtn = document.getElementById('mover-cima');
const moveDownBtn = document.getElementById('mover-baixo');

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

function removeSelectedItem() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    selectedItem.remove();
  }
}

const addNewTask = () => {
  const newListItem = document.createElement('li');
  newListItem.innerText = newTaskInput.value;
  tasksList.appendChild(newListItem);
  clearTaskInput();
  newListItem.addEventListener('click', changeItemBackgroundColor);
};

function toggleAsCompleted(event) {
  event.target.classList.toggle('completed');
}

function clearAllTasks() {
  for (let index = tasksList.childNodes.length - 1; index >= 0; index -= 1) {
    tasksList.removeChild(tasksList.childNodes[index]);
  }
}

const clearCompletedTasks = () => {
  const listItem = document.querySelectorAll('#lista-tarefas li');
  for (let index = 0; index < listItem.length; index += 1) {
    if (listItem[index].classList.contains('completed')) {
      listItem[index].remove();
    }
  }
};

function saveTasks() {
  const listItem = document.querySelectorAll('#lista-tarefas li');
  const tasks = [];
  for (let index = 0; index < listItem.length; index += 1) {
    const task = listItem[index];
    const object = {
      taskDescription: task.innerText,
      isCompleted: task.classList.contains('completed'),
    };
    tasks.push(object);
  }
  localStorage.setItem('listTasks', JSON.stringify(tasks));
}

function rescuePreviousList() {
  const list = JSON.parse(previousSavedList);
  const tasks = {};
  if (list != null && list !== '[]') {
    for (let index = 0; list.length > index; index += 1) {
      tasks[String(index)] = {
        taskDescription: list[index].taskDescription,
        isCompleted: list[index].isCompleted,
      };
      const item = document.createElement('li');
      item.innerText = tasks[String(index)].taskDescription;
      if (list[index].isCompleted) {
        item.classList.add('completed');
      }
      tasksList.appendChild(item);
    }
  }
}

window.onload = () => {
  rescuePreviousList();
};

function moveItem(event) {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    const previousItem = selectedItem.previousElementSibling;
    const nextItem = selectedItem.nextElementSibling;
    if (event.target === moveUpBtn && selectedItem !== tasksList.firstElementChild) {
      tasksList.removeChild(selectedItem);
      tasksList.insertBefore(selectedItem, previousItem);
    } else if (event.target === moveDownBtn && selectedItem !== tasksList.lastElementChild) {
      tasksList.removeChild(selectedItem);
      tasksList.insertBefore(selectedItem, nextItem.nextElementSibling);
      console.log(nextItem)
    }
  }
}

removeSelectedBtn.addEventListener('click', removeSelectedItem);
addTaskBtn.addEventListener('click', addNewTask);
tasksList.addEventListener('dblclick', toggleAsCompleted);
clearAllTasksBtn.addEventListener('click', clearAllTasks);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);
saveItemsBtn.addEventListener('click', saveTasks);
moveUpBtn.addEventListener('click', moveItem);
moveDownBtn.addEventListener('click', moveItem);
