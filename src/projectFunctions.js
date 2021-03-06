import Project from "./Project";
import Task from "./Task";
import { saveProject, deleteProjectStorage } from "./storage";

function createProject(name) {
    if (name == null || name == "") {
        alert("Name error");
        return;
    }
    
    const project = new Project(name);

    saveProject(project);

    return project;
}

function createDefaultProject() {
    const defaultProject = new Project("default");

    const defaultTask = new Task("default");
    const defaultTask2 = new Task("default2", "01-01-2023", "no description", 1);
    const defaultTask3 = new Task("default3", "24/06/23", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacinia, magna non accumsan accumsan, nulla dui euismod turpis, vel aliquet justo magna non ipsum. Nulla facilisi. Proin vulputate vel diam sed iaculis.", 2);
    const defaultTask4 = new Task("default4");

    defaultProject.addTask(defaultTask);
    defaultProject.addTask(defaultTask2);
    defaultProject.addTask(defaultTask3);
    defaultProject.addTask(defaultTask4);

    saveProject(defaultProject);

    return defaultProject;
}

function deleteProject(projectName) {
    if (projectName == "default") {
        alert("Cannot delete default project");
        return;
    }
    
    deleteProjectStorage(projectName);
}

export { createProject, deleteProject, createDefaultProject }