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
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);


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
  // Clear input
  taskInput.value = '';

  e.preventDefault(); // sprecava da se forma submituje 
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}