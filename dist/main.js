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

        // new task event listener
        createTaskBtn.addEventListener("click", (e) => {
            (0,_taskFunctions__WEBPACK_IMPORTED_MODULE_0__.createTask)(priority, project);
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
            (0,_taskFunctions__WEBPACK_IMPORTED_MODULE_0__.createTask)(priority, project);
            displayWebsite(project);
        });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0RBQU87QUFDOUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QzBCO0FBQ007O0FBRWhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3Qiw2Q0FBSTs7QUFFNUI7QUFDQTs7Ozs7Ozs7VUNYQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnFDOztBQUVyQywrQ0FBaUIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdEZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza0Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlVGFzayB9IGZyb20gJy4vdGFza0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBkZWxldGVQcm9qZWN0LCBjcmVhdGVEZWZhdWx0UHJvamVjdCB9IGZyb20gJy4vcHJvamVjdEZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBnZXRTYXZlZFByb2plY3RzIH0gZnJvbSAnLi9zdG9yYWdlJztcblxuZnVuY3Rpb24gZGlzcGxheVNpZGViYXIoKSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lkZWJhclwiKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGViYXJcIikucmVtb3ZlKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHNpZGViYXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgc2lkZWJhckRpdi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhclwiKTtcbiAgICBzaWRlYmFyRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2lkZWJhclwiKTtcblxuICAgIC8vIGRpc3BsYXkgcHJvamVjdHNcbiAgICBjb25zdCBzYXZlZFByb2plY3RzID0gZ2V0U2F2ZWRQcm9qZWN0cygpO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2F2ZWRQcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBjcmVhdGUgZGl2IGZvciBwcm9qZWN0QnRuIGFuZCBkZWxldGVCdG5cbiAgICAgICAgY29uc3QgYnRuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBidG5EaXYuY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5EaXZcIik7XG5cbiAgICAgICAgLy8gY3JlYXRlIHByb2plY3RCdG5cbiAgICAgICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICAgICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckJ0blwiKTtcbiAgICAgICAgcHJvamVjdEJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKSk7XG5cbiAgICAgICAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHNhdmVkUHJvamVjdHNbaV0uZ2V0TmFtZSgpO1xuXG4gICAgICAgIHByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShzYXZlZFByb2plY3RzW2ldKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jcmVhdGUgZGVsZXRlQnRuXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyRGVsZXRlQnRuXCIpO1xuICAgICAgICBkZWxldGVCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCkpO1xuXG4gICAgICAgIGRlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiWFwiO1xuXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3Qoc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCkpO1xuICAgICAgICAgICAgZGlzcGxheVdlYnNpdGUoc2F2ZWRQcm9qZWN0c1swXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJ0bkRpdi5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gICAgICAgIHNpZGViYXJEaXYuYXBwZW5kQ2hpbGQoYnRuRGl2KTtcblxuICAgIH1cblxuICAgIC8vIG5ldyBwcm9qZWN0IGJ1dHRvblxuICAgIGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5cIik7XG4gICAgbmV3UHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IFwibmV3IHByb2plY3QgK1wiO1xuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgdG8gY3JlYXRlIGEgbmV3IHByb2plY3Qgb24gY2xpY2tcbiAgICBuZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdChwcm9tcHQoXCJFbnRlciBwcm9qZWN0IG5hbWU6XCIpKTtcbiAgICAgICAgLy8gVE9ETyBkaXNwbGF5IG5ld2x5IGNyZWF0ZWQgcHJvamVjdFxuICAgICAgICBkaXNwbGF5V2Vic2l0ZShzYXZlZFByb2plY3RzWzBdKTtcbiAgICB9KTsgXG5cbiAgICBzaWRlYmFyRGl2LmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdG4pO1xuXG4gICAgcmV0dXJuIHNpZGViYXJEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHByb2plY3QpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgIHByb2plY3REaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0XCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHlMb3dEaXYgPSBkaXNwbGF5UHJpb3JpdHkoMCwgcHJvamVjdCk7XG4gICAgY29uc3QgcHJpb3JpdHlNZWREaXYgPSBkaXNwbGF5UHJpb3JpdHkoMSwgcHJvamVjdCk7XG4gICAgY29uc3QgcHJpb3JpdHlIaWdoRGl2ID0gZGlzcGxheVByaW9yaXR5KDIsIHByb2plY3QpO1xuXG4gICAgLy8gZ2V0IGxpc3Qgb2YgdGFza3MgaW4gcHJvamVjdFxuICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKTtcblxuICAgIC8vIGZvciBlYWNoIHRhc2sgaW4gcHJvamVjdDogY2hlY2sgcHJpb3JpdHlcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcHJvamVjdFRhc2tzKSB7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBlbGVtZW50LmdldFByaW9yaXR5KCk7XG4gICAgICAgIGlmICh0YXNrUHJpb3JpdHkgPT0gMCkge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBsb3cgcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5TG93RGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUYXNrKGVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT0gMSkge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBtZWRpdW0gcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5TWVkRGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUYXNrKGVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT0gMikge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBoaWdoIHByaW9yaXR5IHRhc2tzXG4gICAgICAgICAgICBwcmlvcml0eUhpZ2hEaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2soZWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIaWdoRGl2KTtcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5TWVkRGl2KTtcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5TG93RGl2KTtcblxuICAgIHJldHVybiBwcm9qZWN0RGl2O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UHJpb3JpdHkocHJpb3JpdHksIHByb2plY3QpIHtcbiAgICBjb25zdCBwcmlvcml0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgIHByaW9yaXR5RGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIHByaW9yaXR5KTtcblxuICAgIGlmIChwcmlvcml0eSA9PSAwKSB7XG4gICAgICAgIC8vIGRpc3BsYXkgbG93IHByaW9yaXR5XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5SGVhZGVyRGl2XCIpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlci50ZXh0Q29udGVudCA9IFwiTG93IFByaW9yaXR5XCI7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNyZWF0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrICtcIjtcblxuICAgICAgICAvLyBuZXcgdGFzayBldmVudCBsaXN0ZW5lclxuICAgICAgICBjcmVhdGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlVGFzayhwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShwcm9qZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnRuKTtcblxuICAgICAgICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlckRpdik7XG4gICAgfSBlbHNlIGlmIChwcmlvcml0eSA9PSAxKSB7XG4gICAgICAgIC8vIGRpc3BsYXkgbWVkaXVtIHByaW9yaXR5XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5SGVhZGVyRGl2XCIpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlci50ZXh0Q29udGVudCA9IFwiTWVkaXVtIFByaW9yaXR5XCI7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNyZWF0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrICtcIjtcblxuICAgICAgICAvLyBuZXcgdGFzayBldmVudCBsaXN0ZW5lclxuICAgICAgICBjcmVhdGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlVGFzayhwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShwcm9qZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnRuKTtcblxuICAgICAgICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlckRpdik7XG4gICAgICAgIFxuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT0gMikge1xuICAgICAgICAvLyBkaXNwbGF5IGhpZ2ggcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlIZWFkZXJEaXZcIik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIkhpZ2ggUHJpb3JpdHlcIjtcblxuICAgICAgICBjb25zdCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY3JlYXRlVGFza0J0bi50ZXh0Q29udGVudCA9IFwiTmV3IFRhc2sgK1wiO1xuXG4gICAgICAgIC8vIG5ldyB0YXNrIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVUYXNrKHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgICAgIGRpc3BsYXlXZWJzaXRlKHByb2plY3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tCdG4pO1xuXG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyRGl2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJpb3JpdHlEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5nZXROYW1lKCk7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XG5cbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmdldERlc2NyaXB0aW9uKCk7XG5cbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGFza0Rpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVdlYnNpdGUocHJvamVjdCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG5cbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGRpc3BsYXlTaWRlYmFyKCkpO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVByb2plY3QocHJvamVjdCkpO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplV2Vic2l0ZSgpIHtcbiAgICBjb25zdCBkZWZQcm9qID0gY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcblxuICAgIGRpc3BsYXlXZWJzaXRlKGRlZlByb2opO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJpbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCJcIikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBnZXRUYXNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3M7XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICBkZWxldGVUYXNrKHRhc2tOYW1lKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMudGFza3MubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuZ2V0TmFtZSgpOyB9KS5pbmRleE9mKHRhc2tOYW1lKTtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJlY29uc3RydWN0VGFza3ModGFza3MpIHtcbiAgICAgICAgbGV0IG5ld1Rhc2tzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBjaGFuZ2UgdGFzayBpbnRvIHRhc2sgb2JqZWN0XG4gICAgICAgICAgICBsZXQgdGFza09iaiA9IG5ldyBUYXNrKCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRhc2tPYmosIHRhc2tzW2ldKTtcbiAgICAgICAgICAgIG5ld1Rhc2tzW2ldID0gdGFza09iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlbGV0ZSBhbGwgY3VycmVudCB0YXNrc1xuICAgICAgICB0YXNrcy5zcGxpY2UoMCwgdGFza3MubGVuZ3RoKTtcblxuICAgICAgICAvLyBhZGQgYWxsIG5ld1Rhc2tzIHRvIHRoaXMudGFza3NcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIG5ld1Rhc2tzKSB7XG4gICAgICAgICAgICB0YXNrcy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IHNhdmVQcm9qZWN0LCBkZWxldGVQcm9qZWN0U3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gICAgaWYgKG5hbWUgPT0gbnVsbCB8fCBuYW1lID09IFwiXCIpIHtcbiAgICAgICAgYWxlcnQoXCJOYW1lIGVycm9yXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcblxuICAgIHNhdmVQcm9qZWN0KHByb2plY3QpO1xuXG4gICAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRQcm9qZWN0KCkge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoXCJkZWZhdWx0XCIpO1xuXG4gICAgY29uc3QgZGVmYXVsdFRhc2sgPSBuZXcgVGFzayhcImRlZmF1bHRcIik7XG4gICAgY29uc3QgZGVmYXVsdFRhc2syID0gbmV3IFRhc2soXCJkZWZhdWx0MlwiLCBcIjAxLTAxLTIwMjNcIiwgXCJubyBkZXNjcmlwdGlvblwiLCAxKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazMgPSBuZXcgVGFzayhcImRlZmF1bHQzXCIsIFwiMjQvMDYvMjNcIiwgXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBFdGlhbSBsYWNpbmlhLCBtYWduYSBub24gYWNjdW1zYW4gYWNjdW1zYW4sIG51bGxhIGR1aSBldWlzbW9kIHR1cnBpcywgdmVsIGFsaXF1ZXQganVzdG8gbWFnbmEgbm9uIGlwc3VtLiBOdWxsYSBmYWNpbGlzaS4gUHJvaW4gdnVscHV0YXRlIHZlbCBkaWFtIHNlZCBpYWN1bGlzLlwiLCAyKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazQgPSBuZXcgVGFzayhcImRlZmF1bHQ0XCIpO1xuXG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzayk7XG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzazIpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2szKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrNCk7XG5cbiAgICBzYXZlUHJvamVjdChkZWZhdWx0UHJvamVjdCk7XG5cbiAgICByZXR1cm4gZGVmYXVsdFByb2plY3Q7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBpZiAocHJvamVjdE5hbWUgPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgYWxlcnQoXCJDYW5ub3QgZGVsZXRlIGRlZmF1bHQgcHJvamVjdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGVQcm9qZWN0U3RvcmFnZShwcm9qZWN0TmFtZSk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH0iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcblxuLy8gY2hlY2sgaWYgc3RvcmFnZSBpcyBhdmFpbGFibGVcbmZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICAgIHZhciBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgIHZhciB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxufVxuXG4vLyBhZGQgbmV3IHByb2plY3QgdG8gc3RvcmFnZVxuZnVuY3Rpb24gc2F2ZVByb2plY3QocHJvamVjdCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByb2plY3QuZ2V0TmFtZSgpLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0KSk7XG59XG5cbmZ1bmN0aW9uIGdldFNhdmVkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBsZXQgcmV0cmlldmVkT2JqZWN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgICAgIC8vIHJlY29uc3RydWN0IHByb2plY3Qgb2JqZWN0IHVzaW5nIHJldHJpZXZlZE9iamVjdCBkYXRhXG4gICAgICAgIGxldCBwcm9qID0gbmV3IFByb2plY3QoKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9qLCBKU09OLnBhcnNlKHJldHJpZXZlZE9iamVjdCkpO1xuXG4gICAgICAgIC8vIHJlY29uc3RydWN0IHRhc2sgb2JqZWN0cyB3aXRoaW4gcHJvamVjdCBvYmplY3RcbiAgICAgICAgbGV0IHRhc2tBcnJheSA9IHByb2ouZ2V0VGFza3MoKTtcbiAgICAgICAgcHJvai5yZWNvbnN0cnVjdFRhc2tzKHRhc2tBcnJheSk7XG5cbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvamVjdHM7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RTdG9yYWdlKHByb2plY3ROYW1lKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ocHJvamVjdE5hbWUpO1xufVxuXG5leHBvcnQgeyBzYXZlUHJvamVjdCwgZ2V0U2F2ZWRQcm9qZWN0cywgZGVsZXRlUHJvamVjdFN0b3JhZ2UgfSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUgPSAnTm8gZGF0ZScsIGRlc2NyaXB0aW9uID0gJycsIHByaW9yaXR5ID0gMCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGdldER1ZURhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldFByaW9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXREdWVEYXRlKGR1ZURhdGUpIHtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgLy8gMCA9IGxvdywgMSA9IG1lZGl1bSwgMiA9IGhpZ2hcbiAgICBzZXRQcmlvcml0eShwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxufSIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcblxuZnVuY3Rpb24gY3JlYXRlVGFzayhwcmlvcml0eSwgcHJvamVjdCkge1xuICAgIGxldCBuYW1lID0gcHJvbXB0KFwiRW50ZXIgdGFzayBuYW1lXCIpO1xuICAgIGxldCBkdWVEYXRlID0gcHJvbXB0KFwiRW50ZXIgZHVlIGRhdGVcIik7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gcHJvbXB0KFwiRW50ZXIgZGVzY3JpcHRpb25cIik7XG5cbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5KTtcblxuICAgIHByb2plY3QuYWRkVGFzayhuZXdUYXNrKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlVGFzayB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdGlhbGl6ZVdlYnNpdGUgZnJvbSAnLi9VSSc7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9