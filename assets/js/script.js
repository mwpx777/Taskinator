//this assigns buttonEl name to save-task id
 buttonEl = document.querySelector("#save-task");
 //this assigns tasksToDoEl to the Unordered List
 tasksToDoEl = document.querySelector("#tasks-to-do");

 //this function must come before the event listener
 var createTaskHandler = function(){
    listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task";
    tasksToDoEl.appendChild(listItemEl);
}

//this is a function   event is the function
buttonEl.addEventListener('click', createTaskHandler);
   


//1 click on button
//2 li item will be created 
//3 li item will take on CSS style of task-item
//4 textContent will add "This is a new task" text 
//5 appendChild will add listItemEl to end of tasksToDoEl

//tasksToDoEl will equal id = tasks-to-do
//var tasksToDoEl = document.querySelector("#tasks-to-do");
//taskItemEl will equal li element
//var taskItemEl = document.createElement("li");
//textContent will set text
//taskItemEl.textContent = "Tasks To Do";
//className will give the list item CSS properties
//taskItemEl.className = "task-item";
//appendChild will add taskItemEl to list taskToDoEl at bottom of list
//tasksToDoEl.appendChild(taskItemEl);