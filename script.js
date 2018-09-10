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
    //retrieve data from localstorage
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks);
    
}
//Get taks from LocalStorage
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //localstorage only stores strings, convert string to array 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //loop through tasks store in local storage and create dom element for each task
    tasks.forEach(function (task) {
        //create li element
        const li = document.createElement('li');
        //add a class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
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
    });
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

    //store in localstorage
    storeTaskInLocalStorage(taskInput.value);

    //clear the input
    taskInput.value = ''

    // console.log(li)

    e.preventDefault();
}

//store to local storage
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //localstorage only stores strings, convert string to array 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task)
    //convert data back to a string
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove task
function removeTask(e) {
    //grab the a tag that contains the delete icon 
    if (e.target.parentElement.classList.contains('delete-item')) {
        // console.log(e.target);    
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();    

            //remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove tasks from local storage
function removeTaskFromLocalStorage(taskItem) {
    // console.log(taskItem)
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //localstorage only stores strings, convert string to array 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //loop through tasks
    tasks.forEach(function (task,index) {
        //check to see taskItem text content matches the current task in iteration
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    //convert data back to a string
    localStorage.setItem('tasks',JSON.stringify(tasks));
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

