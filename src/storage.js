import Project from './Project';

// add new project to storage
function saveProject(project) {
    localStorage.setItem(project.getName(), JSON.stringify(project));
}

function getSavedProjects() {
    const projects = [];
    let keys = Object.keys(localStorage)
    let i = keys.length;

    while (i--) {
        let retrievedObject = localStorage.getItem(localStorage.key(i));
        // reconstruct project object using retrievedObject data
        let proj = new Project();
        Object.assign(proj, JSON.parse(retrievedObject));

        // reconstruct task objects within project object
        let taskArray = proj.getTasks();
        proj.reconstructTasks(taskArray);

        projects.push(proj);
    }

    return projects;
}

function deleteProjectStorage(projectName) {
    localStorage.removeItem(projectName);
}

export { saveProject, getSavedProjects, deleteProjectStorage }