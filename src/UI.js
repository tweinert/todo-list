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
        const projectBtn = document.createElement("button");

        projectBtn.classList.add("sidebarBtn");
        projectBtn.setAttribute("id", savedProjects[i].getName());

        projectBtn.textContent = savedProjects[i].getName();

        projectBtn.addEventListener("click", (e) => {
            // TODO set button as active
            // TODO NEEDS TESTING
            displayWebsite(savedProjects[i]);
        });

        sidebarDiv.appendChild(projectBtn);

    }

    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList.add("sidebarBtn");
    newProjectBtn.textContent = "new project +";
    // TODO add event listener for createProject()
    newProjectBtn.addEventListener("click", function() {
        createProject(prompt("Enter project name:"));
    });
    // maybe use an alert for project details?

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

    const priorityLowDiv = displayPriority(0);
    const priorityMedDiv = displayPriority(1);
    const priorityHighDiv = displayPriority(2);

    // get list of tasks in project
    const projectTasks = project.getTasks();

    // for each task in project: check priority
    for (const element of projectTasks) {
        let taskPriority = element.getPriority();
        if (taskPriority == 0) {
            // display low priority tasks
            priorityLowDiv.appendChild(displayTask(element));
        } else if (taskPriority == 1) {
            // display medium priority tasks
            priorityMedDiv.appendChild(displayTask(element));
        } else if (taskPriority == 2) {
            // display high priority tasks
            priorityHighDiv.appendChild(displayTask(element));
        }
    }
    
    projectDiv.appendChild(priorityHighDiv);
    projectDiv.appendChild(priorityMedDiv);
    projectDiv.appendChild(priorityLowDiv);

    return projectDiv;
}

function displayPriority(priority) {
    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("priority");
    priorityDiv.setAttribute("id", priority);

    if (priority == 0) {
        // display low priority
        const priorityHeader = document.createElement("h3");
        priorityHeader.textContent = "Low Priority";
        priorityDiv.appendChild(priorityHeader);
    } else if (priority == 1) {
        // display medium priority
        const priorityHeader = document.createElement("h3");
        priorityHeader.textContent = "Medium Priority";
        priorityDiv.appendChild(priorityHeader);
        
    } else if (priority == 2) {
        // display high priority
        const priorityHeader = document.createElement("h3");
        priorityHeader.textContent = "High Priority";
        priorityDiv.appendChild(priorityHeader);
    }

    return priorityDiv;
}

function displayTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    
    const taskName = document.createElement("h3");
    taskName.textContent = task.getName();

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = task.getDueDate();

    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.getDescription();

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDueDate);
    taskDiv.appendChild(taskDescription);

    return taskDiv;
}

function displayWebsite(project) {
    const content = document.getElementById("content");

    content.appendChild(displaySidebar());
    content.appendChild(displayProject(project));
}

function initializeWebsite() {
    const content = document.getElementById("content");

    const defProj = createDefaultProject();
    content.appendChild(displaySidebar());
    // default project
    content.appendChild(displayProject(defProj));
}

export default initializeWebsite;