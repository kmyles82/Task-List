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
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks)
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
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();    
        }
    }
}

//Clear tasks
function clearTasks(e) {
    //taskList.innerHTML = '';
    
    //faster way to clear tasks
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

//Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    //grab all list items and loop through
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;

        //check if there is a match for letter typed in
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

    console.log(text)
}