import Task from "./task";
import Project from "./project";

function createTask(priority, project) {
    let name = prompt("Enter task name");
    let dueDate = prompt("Enter due date");
    let description = prompt("Enter description");

    const newTask = new Task(name, dueDate, description, priority);

    project.addTask(newTask);
}

export { createTask }