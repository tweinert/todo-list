import Task from "./task";
import Project from "./project";
import { saveProject, deleteProjectStorage } from "./storage";

function createTask(priority, project) {
    let name = prompt("Enter task name");
    let dueDate = prompt("Enter due date");
    let description = prompt("Enter description");

    const newTask = new Task(name, dueDate, description, priority);

    project.addTask(newTask);

    saveProject(project);
}

function deleteTask(project, task) {
    project.deleteTask(task);

    saveProject(project);
}

function changePriority(task, priority) {
    task.setPriority(priority);
}

export { createTask, deleteTask, changePriority }