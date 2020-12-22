//creates a variable number to the task ID
var taskIdCounter = 0;

//this assigns buttonEl name to save-task id
var formEl = document.querySelector("#task-form");

//this assigns tasksToDoEl to the Unordered List
var tasksToDoEl = document.querySelector("#tasks-to-do");

//this assigns pageContentEl to id = "page-content" in HTML.  Event listener for this at bottom of page
var pageContentEl = document.querySelector("#page-content");

//this is function for editing or deleting the task 
var taskButtonHandler = (event) => {
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if(event.target.matches(".edit-btn")){
        var taskId= targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //delete button was clicked
     else if (event.target.matches(".delete-btn")){
        //get the element's task id
        var taskId = event.target.getAttribute("data-task-id")
        //this will delete task with deleteTask function below 
        deleteTask(taskId);
    }
    
  };
  //this will delete the task based on taskButtonHandler function above ^
  var deleteTask = (taskId) =>{
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

    //editTaskFunction
    var editTask = (taskId) =>{
        
       
        //get task list item element
       var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

       //get text in taskName
       var taskName = taskSelected.querySelector("h3.task-name").textContent;
       //this is getting the value of taskName text
       document.querySelector("input[name='task-name']").value = taskName;

        //get taskType value
        var taskType = taskSelected.querySelector("span.task-type").textContent;
        //this is getting the value from dropdown list of taskType
        document.querySelector("select[name='task-type']").value = taskType;
        //change name of "Add Task" button in header to "Save Task"
        document.querySelector("#save-task").textContent = "Save Task";
        //assign new taskId number to edited task
        formEl.setAttribute("data-task-id", taskId);
    };

 //this function must come before the event listener
var taskFormHandler = (event) =>{
   //this will stop browser from refreshing
    event.preventDefault();
    //this line finds the HTML where text is inputted
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //this finds which dropdown item is selectd from the list
   var taskTypeInput = document.querySelector("select[name='task-type']").value;
     
    //alert if fields are blank
    //1. if taskNameInput OR taskTypeInput are blank (falsy value || ! 'not' is false value)
    //2. get alert message
    //3. return false statement
    if (!taskNameInput || !taskTypeInput){
        alert("Please fill out the task form before submitting")
        return false;
    }

    //this will reset the form
    formEl.reset();
    //package up data as an object  
    const taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an arugment to createTaskEl
    //this info isnt availble outside of this function, so it has to be passed to createTaskEl as an argument
    createTaskEl(taskDataObj);
}

//function 
var createTaskEl = (taskDataObj) => {
   
     //create list item
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";
 
     //add "data-task-id" and taskIdCounter as a custom attribute to listItemEl
     listItemEl.setAttribute("data-task-id", taskIdCounter)

     //create div to hold task info and add to list item
     var taskInfoEl = document.createElement("div");
 
     //give it a class name
     taskInfoEl.className = "task-info";


     //add HTML content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
 
     listItemEl.appendChild(taskInfoEl);
    
     //this creates the buttons the correspond to the current task list
     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);
     //add entire list item to list
     tasksToDoEl.appendChild(listItemEl);

     //increase task counter for next unique id
     taskIdCounter++;

};

//function will createTaskActions
//taskId will pass different id into the function each time
var createTaskActions = (taskId) => {
    //creates new <div> for elements below to be stored
    var actionContainerEl = document.createElement("div");
    
    //gives <div> the "task-actions" CSS class
    actionContainerEl.className = "task-actions";
    //create edit button
    var editButtonEl = document.createElement("button");
   //gives button its name "Edit"
    editButtonEl.textContent = "Edit";
    //gives editButtonEl its CSS class
    editButtonEl.className = "btn edit-btn";
    //gives the button an attribute of "dataTaskId" and taskId
    editButtonEl.setAttribute("data-task-id", taskId);

    //this will add the edit button to editButtonEl
    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //this will add the dropdown box "select"
    var statusSelectEl = document.createElement("select");
    //create an array of "status-select" choices
    var statusChoices = ["To Do", "In Progress", "Completed"]

    //create for loop for the "status-select" choices
    for ( var i=0; i < statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement("option");
    //this will add the statusChoices to the dropdown list
    //statusChoices[i] returns value of array to "i" in for loop
    statusOptionEl.textContent = statusChoices[i];
    //this will set attribute of statusOptionEl to "value" and statusChoices[i]
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //this will add statusSelectEl to statusOptionEl dropdown list
    statusSelectEl.appendChild(statusOptionEl);
    }
    
    //this gives statusSelectEL the CSS class
    statusSelectEl.className = "select-status";
    //this gives dropdown the attribute of "status-change"
    statusSelectEl.setAttribute("name", "status-change");
    //this gives statusSelectEl the attribute of "data-task-id" taskId number
    statusSelectEl.setAttribute("data-task-id", taskId);

    //this will add the dropdown info to statusSelectEl
    actionContainerEl.appendChild(statusSelectEl);


    //this returns the editButtonEl and deleteButtonEl values to actionContainer
    return actionContainerEl;
};



//this is a function  'submit' is the function
formEl.addEventListener('submit', taskFormHandler);

// for edit and delete buttons

pageContentEl.addEventListener("click", taskButtonHandler);


//1 click on button
//2 li item will be created 
//3 li item will take on CSS style of task-item
//4 textContent will add taskNameInput (user entered text) 
//5 appendChild will add listItemEl to tasksToDoEl

