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
/* harmony import */ var _projectFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectFunctions */ "./src/projectFunctions.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/storage.js");



function displaySidebar() {
    const sidebarDiv = document.createElement("div");
    sidebarDiv.classList.add("sidebar");

    // display projects
    const savedProjects = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.getSavedProjects)();
    
    for (let i = 0; i < savedProjects.length; i++) {
        const projectBtn = document.createElement("button");

        projectBtn.classList.add("sidebarBtn");
        projectBtn.setAttribute("id", savedProjects[i].getName());

        projectBtn.textContent = savedProjects[i].getName();

        projectBtn.addEventListener("click", (e) => {
            // TODO set button as active
            // TODO NEEDS TESTING
            displayProject(savedProjects[i]);
        });

        sidebarDiv.appendChild(projectBtn);

    }

    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList.add("sidebarBtn");
    newProjectBtn.textContent = "new project +";
    // TODO add event listener for createProject()
    newProjectBtn.addEventListener("click", function() {
        (0,_projectFunctions__WEBPACK_IMPORTED_MODULE_0__.createProject)(prompt("Enter project name:"));
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

// why is this here
function displayMain() {
    const main = document.createElement("main");
    main.classList.add("main");
    main.setAttribute("id", "main");
    return main;
}

function initializeWebsite() {
    const content = document.getElementById("content");

    const defProj = (0,_projectFunctions__WEBPACK_IMPORTED_MODULE_0__.createDefaultProject)();
    content.appendChild(displaySidebar());
    // default project
    content.appendChild(displayProject(defProj));
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
            console.log(element.getPriority());
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

function deleteProject(project) {
    // need local storage
}



/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdGO0FBQzNDOztBQUU3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsMERBQWdCO0FBQzFDO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5Qzs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBYTtBQUNyQixLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQix1RUFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsaUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7QUMvSU47O0FBRVg7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBLDhCQUE4Qiw2Q0FBSTtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hEZ0M7QUFDTjtBQUNjOztBQUV4QztBQUNBLHdCQUF3QixnREFBTzs7QUFFL0IsSUFBSSxxREFBVzs7QUFFZjtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLGdEQUFPOztBQUV0Qyw0QkFBNEIsNkNBQUk7QUFDaEMsNkJBQTZCLDZDQUFJO0FBQ2pDLDZCQUE2Qiw2Q0FBSTtBQUNqQyw2QkFBNkIsNkNBQUk7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUkscURBQVc7O0FBRWY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ2dDO0FBQ047O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnREFBTztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDckRlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUN4Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQzs7QUFFckMsK0NBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0RnVuY3Rpb25zJztcbmltcG9ydCB7IGdldFNhdmVkUHJvamVjdHMgfSBmcm9tICcuL3N0b3JhZ2UnO1xuXG5mdW5jdGlvbiBkaXNwbGF5U2lkZWJhcigpIHtcbiAgICBjb25zdCBzaWRlYmFyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaWRlYmFyRGl2LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyXCIpO1xuXG4gICAgLy8gZGlzcGxheSBwcm9qZWN0c1xuICAgIGNvbnN0IHNhdmVkUHJvamVjdHMgPSBnZXRTYXZlZFByb2plY3RzKCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYXZlZFByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgICAgIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5cIik7XG4gICAgICAgIHByb2plY3RCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCkpO1xuXG4gICAgICAgIHByb2plY3RCdG4udGV4dENvbnRlbnQgPSBzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKTtcblxuICAgICAgICBwcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETyBzZXQgYnV0dG9uIGFzIGFjdGl2ZVxuICAgICAgICAgICAgLy8gVE9ETyBORUVEUyBURVNUSU5HXG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdChzYXZlZFByb2plY3RzW2ldKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhckRpdi5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcblxuICAgIH1cblxuICAgIGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5cIik7XG4gICAgbmV3UHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IFwibmV3IHByb2plY3QgK1wiO1xuICAgIC8vIFRPRE8gYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBjcmVhdGVQcm9qZWN0KClcbiAgICBuZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdChwcm9tcHQoXCJFbnRlciBwcm9qZWN0IG5hbWU6XCIpKTtcbiAgICB9KTtcbiAgICAvLyBtYXliZSB1c2UgYW4gYWxlcnQgZm9yIHByb2plY3QgZGV0YWlscz9cblxuICAgIHNpZGViYXJEaXYuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ0bik7XG5cbiAgICByZXR1cm4gc2lkZWJhckRpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XG4gICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RcIik7XG5cbiAgICBjb25zdCBwcmlvcml0eUxvd0RpdiA9IGRpc3BsYXlQcmlvcml0eSgwKTtcbiAgICBjb25zdCBwcmlvcml0eU1lZERpdiA9IGRpc3BsYXlQcmlvcml0eSgxKTtcbiAgICBjb25zdCBwcmlvcml0eUhpZ2hEaXYgPSBkaXNwbGF5UHJpb3JpdHkoMik7XG5cbiAgICAvLyBnZXQgbGlzdCBvZiB0YXNrcyBpbiBwcm9qZWN0XG4gICAgY29uc3QgcHJvamVjdFRhc2tzID0gcHJvamVjdC5nZXRUYXNrcygpO1xuXG4gICAgLy8gZm9yIGVhY2ggdGFzayBpbiBwcm9qZWN0OiBjaGVjayBwcmlvcml0eVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwcm9qZWN0VGFza3MpIHtcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGVsZW1lbnQuZ2V0UHJpb3JpdHkoKTtcbiAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA9PSAwKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IGxvdyBwcmlvcml0eSB0YXNrc1xuICAgICAgICAgICAgcHJpb3JpdHlMb3dEaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2soZWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eSA9PSAxKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IG1lZGl1bSBwcmlvcml0eSB0YXNrc1xuICAgICAgICAgICAgcHJpb3JpdHlNZWREaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2soZWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eSA9PSAyKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IGhpZ2ggcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5SGlnaERpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGFzayhlbGVtZW50KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhpZ2hEaXYpO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlNZWREaXYpO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlMb3dEaXYpO1xuXG4gICAgcmV0dXJuIHByb2plY3REaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcmlvcml0eShwcmlvcml0eSkge1xuICAgIGNvbnN0IHByaW9yaXR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eURpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgcHJpb3JpdHlEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJpb3JpdHkpO1xuXG4gICAgaWYgKHByaW9yaXR5ID09IDApIHtcbiAgICAgICAgLy8gZGlzcGxheSBsb3cgcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyLnRleHRDb250ZW50ID0gXCJMb3cgUHJpb3JpdHlcIjtcbiAgICAgICAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXIpO1xuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT0gMSkge1xuICAgICAgICAvLyBkaXNwbGF5IG1lZGl1bSBwcmlvcml0eVxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIk1lZGl1bSBQcmlvcml0eVwiO1xuICAgICAgICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgICAgIFxuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT0gMikge1xuICAgICAgICAvLyBkaXNwbGF5IGhpZ2ggcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyLnRleHRDb250ZW50ID0gXCJIaWdoIFByaW9yaXR5XCI7XG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJpb3JpdHlEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5nZXROYW1lKCk7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XG5cbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmdldERlc2NyaXB0aW9uKCk7XG5cbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGFza0Rpdjtcbn1cblxuLy8gd2h5IGlzIHRoaXMgaGVyZVxuZnVuY3Rpb24gZGlzcGxheU1haW4oKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICAgIG1haW4uY2xhc3NMaXN0LmFkZChcIm1haW5cIik7XG4gICAgbWFpbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1haW5cIik7XG4gICAgcmV0dXJuIG1haW47XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVXZWJzaXRlKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG5cbiAgICBjb25zdCBkZWZQcm9qID0gY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGRpc3BsYXlTaWRlYmFyKCkpO1xuICAgIC8vIGRlZmF1bHQgcHJvamVjdFxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVByb2plY3QoZGVmUHJvaikpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJpbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCJcIikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBnZXRUYXNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3M7XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICBkZWxldGVUYXNrKHRhc2tOYW1lKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMudGFza3MubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuZ2V0TmFtZSgpOyB9KS5pbmRleE9mKHRhc2tOYW1lKTtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJlY29uc3RydWN0VGFza3ModGFza3MpIHtcbiAgICAgICAgbGV0IG5ld1Rhc2tzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBjaGFuZ2UgdGFzayBpbnRvIHRhc2sgb2JqZWN0XG4gICAgICAgICAgICBsZXQgdGFza09iaiA9IG5ldyBUYXNrKCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRhc2tPYmosIHRhc2tzW2ldKTtcbiAgICAgICAgICAgIG5ld1Rhc2tzW2ldID0gdGFza09iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlbGV0ZSBhbGwgY3VycmVudCB0YXNrc1xuICAgICAgICB0YXNrcy5zcGxpY2UoMCwgdGFza3MubGVuZ3RoKTtcblxuICAgICAgICAvLyBhZGQgYWxsIG5ld1Rhc2tzIHRvIHRoaXMudGFza3NcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIG5ld1Rhc2tzKSB7XG4gICAgICAgICAgICB0YXNrcy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudC5nZXRQcmlvcml0eSgpKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgeyBzYXZlUHJvamVjdCB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuXG4gICAgc2F2ZVByb2plY3QocHJvamVjdCk7XG5cbiAgICByZXR1cm4gcHJvamVjdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdFByb2plY3QoKSB7XG4gICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdChcImRlZmF1bHRcIik7XG5cbiAgICBjb25zdCBkZWZhdWx0VGFzayA9IG5ldyBUYXNrKFwiZGVmYXVsdFwiKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazIgPSBuZXcgVGFzayhcImRlZmF1bHQyXCIsIFwiMDEtMDEtMjAyM1wiLCBcIm5vIGRlc2NyaXB0aW9uXCIsIDEpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrMyA9IG5ldyBUYXNrKFwiZGVmYXVsdDNcIiwgXCIyNC8wNi8yM1wiLCBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIEV0aWFtIGxhY2luaWEsIG1hZ25hIG5vbiBhY2N1bXNhbiBhY2N1bXNhbiwgbnVsbGEgZHVpIGV1aXNtb2QgdHVycGlzLCB2ZWwgYWxpcXVldCBqdXN0byBtYWduYSBub24gaXBzdW0uIE51bGxhIGZhY2lsaXNpLiBQcm9pbiB2dWxwdXRhdGUgdmVsIGRpYW0gc2VkIGlhY3VsaXMuXCIsIDIpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrNCA9IG5ldyBUYXNrKFwiZGVmYXVsdDRcIik7XG5cbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrMik7XG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzazMpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2s0KTtcblxuICAgIHNhdmVQcm9qZWN0KGRlZmF1bHRQcm9qZWN0KTtcblxuICAgIHJldHVybiBkZWZhdWx0UHJvamVjdDtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgLy8gbmVlZCBsb2NhbCBzdG9yYWdlXG59XG5cbmV4cG9ydCB7IGNyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH0iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcblxuLy8gY2hlY2sgaWYgc3RvcmFnZSBpcyBhdmFpbGFibGVcbmZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICAgIHZhciBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgIHZhciB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxufVxuXG4vLyBhZGQgbmV3IHByb2plY3QgdG8gc3RvcmFnZVxuZnVuY3Rpb24gc2F2ZVByb2plY3QocHJvamVjdCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByb2plY3QuZ2V0TmFtZSgpLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0KSk7XG59XG5cbmZ1bmN0aW9uIGdldFNhdmVkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBsZXQgcmV0cmlldmVkT2JqZWN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgICAgIC8vIHJlY29uc3RydWN0IHByb2plY3Qgb2JqZWN0IHVzaW5nIHJldHJpZXZlZE9iamVjdCBkYXRhXG4gICAgICAgIGxldCBwcm9qID0gbmV3IFByb2plY3QoKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9qLCBKU09OLnBhcnNlKHJldHJpZXZlZE9iamVjdCkpO1xuXG4gICAgICAgIC8vIHJlY29uc3RydWN0IHRhc2sgb2JqZWN0cyB3aXRoaW4gcHJvamVjdCBvYmplY3RcbiAgICAgICAgbGV0IHRhc2tBcnJheSA9IHByb2ouZ2V0VGFza3MoKTtcbiAgICAgICAgcHJvai5yZWNvbnN0cnVjdFRhc2tzKHRhc2tBcnJheSk7XG5cbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvamVjdHM7XG59XG5cbmV4cG9ydCB7IHNhdmVQcm9qZWN0LCBnZXRTYXZlZFByb2plY3RzfSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUgPSAnTm8gZGF0ZScsIGRlc2NyaXB0aW9uID0gJycsIHByaW9yaXR5ID0gMCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGdldER1ZURhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldFByaW9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXREdWVEYXRlKGR1ZURhdGUpIHtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgLy8gMCA9IGxvdywgMSA9IG1lZGl1bSwgMiA9IGhpZ2hcbiAgICBzZXRQcmlvcml0eShwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemVXZWJzaXRlIGZyb20gJy4vVUknO1xuXG5pbml0aWFsaXplV2Vic2l0ZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==