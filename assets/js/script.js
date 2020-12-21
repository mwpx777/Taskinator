//this assigns buttonEl name to save-task id
 formEl = document.querySelector("#task-form");
 //this assigns tasksToDoEl to the Unordered List
 tasksToDoEl = document.querySelector("#tasks-to-do");

 //this function must come before the event listener
 var createTaskHandler = function(event){
   //this will stop browser from refreshing
    event.preventDefault();
    //this line finds the HTML where text is inputted
    const taskNameInput = document.querySelector("input[name='task-name']").value;
    //this finds which dropdown item is selectd from the list
    const taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //create list item
    const listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    const taskInfoEl = document.createElement("div");

    //give it a class name
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class = 'task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    
}

//this is a function   event is the function
formEl.addEventListener('submit', createTaskHandler);
   


//1 click on button
//2 li item will be created 
//3 li item will take on CSS style of task-item
//4 textContent will add taskNameInput (user entered text) 
//5 appendChild will add listItemEl to tasksToDoEl

