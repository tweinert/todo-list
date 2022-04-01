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
    if (document.getElementById("sidebar")) {
        document.getElementById("sidebar").remove();
    }
    
    const sidebarDiv = document.createElement("div");

    sidebarDiv.classList.add("sidebar");
    sidebarDiv.setAttribute("id", "sidebar");

    // display projects
    const savedProjects = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.getSavedProjects)();
    
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
            (0,_projectFunctions__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(savedProjects[i].getName());
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
        (0,_projectFunctions__WEBPACK_IMPORTED_MODULE_0__.createProject)(prompt("Enter project name:"));
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
        const priorityHeaderDiv = document.createElement("div");
        priorityHeaderDiv.classList.add("priorityHeaderDiv");

        const priorityHeader = document.createElement("h3");
        priorityHeader.textContent = "Low Priority";

        const createTaskBtn = document.createElement("button");
        createTaskBtn.textContent = "New Task +";

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
    const defProj = (0,_projectFunctions__WEBPACK_IMPORTED_MODULE_0__.createDefaultProject)();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDeENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7O0FBRXJDLCtDQUFpQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1VJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0RnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBkZWxldGVQcm9qZWN0LCBjcmVhdGVEZWZhdWx0UHJvamVjdCB9IGZyb20gJy4vcHJvamVjdEZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBnZXRTYXZlZFByb2plY3RzIH0gZnJvbSAnLi9zdG9yYWdlJztcblxuZnVuY3Rpb24gZGlzcGxheVNpZGViYXIoKSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lkZWJhclwiKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGViYXJcIikucmVtb3ZlKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHNpZGViYXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgc2lkZWJhckRpdi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhclwiKTtcbiAgICBzaWRlYmFyRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2lkZWJhclwiKTtcblxuICAgIC8vIGRpc3BsYXkgcHJvamVjdHNcbiAgICBjb25zdCBzYXZlZFByb2plY3RzID0gZ2V0U2F2ZWRQcm9qZWN0cygpO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2F2ZWRQcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBjcmVhdGUgZGl2IGZvciBwcm9qZWN0QnRuIGFuZCBkZWxldGVCdG5cbiAgICAgICAgY29uc3QgYnRuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBidG5EaXYuY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5EaXZcIik7XG5cbiAgICAgICAgLy8gY3JlYXRlIHByb2plY3RCdG5cbiAgICAgICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICAgICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckJ0blwiKTtcbiAgICAgICAgcHJvamVjdEJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKSk7XG5cbiAgICAgICAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHNhdmVkUHJvamVjdHNbaV0uZ2V0TmFtZSgpO1xuXG4gICAgICAgIHByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShzYXZlZFByb2plY3RzW2ldKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jcmVhdGUgZGVsZXRlQnRuXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyRGVsZXRlQnRuXCIpO1xuICAgICAgICBkZWxldGVCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCkpO1xuXG4gICAgICAgIGRlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiWFwiO1xuXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3Qoc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCkpO1xuICAgICAgICAgICAgZGlzcGxheVdlYnNpdGUoc2F2ZWRQcm9qZWN0c1swXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJ0bkRpdi5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gICAgICAgIHNpZGViYXJEaXYuYXBwZW5kQ2hpbGQoYnRuRGl2KTtcblxuICAgIH1cblxuICAgIC8vIG5ldyBwcm9qZWN0IGJ1dHRvblxuICAgIGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5cIik7XG4gICAgbmV3UHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IFwibmV3IHByb2plY3QgK1wiO1xuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgdG8gY3JlYXRlIGEgbmV3IHByb2plY3Qgb24gY2xpY2tcbiAgICBuZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdChwcm9tcHQoXCJFbnRlciBwcm9qZWN0IG5hbWU6XCIpKTtcbiAgICAgICAgLy8gVE9ETyBkaXNwbGF5IG5ld2x5IGNyZWF0ZWQgcHJvamVjdFxuICAgICAgICBkaXNwbGF5V2Vic2l0ZShzYXZlZFByb2plY3RzWzBdKTtcbiAgICB9KTsgXG5cbiAgICBzaWRlYmFyRGl2LmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdG4pO1xuXG4gICAgcmV0dXJuIHNpZGViYXJEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHByb2plY3QpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgIHByb2plY3REaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0XCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHlMb3dEaXYgPSBkaXNwbGF5UHJpb3JpdHkoMCk7XG4gICAgY29uc3QgcHJpb3JpdHlNZWREaXYgPSBkaXNwbGF5UHJpb3JpdHkoMSk7XG4gICAgY29uc3QgcHJpb3JpdHlIaWdoRGl2ID0gZGlzcGxheVByaW9yaXR5KDIpO1xuXG4gICAgLy8gZ2V0IGxpc3Qgb2YgdGFza3MgaW4gcHJvamVjdFxuICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKTtcblxuICAgIC8vIGZvciBlYWNoIHRhc2sgaW4gcHJvamVjdDogY2hlY2sgcHJpb3JpdHlcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcHJvamVjdFRhc2tzKSB7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBlbGVtZW50LmdldFByaW9yaXR5KCk7XG4gICAgICAgIGlmICh0YXNrUHJpb3JpdHkgPT0gMCkge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBsb3cgcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5TG93RGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUYXNrKGVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT0gMSkge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBtZWRpdW0gcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5TWVkRGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUYXNrKGVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT0gMikge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBoaWdoIHByaW9yaXR5IHRhc2tzXG4gICAgICAgICAgICBwcmlvcml0eUhpZ2hEaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2soZWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIaWdoRGl2KTtcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5TWVkRGl2KTtcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5TG93RGl2KTtcblxuICAgIHJldHVybiBwcm9qZWN0RGl2O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UHJpb3JpdHkocHJpb3JpdHkpIHtcbiAgICBjb25zdCBwcmlvcml0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgIHByaW9yaXR5RGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIHByaW9yaXR5KTtcblxuICAgIGlmIChwcmlvcml0eSA9PSAwKSB7XG4gICAgICAgIC8vIGRpc3BsYXkgbG93IHByaW9yaXR5XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5SGVhZGVyRGl2XCIpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlci50ZXh0Q29udGVudCA9IFwiTG93IFByaW9yaXR5XCI7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNyZWF0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrICtcIjtcblxuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tCdG4pO1xuXG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyRGl2KTtcbiAgICB9IGVsc2UgaWYgKHByaW9yaXR5ID09IDEpIHtcbiAgICAgICAgLy8gZGlzcGxheSBtZWRpdW0gcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlIZWFkZXJEaXZcIik7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyLnRleHRDb250ZW50ID0gXCJNZWRpdW0gUHJpb3JpdHlcIjtcblxuICAgICAgICBjb25zdCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY3JlYXRlVGFza0J0bi50ZXh0Q29udGVudCA9IFwiTmV3IFRhc2sgK1wiO1xuXG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQoY3JlYXRlVGFza0J0bik7XG5cbiAgICAgICAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXJEaXYpO1xuICAgICAgICBcbiAgICB9IGVsc2UgaWYgKHByaW9yaXR5ID09IDIpIHtcbiAgICAgICAgLy8gZGlzcGxheSBoaWdoIHByaW9yaXR5XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5SGVhZGVyRGl2XCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyLnRleHRDb250ZW50ID0gXCJIaWdoIFByaW9yaXR5XCI7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNyZWF0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrICtcIjtcblxuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tCdG4pO1xuXG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyRGl2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJpb3JpdHlEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5nZXROYW1lKCk7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XG5cbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmdldERlc2NyaXB0aW9uKCk7XG5cbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGFza0Rpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVdlYnNpdGUocHJvamVjdCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG5cbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGRpc3BsYXlTaWRlYmFyKCkpO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVByb2plY3QocHJvamVjdCkpO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplV2Vic2l0ZSgpIHtcbiAgICBjb25zdCBkZWZQcm9qID0gY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcblxuICAgIGRpc3BsYXlXZWJzaXRlKGRlZlByb2opO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJpbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCJcIikge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBnZXRUYXNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3M7XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICBkZWxldGVUYXNrKHRhc2tOYW1lKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMudGFza3MubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuZ2V0TmFtZSgpOyB9KS5pbmRleE9mKHRhc2tOYW1lKTtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJlY29uc3RydWN0VGFza3ModGFza3MpIHtcbiAgICAgICAgbGV0IG5ld1Rhc2tzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBjaGFuZ2UgdGFzayBpbnRvIHRhc2sgb2JqZWN0XG4gICAgICAgICAgICBsZXQgdGFza09iaiA9IG5ldyBUYXNrKCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRhc2tPYmosIHRhc2tzW2ldKTtcbiAgICAgICAgICAgIG5ld1Rhc2tzW2ldID0gdGFza09iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlbGV0ZSBhbGwgY3VycmVudCB0YXNrc1xuICAgICAgICB0YXNrcy5zcGxpY2UoMCwgdGFza3MubGVuZ3RoKTtcblxuICAgICAgICAvLyBhZGQgYWxsIG5ld1Rhc2tzIHRvIHRoaXMudGFza3NcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIG5ld1Rhc2tzKSB7XG4gICAgICAgICAgICB0YXNrcy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IHNhdmVQcm9qZWN0LCBkZWxldGVQcm9qZWN0U3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gICAgaWYgKG5hbWUgPT0gbnVsbCB8fCBuYW1lID09IFwiXCIpIHtcbiAgICAgICAgYWxlcnQoXCJOYW1lIGVycm9yXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcblxuICAgIHNhdmVQcm9qZWN0KHByb2plY3QpO1xuXG4gICAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRQcm9qZWN0KCkge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoXCJkZWZhdWx0XCIpO1xuXG4gICAgY29uc3QgZGVmYXVsdFRhc2sgPSBuZXcgVGFzayhcImRlZmF1bHRcIik7XG4gICAgY29uc3QgZGVmYXVsdFRhc2syID0gbmV3IFRhc2soXCJkZWZhdWx0MlwiLCBcIjAxLTAxLTIwMjNcIiwgXCJubyBkZXNjcmlwdGlvblwiLCAxKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazMgPSBuZXcgVGFzayhcImRlZmF1bHQzXCIsIFwiMjQvMDYvMjNcIiwgXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBFdGlhbSBsYWNpbmlhLCBtYWduYSBub24gYWNjdW1zYW4gYWNjdW1zYW4sIG51bGxhIGR1aSBldWlzbW9kIHR1cnBpcywgdmVsIGFsaXF1ZXQganVzdG8gbWFnbmEgbm9uIGlwc3VtLiBOdWxsYSBmYWNpbGlzaS4gUHJvaW4gdnVscHV0YXRlIHZlbCBkaWFtIHNlZCBpYWN1bGlzLlwiLCAyKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazQgPSBuZXcgVGFzayhcImRlZmF1bHQ0XCIpO1xuXG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzayk7XG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzazIpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2szKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrNCk7XG5cbiAgICBzYXZlUHJvamVjdChkZWZhdWx0UHJvamVjdCk7XG5cbiAgICByZXR1cm4gZGVmYXVsdFByb2plY3Q7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBpZiAocHJvamVjdE5hbWUgPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgYWxlcnQoXCJDYW5ub3QgZGVsZXRlIGRlZmF1bHQgcHJvamVjdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGVQcm9qZWN0U3RvcmFnZShwcm9qZWN0TmFtZSk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH0iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcblxuLy8gY2hlY2sgaWYgc3RvcmFnZSBpcyBhdmFpbGFibGVcbmZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICAgIHZhciBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgIHZhciB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxufVxuXG4vLyBhZGQgbmV3IHByb2plY3QgdG8gc3RvcmFnZVxuZnVuY3Rpb24gc2F2ZVByb2plY3QocHJvamVjdCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByb2plY3QuZ2V0TmFtZSgpLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0KSk7XG59XG5cbmZ1bmN0aW9uIGdldFNhdmVkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBsZXQgcmV0cmlldmVkT2JqZWN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgICAgIC8vIHJlY29uc3RydWN0IHByb2plY3Qgb2JqZWN0IHVzaW5nIHJldHJpZXZlZE9iamVjdCBkYXRhXG4gICAgICAgIGxldCBwcm9qID0gbmV3IFByb2plY3QoKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9qLCBKU09OLnBhcnNlKHJldHJpZXZlZE9iamVjdCkpO1xuXG4gICAgICAgIC8vIHJlY29uc3RydWN0IHRhc2sgb2JqZWN0cyB3aXRoaW4gcHJvamVjdCBvYmplY3RcbiAgICAgICAgbGV0IHRhc2tBcnJheSA9IHByb2ouZ2V0VGFza3MoKTtcbiAgICAgICAgcHJvai5yZWNvbnN0cnVjdFRhc2tzKHRhc2tBcnJheSk7XG5cbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvamVjdHM7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RTdG9yYWdlKHByb2plY3ROYW1lKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ocHJvamVjdE5hbWUpO1xufVxuXG5leHBvcnQgeyBzYXZlUHJvamVjdCwgZ2V0U2F2ZWRQcm9qZWN0cywgZGVsZXRlUHJvamVjdFN0b3JhZ2UgfSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUgPSAnTm8gZGF0ZScsIGRlc2NyaXB0aW9uID0gJycsIHByaW9yaXR5ID0gMCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGdldER1ZURhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGdldFByaW9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXREdWVEYXRlKGR1ZURhdGUpIHtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgLy8gMCA9IGxvdywgMSA9IG1lZGl1bSwgMiA9IGhpZ2hcbiAgICBzZXRQcmlvcml0eShwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemVXZWJzaXRlIGZyb20gJy4vVUknO1xuXG5pbml0aWFsaXplV2Vic2l0ZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==