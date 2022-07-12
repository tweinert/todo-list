import Project from './Project';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config';

// add new project to storage
function saveProject(project) {
    localStorage.setItem(project.getName(), JSON.stringify(project));
}

// return saved projects as array of objects
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

// delete selected project
function deleteProjectStorage(projectName) {
    localStorage.removeItem(projectName);
}


// save project in firebase storage
async function fbSaveProject(project) {
    try {
        await addDoc(collection(getFirestore(), 'projects'), {
            name: project.getName(),
            tasks: project.getTasks()
        });
    } catch(error) {
        console.error('Error writing new project to Firebase Database', error);
    }
}

// Initialize firebase
const firebaseApp = initializeApp(getFirebaseConfig());

export { saveProject, getSavedProjects, deleteProjectStorage, fbSaveProject }