//creates a variable number to the task ID
var taskIdCounter = 0;

//this assigns buttonEl name to save-task id
var formEl = document.querySelector("#task-form");

//this assigns tasksToDoEl to the Unordered List
var tasksToDoEl = document.querySelector("#tasks-to-do");

//this assigns "Tasks In Progress" section
var tasksInProgressEl = document.querySelector("#tasks-in-progress");

//this assigsn "Tasks Completed" section
var tasksCompletedEl = document.querySelector("#tasks-completed");

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
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };

    //will inform if task is an edited task
    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if(isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completedEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else{
        var taskDataObj = {
            name : taskNameInput,
            type : taskTypeInput,
            status : "to do"

        };
        createTaskEl(taskDataObj);
    }

    //send it as an arugment to createTaskEl
    //this info isnt availble outside of this function, so it has to be passed to createTaskEl as an argument
    
}  //this is the end of taskButtonHandler

    //function for "change" event listener will move the task to the correct section
        var taskStatusChangeHandler = (event) =>{
           //get the task item's id
           var taskId = event.target.getAttribute("data-task-id");
           //get currently selected option's value and convert to lowercase
           var statusValue = event.target.value.toLowerCase();
           //find the parent task item element based on the id
           var taskSelected = document.querySelector(".task-item[data-task-id= '" + taskId + "']"); 
           
           //this will change the status of the task to the dropdown value in that task, moving it to another <ul> list
           if(statusValue === "to do"){
                tasksToDoEl.appendChild(taskSelected);
           }
           else if (statusValue === "in progress") {
                tasksInProgressEl.appendChild(taskSelected);
           }
           else if (statusValue === "completed") {
                tasksCompletedEl.appendChild(taskSelected);
           }
           //this for loop will loop through the tasks and change the statusValue based on taskId number
           for (var i=0; i<tasks.length; i++){
               if(tasks[i].id === parseInt(taskId)){
                tasks[i].status = statusValue;
               }
           }

           
        };

//completedEditTask function
    var completedEditTask = (taskName, taskType, taskId) => {
        //find the matching task list item
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        //set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        alert("Task Updated!");

        //loop through tasks array and task object with new content
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === parseInt(taskId)) {
              tasks[i].name = taskName;
              tasks[i].type = taskType;
            }
          };

        //reset the form and "Save Task" button back to "Add Task"
        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
    }

//function 
var createTaskEl = (taskDataObj) => {
   
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
 
    //add "data-task-id" and taskIdCounter as a custom attribute to listItemEl
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //making list item draggable
    listItemEl.setAttribute("draggable", "true");

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    //give it a CSS class name
    taskInfoEl.className = "task-info";


     //add HTML content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
 
     listItemEl.appendChild(taskInfoEl);
    
     //this creates the buttons the correspond to the current task list
     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);
     //add entire list item to list
     tasksToDoEl.appendChild(listItemEl);
    // this will add taskIdCounter as a property to taskDataObj.id
     taskDataObj.id = taskIdCounter;
    //this will push the object to the tasks array
     tasks.push(taskDataObj);

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
    
    //this gives statusSelectEl the CSS class
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

var dragTaskHandler = (event)=>{
    //getting the data task id value  
    //the value is stored in dataTransfer
    var taskId = event.target.getAttribute("data-task-id");
    //this will store the taskId number in dataTransfer
    //2 arguments are passed, the format of the value and taskId number 
    event.dataTransfer.setData("text/plain" , taskId);
    var getId = event.dataTransfer.getData("text/plain");
    //this will log "getId", the id number of the element, and the typeof which is 'string'
    //console.log("getId:" , getId, typeof getId);
}
//this limits the drop zone to only ".task-list" areas
 var dropZoneDragHandler = (event) =>{
     var taskListEl = event.target.closest(".task-list");
        if (taskListEl){
            event.preventDefault();
            //this changes the background color of the dropzone
            taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
        }
 };
//this function will handle the drop location
 var dropTaskHandler = (event) =>{
    //this is retreiving the object id number from dataTransfer using getData
     var id = event.dataTransfer.getData("text/plain");
     //searching for task item with data-task-id of 0
     var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    //this will find the closest element to task-list
     var dropZoneEl = event.target.closest(".task-list");
    //this will get the dropZoneEl id number
     var statusType = dropZoneEl.id;
    //set status of task in dropdown based on drop zone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
        //this will assign a value of 0,1,2 to the task option based on where it is dropped
        if(statusType === "tasks-to-do"){
            statusSelectEl.selectedIndex = 0;
        }
        else if(statusType === "tasks-in-progress"){
            statusSelectEl.selectedIndex = 1;
        }
        else if(statusType ==="tasks-completed"){
            statusSelectEl.selectedIndex = 2;
        }
        //this will append the draggableElement to stay in the new dropZone
        dropZoneEl.appendChild(draggableElement);

    dropZoneEl.removeAttribute("style");

        //loop through tasks array to find and update the updated task's status
        for(var i=0; i<tasks.length; i++){
            if (tasks[i].id === parseInt(id)){
                tasks[i].status = statusSelectEl.value.toLowerCase();
            }
        }
        console.log(tasks);
 };





//this function will remove the hover CSS background color after item is placed in list
 var dragLeaveHandler = (event) => {
     var taskListEl = event.target.closest(".task-list");
     if(taskListEl){
         taskListEl.removeAttribute("style");
     }
     
 }

 var tasks = [];

//this is a function  'submit' is the function
formEl.addEventListener('submit', taskFormHandler);

// for edit and delete buttons taskButtonHandler is the callback function
pageContentEl.addEventListener("click", taskButtonHandler);

//new event listener
pageContentEl.addEventListener("change" , taskStatusChangeHandler);

//dragstart event listener
pageContentEl.addEventListener("dragstart", dragTaskHandler);

//dragover event listener
pageContentEl.addEventListener("dragover", dropZoneDragHandler);

//drop event listener
pageContentEl.addEventListener("drop", dropTaskHandler);

pageContentEl.addEventListener("dragleave", dragLeaveHandler);

//1 click on button
//2 li item will be created 
//3 li item will take on CSS style of task-item
//4 textContent will add taskNameInput (user entered text) 
//5 appendChild will add listItemEl to tasksToDoEl

