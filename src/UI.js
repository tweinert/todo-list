import { createTask, deleteTask, changePriority } from './taskFunctions';
import { createProject, deleteProject, createDefaultProject } from './projectFunctions';
import { getSavedProjects } from './storage';

function displaySidebar() {
    if (document.getElementById("sidebar")) {
        document.getElementById("sidebar").remove();
    }
    
    const sidebarDiv = document.createElement("div");

    sidebarDiv.classList.add("sidebar");
    sidebarDiv.setAttribute("id", "sidebar");

    // display projects
    const savedProjects = getSavedProjects();
    
    for (let i = 0; i < savedProjects.length; i++) {
        // create div for projectBtn and deleteBtn
        const btnDiv = document.createElement("div");

        btnDiv.classList.add("sidebarBtnDiv");

        // create projectBtn
        const projectBtn = document.createElement("button");

        projectBtn.classList.add("sidebarBtn");
        projectBtn.setAttribute("id", savedProjects[i].getName());

        projectBtn.textContent = savedProjects[i].getName();

        projectBtn.addEventListener("click", (e) => {
            displayWebsite(savedProjects[i]);
        });

        //create deleteBtn
        const deleteBtn = document.createElement("button");

        deleteBtn.classList.add("sidebarDeleteBtn");
        deleteBtn.setAttribute("id", savedProjects[i].getName());

        deleteBtn.textContent = "X";

        deleteBtn.addEventListener("click", (e) => {
            deleteProject(savedProjects[i].getName());
            displayWebsite(savedProjects[0]);
        });

        btnDiv.appendChild(projectBtn);
        btnDiv.appendChild(deleteBtn);
        sidebarDiv.appendChild(btnDiv);

    }

    // new project button
    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList.add("sidebarBtn");
    newProjectBtn.textContent = "new project +";

    // event listener to create a new project on click
    newProjectBtn.addEventListener("click", function() {
        createProject(prompt("Enter project name:"));
        // TODO display newly created project
        displayWebsite(savedProjects[0]);
    }); 

    sidebarDiv.appendChild(newProjectBtn);

    return sidebarDiv;
}

function displayProject(project) {
    if (document.getElementById("project")) {
        document.getElementById("project").remove();
    }

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.setAttribute("id", "project");

    const priorityLowDiv = displayPriority(0, project);
    const priorityMedDiv = displayPriority(1, project);
    const priorityHighDiv = displayPriority(2, project);

    // get list of tasks in project
    const projectTasks = project.getTasks();

    // for each task in project: check priority
    for (const element of projectTasks) {
        let taskPriority = element.getPriority();
        if (taskPriority == 0) {
            // display low priority tasks
            priorityLowDiv.appendChild(displayTask(project, element));
        } else if (taskPriority == 1) {
            // display medium priority tasks
            priorityMedDiv.appendChild(displayTask(project, element));
        } else if (taskPriority == 2) {
            // display high priority tasks
            priorityHighDiv.appendChild(displayTask(project, element));
        }
    }
    
    projectDiv.appendChild(priorityHighDiv);
    projectDiv.appendChild(priorityMedDiv);
    projectDiv.appendChild(priorityLowDiv);

    return projectDiv;
}

function displayPriority(priority, project) {
    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("priority");
    priorityDiv.setAttribute("id", priority);

    if (priority == 0) {
        // display low priority
        const priorityHeaderDiv = document.createElement("div");
        priorityHeaderDiv.classList.add("priorityHeaderDiv");

        const priorityHeader = document.createElement("h3");
        priorityHeader.textContent = "Low Priority";

        const createTaskBtn = document.createElement("button");
        createTaskBtn.textContent = "New Task +";

        // new task event listener
        createTaskBtn.addEventListener("click", (e) => {
            createTask(priority, project);
            displayWebsite(project);
        });

        priorityHeaderDiv.appendChild(priorityHeader);
        priorityHeaderDiv.appendChild(createTaskBtn);

        priorityDiv.appendChild(priorityHeaderDiv);
    } else if (priority == 1) {
        // display medium priority
        const priorityHeaderDiv = document.createElement("div");
        priorityHeaderDiv.classList.add("priorityHeaderDiv");

        const priorityHeader = document.createElement("h3");
        priorityHeader.textContent = "Medium Priority";

        const createTaskBtn = document.createElement("button");
        createTaskBtn.textContent = "New Task +";

        // new task event listener
        createTaskBtn.addEventListener("click", (e) => {
            createTask(priority, project);
            displayWebsite(project);
        });

        priorityHeaderDiv.appendChild(priorityHeader);
        priorityHeaderDiv.appendChild(createTaskBtn);

        priorityDiv.appendChild(priorityHeaderDiv);
        
    } else if (priority == 2) {
        // display high priority
        const priorityHeaderDiv = document.createElement("div");
        priorityHeaderDiv.classList.add("priorityHeaderDiv");
        
        const priorityHeader = document.createElement("h3");
        priorityHeader.textContent = "High Priority";

        const createTaskBtn = document.createElement("button");
        createTaskBtn.textContent = "New Task +";

        // new task event listener
        createTaskBtn.addEventListener("click", (e) => {
            createTask(priority, project);
            displayWebsite(project);
        });

        priorityHeaderDiv.appendChild(priorityHeader);
        priorityHeaderDiv.appendChild(createTaskBtn);

        priorityDiv.appendChild(priorityHeaderDiv);
    }

    return priorityDiv;
}

function displayTask(project, task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    
    const taskName = document.createElement("h3");
    taskName.textContent = task.getName();

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = task.getDueDate();

    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.getDescription();

    // drop down to change priority
    const prioritySelect = document.createElement("select");

    const prioritySelectHigh = document.createElement("option");
    prioritySelectHigh.textContent = "High";
    prioritySelectHigh.setAttribute("value", "high");

    const prioritySelectMed = document.createElement("option");
    prioritySelectMed.textContent = "Medium";
    prioritySelectMed.setAttribute("value", "medium");

    const prioritySelectLow = document.createElement("option");
    prioritySelectLow.textContent = "Low";
    prioritySelectLow.setAttribute("value", "low");

    prioritySelect.appendChild(prioritySelectLow);
    prioritySelect.appendChild(prioritySelectMed);
    prioritySelect.appendChild(prioritySelectHigh);

    // set default priority dropdown option to correct priority
    for (let i = 0; i < prioritySelect.length; i++) {
        if (prioritySelect.options[i].index == task.getPriority()) {
            prioritySelect.selectedIndex = i;
        }
    }

    // event onchange to change priority of task
    prioritySelect.addEventListener("change", (e) => {
        changePriority(task, prioritySelect.selectedIndex);
        displayWebsite(project);
    });
    
    // delete task button
    const taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.textContent = "Delete Task";

    // delete task function call
    taskDeleteBtn.addEventListener("click", (e) => {
        deleteTask(project, task);
        displayWebsite(project);
    });

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDueDate);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(prioritySelect);
    taskDiv.appendChild(taskDeleteBtn);

    return taskDiv;
}

function displayWebsite(project) {
    const content = document.getElementById("content");

    content.appendChild(displaySidebar());
    content.appendChild(displayProject(project));
}

function initializeWebsite() {
    const defProj = createDefaultProject();

    displayWebsite(defProj);
}

export default initializeWebsite;