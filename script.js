//Define UI Variable
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
    //Add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    
    //create li element
    const li = document.createElement('li');
    //add a class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add a class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to the li
    li.appendChild(link);
    //append the li to ul
    taskList.appendChild(li);

    //clear the input
    taskInput.value = ''

    console.log(li)

    e.preventDefault();
}

//Remove task
function removeTask(e) {
    //grab the a tag that contains the delete icon 
    if (e.target.parentElement.classList.contains('delete-item')) {
        // console.log(e.target);    
        e.target.parentElement.parentElement.remove();
    }
    
}