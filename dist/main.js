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
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task */ "./src/task.js");





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
        console.log(prioritySelect.options[i].index);
        if (prioritySelect.options[i].index == task.getPriority()) {
            prioritySelect.selectedIndex = i;
        }
    }
    
    // delete task button
    const taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.textContent = "Delete Task";

    // delete task function call
    taskDeleteBtn.addEventListener("click", (e) => {
        (0,_taskFunctions__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(project, task);
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
/* harmony export */   "createTask": () => (/* binding */ createTask),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");




function createTask(priority, project) {
    let name = prompt("Enter task name");
    let dueDate = prompt("Enter due date");
    let description = prompt("Enter description");

    const newTask = new _task__WEBPACK_IMPORTED_MODULE_0__["default"](name, dueDate, description, priority);

    project.addTask(newTask);

    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveProject)(project);
}

function deleteTask(project, task) {
    project.deleteTask(task);

    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveProject)(project);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQzs7QUFFckMsK0NBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVRhc2ssIGRlbGV0ZVRhc2sgfSBmcm9tICcuL3Rhc2tGdW5jdGlvbnMnO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgZGVsZXRlUHJvamVjdCwgY3JlYXRlRGVmYXVsdFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RGdW5jdGlvbnMnO1xuaW1wb3J0IHsgZ2V0U2F2ZWRQcm9qZWN0cyB9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuXG5mdW5jdGlvbiBkaXNwbGF5U2lkZWJhcigpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlYmFyXCIpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lkZWJhclwiKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2lkZWJhckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBzaWRlYmFyRGl2LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyXCIpO1xuICAgIHNpZGViYXJEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzaWRlYmFyXCIpO1xuXG4gICAgLy8gZGlzcGxheSBwcm9qZWN0c1xuICAgIGNvbnN0IHNhdmVkUHJvamVjdHMgPSBnZXRTYXZlZFByb2plY3RzKCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYXZlZFByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBkaXYgZm9yIHByb2plY3RCdG4gYW5kIGRlbGV0ZUJ0blxuICAgICAgICBjb25zdCBidG5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIGJ0bkRpdi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckJ0bkRpdlwiKTtcblxuICAgICAgICAvLyBjcmVhdGUgcHJvamVjdEJ0blxuICAgICAgICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgICAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyQnRuXCIpO1xuICAgICAgICBwcm9qZWN0QnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNhdmVkUHJvamVjdHNbaV0uZ2V0TmFtZSgpKTtcblxuICAgICAgICBwcm9qZWN0QnRuLnRleHRDb250ZW50ID0gc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCk7XG5cbiAgICAgICAgcHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGRpc3BsYXlXZWJzaXRlKHNhdmVkUHJvamVjdHNbaV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2NyZWF0ZSBkZWxldGVCdG5cbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInNpZGViYXJEZWxldGVCdG5cIik7XG4gICAgICAgIGRlbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKSk7XG5cbiAgICAgICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCJYXCI7XG5cbiAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlUHJvamVjdChzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKSk7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShzYXZlZFByb2plY3RzWzBdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xuICAgICAgICBidG5EaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcbiAgICAgICAgc2lkZWJhckRpdi5hcHBlbmRDaGlsZChidG5EaXYpO1xuXG4gICAgfVxuXG4gICAgLy8gbmV3IHByb2plY3QgYnV0dG9uXG4gICAgY29uc3QgbmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckJ0blwiKTtcbiAgICBuZXdQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gXCJuZXcgcHJvamVjdCArXCI7XG5cbiAgICAvLyBldmVudCBsaXN0ZW5lciB0byBjcmVhdGUgYSBuZXcgcHJvamVjdCBvbiBjbGlja1xuICAgIG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjcmVhdGVQcm9qZWN0KHByb21wdChcIkVudGVyIHByb2plY3QgbmFtZTpcIikpO1xuICAgICAgICAvLyBUT0RPIGRpc3BsYXkgbmV3bHkgY3JlYXRlZCBwcm9qZWN0XG4gICAgICAgIGRpc3BsYXlXZWJzaXRlKHNhdmVkUHJvamVjdHNbMF0pO1xuICAgIH0pOyBcblxuICAgIHNpZGViYXJEaXYuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ0bik7XG5cbiAgICByZXR1cm4gc2lkZWJhckRpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XG4gICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RcIik7XG5cbiAgICBjb25zdCBwcmlvcml0eUxvd0RpdiA9IGRpc3BsYXlQcmlvcml0eSgwLCBwcm9qZWN0KTtcbiAgICBjb25zdCBwcmlvcml0eU1lZERpdiA9IGRpc3BsYXlQcmlvcml0eSgxLCBwcm9qZWN0KTtcbiAgICBjb25zdCBwcmlvcml0eUhpZ2hEaXYgPSBkaXNwbGF5UHJpb3JpdHkoMiwgcHJvamVjdCk7XG5cbiAgICAvLyBnZXQgbGlzdCBvZiB0YXNrcyBpbiBwcm9qZWN0XG4gICAgY29uc3QgcHJvamVjdFRhc2tzID0gcHJvamVjdC5nZXRUYXNrcygpO1xuXG4gICAgLy8gZm9yIGVhY2ggdGFzayBpbiBwcm9qZWN0OiBjaGVjayBwcmlvcml0eVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwcm9qZWN0VGFza3MpIHtcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGVsZW1lbnQuZ2V0UHJpb3JpdHkoKTtcbiAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA9PSAwKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IGxvdyBwcmlvcml0eSB0YXNrc1xuICAgICAgICAgICAgcHJpb3JpdHlMb3dEaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2socHJvamVjdCwgZWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eSA9PSAxKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IG1lZGl1bSBwcmlvcml0eSB0YXNrc1xuICAgICAgICAgICAgcHJpb3JpdHlNZWREaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2socHJvamVjdCwgZWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eSA9PSAyKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IGhpZ2ggcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5SGlnaERpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGFzayhwcm9qZWN0LCBlbGVtZW50KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhpZ2hEaXYpO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlNZWREaXYpO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlMb3dEaXYpO1xuXG4gICAgcmV0dXJuIHByb2plY3REaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcmlvcml0eShwcmlvcml0eSwgcHJvamVjdCkge1xuICAgIGNvbnN0IHByaW9yaXR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eURpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgcHJpb3JpdHlEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJpb3JpdHkpO1xuXG4gICAgaWYgKHByaW9yaXR5ID09IDApIHtcbiAgICAgICAgLy8gZGlzcGxheSBsb3cgcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlIZWFkZXJEaXZcIik7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyLnRleHRDb250ZW50ID0gXCJMb3cgUHJpb3JpdHlcIjtcblxuICAgICAgICBjb25zdCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY3JlYXRlVGFza0J0bi50ZXh0Q29udGVudCA9IFwiTmV3IFRhc2sgK1wiO1xuXG4gICAgICAgIC8vIG5ldyB0YXNrIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVUYXNrKHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgICAgIGRpc3BsYXlXZWJzaXRlKHByb2plY3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tCdG4pO1xuXG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyRGl2KTtcbiAgICB9IGVsc2UgaWYgKHByaW9yaXR5ID09IDEpIHtcbiAgICAgICAgLy8gZGlzcGxheSBtZWRpdW0gcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlIZWFkZXJEaXZcIik7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyLnRleHRDb250ZW50ID0gXCJNZWRpdW0gUHJpb3JpdHlcIjtcblxuICAgICAgICBjb25zdCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY3JlYXRlVGFza0J0bi50ZXh0Q29udGVudCA9IFwiTmV3IFRhc2sgK1wiO1xuXG4gICAgICAgIC8vIG5ldyB0YXNrIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVUYXNrKHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgICAgIGRpc3BsYXlXZWJzaXRlKHByb2plY3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tCdG4pO1xuXG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyRGl2KTtcbiAgICAgICAgXG4gICAgfSBlbHNlIGlmIChwcmlvcml0eSA9PSAyKSB7XG4gICAgICAgIC8vIGRpc3BsYXkgaGlnaCBwcmlvcml0eVxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eUhlYWRlckRpdlwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlci50ZXh0Q29udGVudCA9IFwiSGlnaCBQcmlvcml0eVwiO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjcmVhdGVUYXNrQnRuLnRleHRDb250ZW50ID0gXCJOZXcgVGFzayArXCI7XG5cbiAgICAgICAgLy8gbmV3IHRhc2sgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgY3JlYXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZVRhc2socHJpb3JpdHksIHByb2plY3QpO1xuICAgICAgICAgICAgZGlzcGxheVdlYnNpdGUocHJvamVjdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQoY3JlYXRlVGFza0J0bik7XG5cbiAgICAgICAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXJEaXYpO1xuICAgIH1cblxuICAgIHJldHVybiBwcmlvcml0eURpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2socHJvamVjdCwgdGFzaykge1xuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gICAgXG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrLmdldE5hbWUoKTtcblxuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcblxuICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZ2V0RGVzY3JpcHRpb24oKTtcblxuICAgIC8vIGRyb3AgZG93biB0byBjaGFuZ2UgcHJpb3JpdHlcbiAgICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG5cbiAgICBjb25zdCBwcmlvcml0eVNlbGVjdEhpZ2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHByaW9yaXR5U2VsZWN0SGlnaC50ZXh0Q29udGVudCA9IFwiSGlnaFwiO1xuICAgIHByaW9yaXR5U2VsZWN0SGlnaC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcImhpZ2hcIik7XG5cbiAgICBjb25zdCBwcmlvcml0eVNlbGVjdE1lZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgcHJpb3JpdHlTZWxlY3RNZWQudGV4dENvbnRlbnQgPSBcIk1lZGl1bVwiO1xuICAgIHByaW9yaXR5U2VsZWN0TWVkLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwibWVkaXVtXCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHlTZWxlY3RMb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHByaW9yaXR5U2VsZWN0TG93LnRleHRDb250ZW50ID0gXCJMb3dcIjtcbiAgICBwcmlvcml0eVNlbGVjdExvdy5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcImxvd1wiKTtcblxuICAgIHByaW9yaXR5U2VsZWN0LmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0TG93KTtcbiAgICBwcmlvcml0eVNlbGVjdC5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdE1lZCk7XG4gICAgcHJpb3JpdHlTZWxlY3QuYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3RIaWdoKTtcblxuICAgIC8vIHNldCBkZWZhdWx0IHByaW9yaXR5IGRyb3Bkb3duIG9wdGlvbiB0byBjb3JyZWN0IHByaW9yaXR5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmlvcml0eVNlbGVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zb2xlLmxvZyhwcmlvcml0eVNlbGVjdC5vcHRpb25zW2ldLmluZGV4KTtcbiAgICAgICAgaWYgKHByaW9yaXR5U2VsZWN0Lm9wdGlvbnNbaV0uaW5kZXggPT0gdGFzay5nZXRQcmlvcml0eSgpKSB7XG4gICAgICAgICAgICBwcmlvcml0eVNlbGVjdC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBkZWxldGUgdGFzayBidXR0b25cbiAgICBjb25zdCB0YXNrRGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0YXNrRGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCJEZWxldGUgVGFza1wiO1xuXG4gICAgLy8gZGVsZXRlIHRhc2sgZnVuY3Rpb24gY2FsbFxuICAgIHRhc2tEZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGRlbGV0ZVRhc2socHJvamVjdCwgdGFzayk7XG4gICAgICAgIGRpc3BsYXlXZWJzaXRlKHByb2plY3QpO1xuICAgIH0pO1xuXG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3QpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0RlbGV0ZUJ0bik7XG5cbiAgICByZXR1cm4gdGFza0Rpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVdlYnNpdGUocHJvamVjdCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG5cbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGRpc3BsYXlTaWRlYmFyKCkpO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVByb2plY3QocHJvamVjdCkpO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplV2Vic2l0ZSgpIHtcbiAgICBjb25zdCBkZWZQcm9qID0gY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcblxuICAgIGRpc3BsYXlXZWJzaXRlKGRlZlByb2opO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJpbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCJcIikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBnZXRUYXNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3M7XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICBkZWxldGVUYXNrKHRhc2tOYW1lKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMudGFza3MubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuZ2V0TmFtZSgpOyB9KS5pbmRleE9mKHRhc2tOYW1lKTtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJlY29uc3RydWN0VGFza3ModGFza3MpIHtcbiAgICAgICAgbGV0IG5ld1Rhc2tzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBjaGFuZ2UgdGFzayBpbnRvIHRhc2sgb2JqZWN0XG4gICAgICAgICAgICBsZXQgdGFza09iaiA9IG5ldyBUYXNrKCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRhc2tPYmosIHRhc2tzW2ldKTtcbiAgICAgICAgICAgIG5ld1Rhc2tzW2ldID0gdGFza09iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlbGV0ZSBhbGwgY3VycmVudCB0YXNrc1xuICAgICAgICB0YXNrcy5zcGxpY2UoMCwgdGFza3MubGVuZ3RoKTtcblxuICAgICAgICAvLyBhZGQgYWxsIG5ld1Rhc2tzIHRvIHRoaXMudGFza3NcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIG5ld1Rhc2tzKSB7XG4gICAgICAgICAgICB0YXNrcy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IHNhdmVQcm9qZWN0LCBkZWxldGVQcm9qZWN0U3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gICAgaWYgKG5hbWUgPT0gbnVsbCB8fCBuYW1lID09IFwiXCIpIHtcbiAgICAgICAgYWxlcnQoXCJOYW1lIGVycm9yXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcblxuICAgIHNhdmVQcm9qZWN0KHByb2plY3QpO1xuXG4gICAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRQcm9qZWN0KCkge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoXCJkZWZhdWx0XCIpO1xuXG4gICAgY29uc3QgZGVmYXVsdFRhc2sgPSBuZXcgVGFzayhcImRlZmF1bHRcIik7XG4gICAgY29uc3QgZGVmYXVsdFRhc2syID0gbmV3IFRhc2soXCJkZWZhdWx0MlwiLCBcIjAxLTAxLTIwMjNcIiwgXCJubyBkZXNjcmlwdGlvblwiLCAxKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazMgPSBuZXcgVGFzayhcImRlZmF1bHQzXCIsIFwiMjQvMDYvMjNcIiwgXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBFdGlhbSBsYWNpbmlhLCBtYWduYSBub24gYWNjdW1zYW4gYWNjdW1zYW4sIG51bGxhIGR1aSBldWlzbW9kIHR1cnBpcywgdmVsIGFsaXF1ZXQganVzdG8gbWFnbmEgbm9uIGlwc3VtLiBOdWxsYSBmYWNpbGlzaS4gUHJvaW4gdnVscHV0YXRlIHZlbCBkaWFtIHNlZCBpYWN1bGlzLlwiLCAyKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazQgPSBuZXcgVGFzayhcImRlZmF1bHQ0XCIpO1xuXG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzayk7XG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzazIpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2szKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrNCk7XG5cbiAgICBzYXZlUHJvamVjdChkZWZhdWx0UHJvamVjdCk7XG5cbiAgICByZXR1cm4gZGVmYXVsdFByb2plY3Q7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBpZiAocHJvamVjdE5hbWUgPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgYWxlcnQoXCJDYW5ub3QgZGVsZXRlIGRlZmF1bHQgcHJvamVjdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGVQcm9qZWN0U3RvcmFnZShwcm9qZWN0TmFtZSk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH0iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcblxuLy8gY2hlY2sgaWYgc3RvcmFnZSBpcyBhdmFpbGFibGVcbmZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICAgIHZhciBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgIHZhciB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxufVxuXG4vLyBhZGQgbmV3IHByb2plY3QgdG8gc3RvcmFnZVxuZnVuY3Rpb24gc2F2ZVByb2plY3QocHJvamVjdCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByb2plY3QuZ2V0TmFtZSgpLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0KSk7XG59XG5cbmZ1bmN0aW9uIGdldFNhdmVkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBsZXQgcmV0cmlldmVkT2JqZWN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgICAgIC8vIHJlY29uc3RydWN0IHByb2plY3Qgb2JqZWN0IHVzaW5nIHJldHJpZXZlZE9iamVjdCBkYXRhXG4gICAgICAgIGxldCBwcm9qID0gbmV3IFByb2plY3QoKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9qLCBKU09OLnBhcnNlKHJldHJpZXZlZE9iamVjdCkpO1xuXG4gICAgICAgIC8vIHJlY29uc3RydWN0IHRhc2sgb2JqZWN0cyB3aXRoaW4gcHJvamVjdCBvYmplY3RcbiAgICAgICAgbGV0IHRhc2tBcnJheSA9IHByb2ouZ2V0VGFza3MoKTtcbiAgICAgICAgcHJvai5yZWNvbnN0cnVjdFRhc2tzKHRhc2tBcnJheSk7XG5cbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvamVjdHM7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RTdG9yYWdlKHByb2plY3ROYW1lKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ocHJvamVjdE5hbWUpO1xufVxuXG5leHBvcnQgeyBzYXZlUHJvamVjdCwgZ2V0U2F2ZWRQcm9qZWN0cywgZGVsZXRlUHJvamVjdFN0b3JhZ2UgfSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUgPSAnTm8gZGF0ZScsIGRlc2NyaXB0aW9uID0gJycsIHByaW9yaXR5ID0gMCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGdldER1ZURhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldFByaW9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXREdWVEYXRlKGR1ZURhdGUpIHtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgLy8gMCA9IGxvdywgMSA9IG1lZGl1bSwgMiA9IGhpZ2hcbiAgICBzZXRQcmlvcml0eShwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxufSIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCB7IHNhdmVQcm9qZWN0LCBkZWxldGVQcm9qZWN0U3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuZnVuY3Rpb24gY3JlYXRlVGFzayhwcmlvcml0eSwgcHJvamVjdCkge1xuICAgIGxldCBuYW1lID0gcHJvbXB0KFwiRW50ZXIgdGFzayBuYW1lXCIpO1xuICAgIGxldCBkdWVEYXRlID0gcHJvbXB0KFwiRW50ZXIgZHVlIGRhdGVcIik7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gcHJvbXB0KFwiRW50ZXIgZGVzY3JpcHRpb25cIik7XG5cbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5KTtcblxuICAgIHByb2plY3QuYWRkVGFzayhuZXdUYXNrKTtcblxuICAgIHNhdmVQcm9qZWN0KHByb2plY3QpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKHByb2plY3QsIHRhc2spIHtcbiAgICBwcm9qZWN0LmRlbGV0ZVRhc2sodGFzayk7XG5cbiAgICBzYXZlUHJvamVjdChwcm9qZWN0KTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlVGFzaywgZGVsZXRlVGFzayB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdGlhbGl6ZVdlYnNpdGUgZnJvbSAnLi9VSSc7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9