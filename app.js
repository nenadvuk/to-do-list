// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);


}

// Get Tasks from LS // Pri osvezvanju stranice ucitavaju se podaci sa LS, ne brisu se kao sto bi u normalnom slucaju
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}



// Add Task (event object na primer (e))
function addTask(e) {
  if (taskInput.value === '' /*if nothing is enterd in input field */) {
    alert('Add a task');
  }

  // Create li element // Dodajemo prazan <li> tag
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item'; // Dodavanje klase
  // Create text node and append to li // sve sto je unesto u new task inputu
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element // kreiramo element <a>
  const link = document.createElement('a');
  // Add class // Dodajemo mu klase
  link.className = 'delete-item secondary-content';
  // Add icon html // Dodajemo x ikonicu
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li // 
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);


  // Store in LS
  storeTaskInLocalStorage(taskInput.value);


  // Clear input
  taskInput.value = '';

  e.preventDefault(); // sprecava da se forma submituje 
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; // Ukoliko je LS prazan, kreiramo prazan niz
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // JSON.parse sve pretvara u string,jer LS moze jednino da cuva stringove
  }

  tasks.push(task); //

  localStorage.setItem('tasks', JSON.stringify(tasks));
}




// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      console.log(e.target.parentElement.parentElement) // posto nema id elementa, onda se ovako brise konzola ovo izbacuje:  
      // <li class="collection-item">three<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}