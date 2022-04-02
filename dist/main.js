/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _taskFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskFunctions */ "./src/taskFunctions.js");
/* harmony import */ var _projectFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectFunctions */ "./src/projectFunctions.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");




function displaySidebar() {
    if (document.getElementById("sidebar")) {
        document.getElementById("sidebar").remove();
    }
    
    const sidebarDiv = document.createElement("div");

    sidebarDiv.classList.add("sidebar");
    sidebarDiv.setAttribute("id", "sidebar");

    // display projects
    const savedProjects = (0,_storage__WEBPACK_IMPORTED_MODULE_2__.getSavedProjects)();
    
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
            (0,_projectFunctions__WEBPACK_IMPORTED_MODULE_1__.deleteProject)(savedProjects[i].getName());
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
        (0,_projectFunctions__WEBPACK_IMPORTED_MODULE_1__.createProject)(prompt("Enter project name:"));
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
            (0,_taskFunctions__WEBPACK_IMPORTED_MODULE_0__.createTask)(priority, project);
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

        priorityHeaderDiv.appendChild(priorityHeader);
        priorityHeaderDiv.appendChild(createTaskBtn);

        priorityDiv.appendChild(priorityHeaderDiv);
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
    const defProj = (0,_projectFunctions__WEBPACK_IMPORTED_MODULE_1__.createDefaultProject)();

    displayWebsite(defProj);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initializeWebsite);

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");


class Project {
    constructor(name = "") {
        this.name = name;
        this.tasks = [];
    }

    getName() {
        return this.name;
    }

    getTasks() {
        return this.tasks;
    }

    setName(name) {
        this.name = name;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(taskName) {
        let index = this.tasks.map(function(e) { return e.getName(); }).indexOf(taskName);
        this.tasks.splice(index, 1);
    }

    reconstructTasks(tasks) {
        let newTasks = [];
        
        for (let i = 0; i < tasks.length; i++) {
            // change task into task object
            let taskObj = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]();
            Object.assign(taskObj, tasks[i]);
            newTasks[i] = taskObj;
        }

        // delete all current tasks
        tasks.splice(0, tasks.length);

        // add all newTasks to this.tasks
        for (const element of newTasks) {
            tasks.push(element);
        }
    }
}

/***/ }),

/***/ "./src/projectFunctions.js":
/*!*********************************!*\
  !*** ./src/projectFunctions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDefaultProject": () => (/* binding */ createDefaultProject),
/* harmony export */   "createProject": () => (/* binding */ createProject),
/* harmony export */   "deleteProject": () => (/* binding */ deleteProject)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");




function createProject(name) {
    if (name == null || name == "") {
        alert("Name error");
        return;
    }
    
    const project = new _project__WEBPACK_IMPORTED_MODULE_0__["default"](name);

    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveProject)(project);

    return project;
}

function createDefaultProject() {
    const defaultProject = new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("default");

    const defaultTask = new _task__WEBPACK_IMPORTED_MODULE_1__["default"]("default");
    const defaultTask2 = new _task__WEBPACK_IMPORTED_MODULE_1__["default"]("default2", "01-01-2023", "no description", 1);
    const defaultTask3 = new _task__WEBPACK_IMPORTED_MODULE_1__["default"]("default3", "24/06/23", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacinia, magna non accumsan accumsan, nulla dui euismod turpis, vel aliquet justo magna non ipsum. Nulla facilisi. Proin vulputate vel diam sed iaculis.", 2);
    const defaultTask4 = new _task__WEBPACK_IMPORTED_MODULE_1__["default"]("default4");

    defaultProject.addTask(defaultTask);
    defaultProject.addTask(defaultTask2);
    defaultProject.addTask(defaultTask3);
    defaultProject.addTask(defaultTask4);

    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveProject)(defaultProject);

    return defaultProject;
}

function deleteProject(projectName) {
    if (projectName == "default") {
        alert("Cannot delete default project");
        return;
    }
    
    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.deleteProjectStorage)(projectName);
}



/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteProjectStorage": () => (/* binding */ deleteProjectStorage),
/* harmony export */   "getSavedProjects": () => (/* binding */ getSavedProjects),
/* harmony export */   "saveProject": () => (/* binding */ saveProject)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");



// check if storage is available
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

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
        let proj = new _project__WEBPACK_IMPORTED_MODULE_0__["default"]();
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



/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
    constructor(name, dueDate = 'No date', description = '', priority = 0) {
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
    }

    getName() {
        return this.name;
    }

    getDueDate() {
        return this.dueDate;
    }

    getDescription() {
        return this.description;
    }

    getPriority() {
        return this.priority;
    }

    setName(name) {
        this.name = name;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setDescription(description) {
        this.description = description;
    }

    // 0 = low, 1 = medium, 2 = high
    setPriority(priority) {
        this.priority = priority;
    }
}

/***/ }),

/***/ "./src/taskFunctions.js":
/*!******************************!*\
  !*** ./src/taskFunctions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTask": () => (/* binding */ createTask)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");



function createTask(priority, project) {
    let name = prompt("Enter task name");
    let dueDate = prompt("Enter due date");
    let description = prompt("Enter description");

    const newTask = new _task__WEBPACK_IMPORTED_MODULE_0__["default"](name, dueDate, description, priority);

    project.addTask(newTask);
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


(0,_UI__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdEQUFPO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekRlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEMwQjtBQUNNOztBQUVoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsNkNBQUk7O0FBRTVCO0FBQ0E7Ozs7Ozs7O1VDWEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQzs7QUFFckMsK0NBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVRhc2sgfSBmcm9tICcuL3Rhc2tGdW5jdGlvbnMnO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgZGVsZXRlUHJvamVjdCwgY3JlYXRlRGVmYXVsdFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RGdW5jdGlvbnMnO1xuaW1wb3J0IHsgZ2V0U2F2ZWRQcm9qZWN0cyB9IGZyb20gJy4vc3RvcmFnZSc7XG5cbmZ1bmN0aW9uIGRpc3BsYXlTaWRlYmFyKCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGViYXJcIikpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlYmFyXCIpLnJlbW92ZSgpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBzaWRlYmFyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHNpZGViYXJEaXYuY2xhc3NMaXN0LmFkZChcInNpZGViYXJcIik7XG4gICAgc2lkZWJhckRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNpZGViYXJcIik7XG5cbiAgICAvLyBkaXNwbGF5IHByb2plY3RzXG4gICAgY29uc3Qgc2F2ZWRQcm9qZWN0cyA9IGdldFNhdmVkUHJvamVjdHMoKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNhdmVkUHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gY3JlYXRlIGRpdiBmb3IgcHJvamVjdEJ0biBhbmQgZGVsZXRlQnRuXG4gICAgICAgIGNvbnN0IGJ0bkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgYnRuRGl2LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyQnRuRGl2XCIpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBwcm9qZWN0QnRuXG4gICAgICAgIGNvbnN0IHByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgICAgIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5cIik7XG4gICAgICAgIHByb2plY3RCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCkpO1xuXG4gICAgICAgIHByb2plY3RCdG4udGV4dENvbnRlbnQgPSBzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKTtcblxuICAgICAgICBwcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZGlzcGxheVdlYnNpdGUoc2F2ZWRQcm9qZWN0c1tpXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY3JlYXRlIGRlbGV0ZUJ0blxuICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckRlbGV0ZUJ0blwiKTtcbiAgICAgICAgZGVsZXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNhdmVkUHJvamVjdHNbaV0uZ2V0TmFtZSgpKTtcblxuICAgICAgICBkZWxldGVCdG4udGV4dENvbnRlbnQgPSBcIlhcIjtcblxuICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBkZWxldGVQcm9qZWN0KHNhdmVkUHJvamVjdHNbaV0uZ2V0TmFtZSgpKTtcbiAgICAgICAgICAgIGRpc3BsYXlXZWJzaXRlKHNhdmVkUHJvamVjdHNbMF0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBidG5EaXYuYXBwZW5kQ2hpbGQocHJvamVjdEJ0bik7XG4gICAgICAgIGJ0bkRpdi5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuICAgICAgICBzaWRlYmFyRGl2LmFwcGVuZENoaWxkKGJ0bkRpdik7XG5cbiAgICB9XG5cbiAgICAvLyBuZXcgcHJvamVjdCBidXR0b25cbiAgICBjb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyQnRuXCIpO1xuICAgIG5ld1Byb2plY3RCdG4udGV4dENvbnRlbnQgPSBcIm5ldyBwcm9qZWN0ICtcIjtcblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGNyZWF0ZSBhIG5ldyBwcm9qZWN0IG9uIGNsaWNrXG4gICAgbmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNyZWF0ZVByb2plY3QocHJvbXB0KFwiRW50ZXIgcHJvamVjdCBuYW1lOlwiKSk7XG4gICAgICAgIC8vIFRPRE8gZGlzcGxheSBuZXdseSBjcmVhdGVkIHByb2plY3RcbiAgICAgICAgZGlzcGxheVdlYnNpdGUoc2F2ZWRQcm9qZWN0c1swXSk7XG4gICAgfSk7IFxuXG4gICAgc2lkZWJhckRpdi5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnRuKTtcblxuICAgIHJldHVybiBzaWRlYmFyRGl2O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdChwcm9qZWN0KSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcbiAgICBwcm9qZWN0RGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJvamVjdFwiKTtcblxuICAgIGNvbnN0IHByaW9yaXR5TG93RGl2ID0gZGlzcGxheVByaW9yaXR5KDAsIHByb2plY3QpO1xuICAgIGNvbnN0IHByaW9yaXR5TWVkRGl2ID0gZGlzcGxheVByaW9yaXR5KDEsIHByb2plY3QpO1xuICAgIGNvbnN0IHByaW9yaXR5SGlnaERpdiA9IGRpc3BsYXlQcmlvcml0eSgyLCBwcm9qZWN0KTtcblxuICAgIC8vIGdldCBsaXN0IG9mIHRhc2tzIGluIHByb2plY3RcbiAgICBjb25zdCBwcm9qZWN0VGFza3MgPSBwcm9qZWN0LmdldFRhc2tzKCk7XG5cbiAgICAvLyBmb3IgZWFjaCB0YXNrIGluIHByb2plY3Q6IGNoZWNrIHByaW9yaXR5XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHByb2plY3RUYXNrcykge1xuICAgICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZWxlbWVudC5nZXRQcmlvcml0eSgpO1xuICAgICAgICBpZiAodGFza1ByaW9yaXR5ID09IDApIHtcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgbG93IHByaW9yaXR5IHRhc2tzXG4gICAgICAgICAgICBwcmlvcml0eUxvd0Rpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGFzayhlbGVtZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5ID09IDEpIHtcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgbWVkaXVtIHByaW9yaXR5IHRhc2tzXG4gICAgICAgICAgICBwcmlvcml0eU1lZERpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGFzayhlbGVtZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5ID09IDIpIHtcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgaGlnaCBwcmlvcml0eSB0YXNrc1xuICAgICAgICAgICAgcHJpb3JpdHlIaWdoRGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUYXNrKGVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGlnaERpdik7XG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcmlvcml0eU1lZERpdik7XG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcmlvcml0eUxvd0Rpdik7XG5cbiAgICByZXR1cm4gcHJvamVjdERpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByaW9yaXR5KHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgY29uc3QgcHJpb3JpdHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5RGl2LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICBwcmlvcml0eURpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwcmlvcml0eSk7XG5cbiAgICBpZiAocHJpb3JpdHkgPT0gMCkge1xuICAgICAgICAvLyBkaXNwbGF5IGxvdyBwcmlvcml0eVxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eUhlYWRlckRpdlwiKTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIkxvdyBQcmlvcml0eVwiO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjcmVhdGVUYXNrQnRuLnRleHRDb250ZW50ID0gXCJOZXcgVGFzayArXCI7XG5cbiAgICAgICAgLy8gbmV3IHRhc2sgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgY3JlYXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZVRhc2socHJpb3JpdHksIHByb2plY3QpO1xuICAgICAgICAgICAgZGlzcGxheVdlYnNpdGUocHJvamVjdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQoY3JlYXRlVGFza0J0bik7XG5cbiAgICAgICAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXJEaXYpO1xuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT0gMSkge1xuICAgICAgICAvLyBkaXNwbGF5IG1lZGl1bSBwcmlvcml0eVxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eUhlYWRlckRpdlwiKTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIk1lZGl1bSBQcmlvcml0eVwiO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjcmVhdGVUYXNrQnRuLnRleHRDb250ZW50ID0gXCJOZXcgVGFzayArXCI7XG5cbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnRuKTtcblxuICAgICAgICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlckRpdik7XG4gICAgICAgIFxuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT0gMikge1xuICAgICAgICAvLyBkaXNwbGF5IGhpZ2ggcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlIZWFkZXJEaXZcIik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIkhpZ2ggUHJpb3JpdHlcIjtcblxuICAgICAgICBjb25zdCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY3JlYXRlVGFza0J0bi50ZXh0Q29udGVudCA9IFwiTmV3IFRhc2sgK1wiO1xuXG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQoY3JlYXRlVGFza0J0bik7XG5cbiAgICAgICAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXJEaXYpO1xuICAgIH1cblxuICAgIHJldHVybiBwcmlvcml0eURpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2sodGFzaykge1xuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gICAgXG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrLmdldE5hbWUoKTtcblxuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcblxuICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZ2V0RGVzY3JpcHRpb24oKTtcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcblxuICAgIHJldHVybiB0YXNrRGl2O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5V2Vic2l0ZShwcm9qZWN0KSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVNpZGViYXIoKSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChkaXNwbGF5UHJvamVjdChwcm9qZWN0KSk7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVXZWJzaXRlKCkge1xuICAgIGNvbnN0IGRlZlByb2ogPSBjcmVhdGVEZWZhdWx0UHJvamVjdCgpO1xuXG4gICAgZGlzcGxheVdlYnNpdGUoZGVmUHJvaik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVXZWJzaXRlOyIsImltcG9ydCBUYXNrIGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSBcIlwiKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGdldFRhc2tzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIGRlbGV0ZVRhc2sodGFza05hbWUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy50YXNrcy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5nZXROYW1lKCk7IH0pLmluZGV4T2YodGFza05hbWUpO1xuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgcmVjb25zdHJ1Y3RUYXNrcyh0YXNrcykge1xuICAgICAgICBsZXQgbmV3VGFza3MgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIGNoYW5nZSB0YXNrIGludG8gdGFzayBvYmplY3RcbiAgICAgICAgICAgIGxldCB0YXNrT2JqID0gbmV3IFRhc2soKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGFza09iaiwgdGFza3NbaV0pO1xuICAgICAgICAgICAgbmV3VGFza3NbaV0gPSB0YXNrT2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVsZXRlIGFsbCBjdXJyZW50IHRhc2tzXG4gICAgICAgIHRhc2tzLnNwbGljZSgwLCB0YXNrcy5sZW5ndGgpO1xuXG4gICAgICAgIC8vIGFkZCBhbGwgbmV3VGFza3MgdG8gdGhpcy50YXNrc1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgbmV3VGFza3MpIHtcbiAgICAgICAgICAgIHRhc2tzLnB1c2goZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IHsgc2F2ZVByb2plY3QsIGRlbGV0ZVByb2plY3RTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PSBudWxsIHx8IG5hbWUgPT0gXCJcIikge1xuICAgICAgICBhbGVydChcIk5hbWUgZXJyb3JcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuXG4gICAgc2F2ZVByb2plY3QocHJvamVjdCk7XG5cbiAgICByZXR1cm4gcHJvamVjdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdFByb2plY3QoKSB7XG4gICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdChcImRlZmF1bHRcIik7XG5cbiAgICBjb25zdCBkZWZhdWx0VGFzayA9IG5ldyBUYXNrKFwiZGVmYXVsdFwiKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazIgPSBuZXcgVGFzayhcImRlZmF1bHQyXCIsIFwiMDEtMDEtMjAyM1wiLCBcIm5vIGRlc2NyaXB0aW9uXCIsIDEpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrMyA9IG5ldyBUYXNrKFwiZGVmYXVsdDNcIiwgXCIyNC8wNi8yM1wiLCBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIEV0aWFtIGxhY2luaWEsIG1hZ25hIG5vbiBhY2N1bXNhbiBhY2N1bXNhbiwgbnVsbGEgZHVpIGV1aXNtb2QgdHVycGlzLCB2ZWwgYWxpcXVldCBqdXN0byBtYWduYSBub24gaXBzdW0uIE51bGxhIGZhY2lsaXNpLiBQcm9pbiB2dWxwdXRhdGUgdmVsIGRpYW0gc2VkIGlhY3VsaXMuXCIsIDIpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrNCA9IG5ldyBUYXNrKFwiZGVmYXVsdDRcIik7XG5cbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrMik7XG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzazMpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2s0KTtcblxuICAgIHNhdmVQcm9qZWN0KGRlZmF1bHRQcm9qZWN0KTtcblxuICAgIHJldHVybiBkZWZhdWx0UHJvamVjdDtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGlmIChwcm9qZWN0TmFtZSA9PSBcImRlZmF1bHRcIikge1xuICAgICAgICBhbGVydChcIkNhbm5vdCBkZWxldGUgZGVmYXVsdCBwcm9qZWN0XCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZVByb2plY3RTdG9yYWdlKHByb2plY3ROYW1lKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdCwgZGVsZXRlUHJvamVjdCwgY3JlYXRlRGVmYXVsdFByb2plY3QgfSIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vcHJvamVjdCc7XG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuXG4vLyBjaGVjayBpZiBzdG9yYWdlIGlzIGF2YWlsYWJsZVxuZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG4gICAgdmFyIHN0b3JhZ2U7XG4gICAgdHJ5IHtcbiAgICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgICAgdmFyIHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgICAgIChzdG9yYWdlICYmIHN0b3JhZ2UubGVuZ3RoICE9PSAwKTtcbiAgICB9XG59XG5cbi8vIGFkZCBuZXcgcHJvamVjdCB0byBzdG9yYWdlXG5mdW5jdGlvbiBzYXZlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHJvamVjdC5nZXROYW1lKCksIEpTT04uc3RyaW5naWZ5KHByb2plY3QpKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2F2ZWRQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKVxuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGxldCByZXRyaWV2ZWRPYmplY3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKTtcbiAgICAgICAgLy8gcmVjb25zdHJ1Y3QgcHJvamVjdCBvYmplY3QgdXNpbmcgcmV0cmlldmVkT2JqZWN0IGRhdGFcbiAgICAgICAgbGV0IHByb2ogPSBuZXcgUHJvamVjdCgpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHByb2osIEpTT04ucGFyc2UocmV0cmlldmVkT2JqZWN0KSk7XG5cbiAgICAgICAgLy8gcmVjb25zdHJ1Y3QgdGFzayBvYmplY3RzIHdpdGhpbiBwcm9qZWN0IG9iamVjdFxuICAgICAgICBsZXQgdGFza0FycmF5ID0gcHJvai5nZXRUYXNrcygpO1xuICAgICAgICBwcm9qLnJlY29uc3RydWN0VGFza3ModGFza0FycmF5KTtcblxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2opO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9qZWN0cztcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdFN0b3JhZ2UocHJvamVjdE5hbWUpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShwcm9qZWN0TmFtZSk7XG59XG5cbmV4cG9ydCB7IHNhdmVQcm9qZWN0LCBnZXRTYXZlZFByb2plY3RzLCBkZWxldGVQcm9qZWN0U3RvcmFnZSB9IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgZHVlRGF0ZSA9ICdObyBkYXRlJywgZGVzY3JpcHRpb24gPSAnJywgcHJpb3JpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIH1cblxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0RHVlRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaW9yaXR5O1xuICAgIH1cblxuICAgIHNldE5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHNldER1ZURhdGUoZHVlRGF0ZSkge1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIH1cblxuICAgIHNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICAvLyAwID0gbG93LCAxID0gbWVkaXVtLCAyID0gaGlnaFxuICAgIHNldFByaW9yaXR5KHByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG59IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuXG5mdW5jdGlvbiBjcmVhdGVUYXNrKHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgbGV0IG5hbWUgPSBwcm9tcHQoXCJFbnRlciB0YXNrIG5hbWVcIik7XG4gICAgbGV0IGR1ZURhdGUgPSBwcm9tcHQoXCJFbnRlciBkdWUgZGF0ZVwiKTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBwcm9tcHQoXCJFbnRlciBkZXNjcmlwdGlvblwiKTtcblxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhuYW1lLCBkdWVEYXRlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHkpO1xuXG4gICAgcHJvamVjdC5hZGRUYXNrKG5ld1Rhc2spO1xufVxuXG5leHBvcnQgeyBjcmVhdGVUYXNrIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0aWFsaXplV2Vic2l0ZSBmcm9tICcuL1VJJztcblxuaW5pdGlhbGl6ZVdlYnNpdGUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=