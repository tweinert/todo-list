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

function displayWebsite(project) {
    // if project not given, use previous project
    

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUN4Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQzs7QUFFckMsK0NBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0RnVuY3Rpb25zJztcbmltcG9ydCB7IGdldFNhdmVkUHJvamVjdHMgfSBmcm9tICcuL3N0b3JhZ2UnO1xuXG5mdW5jdGlvbiBkaXNwbGF5U2lkZWJhcigpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlYmFyXCIpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lkZWJhclwiKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2lkZWJhckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBzaWRlYmFyRGl2LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyXCIpO1xuICAgIHNpZGViYXJEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzaWRlYmFyXCIpO1xuXG4gICAgLy8gZGlzcGxheSBwcm9qZWN0c1xuICAgIGNvbnN0IHNhdmVkUHJvamVjdHMgPSBnZXRTYXZlZFByb2plY3RzKCk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYXZlZFByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBkaXYgZm9yIHByb2plY3RCdG4gYW5kIGRlbGV0ZUJ0blxuICAgICAgICBjb25zdCBidG5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIGJ0bkRpdi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckJ0bkRpdlwiKTtcblxuICAgICAgICAvLyBjcmVhdGUgcHJvamVjdEJ0blxuICAgICAgICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgICAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyQnRuXCIpO1xuICAgICAgICBwcm9qZWN0QnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNhdmVkUHJvamVjdHNbaV0uZ2V0TmFtZSgpKTtcblxuICAgICAgICBwcm9qZWN0QnRuLnRleHRDb250ZW50ID0gc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCk7XG5cbiAgICAgICAgcHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGRpc3BsYXlXZWJzaXRlKHNhdmVkUHJvamVjdHNbaV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2NyZWF0ZSBkZWxldGVCdG5cbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInNpZGViYXJEZWxldGVCdG5cIik7XG4gICAgICAgIGRlbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKSk7XG5cbiAgICAgICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCJYXCI7XG5cbiAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlUHJvamVjdChzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKSk7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShzYXZlZFByb2plY3RzWzBdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xuICAgICAgICBidG5EaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcbiAgICAgICAgc2lkZWJhckRpdi5hcHBlbmRDaGlsZChidG5EaXYpO1xuXG4gICAgfVxuXG4gICAgLy8gbmV3IHByb2plY3QgYnV0dG9uXG4gICAgY29uc3QgbmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckJ0blwiKTtcbiAgICBuZXdQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gXCJuZXcgcHJvamVjdCArXCI7XG5cbiAgICAvLyBldmVudCBsaXN0ZW5lciB0byBjcmVhdGUgYSBuZXcgcHJvamVjdCBvbiBjbGlja1xuICAgIG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjcmVhdGVQcm9qZWN0KHByb21wdChcIkVudGVyIHByb2plY3QgbmFtZTpcIikpO1xuICAgICAgICAvLyBUT0RPIGRpc3BsYXkgbmV3bHkgY3JlYXRlZCBwcm9qZWN0XG4gICAgICAgIGRpc3BsYXlXZWJzaXRlKHNhdmVkUHJvamVjdHNbMF0pO1xuICAgIH0pOyBcblxuICAgIHNpZGViYXJEaXYuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ0bik7XG5cbiAgICByZXR1cm4gc2lkZWJhckRpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIikpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XG4gICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RcIik7XG5cbiAgICBjb25zdCBwcmlvcml0eUxvd0RpdiA9IGRpc3BsYXlQcmlvcml0eSgwKTtcbiAgICBjb25zdCBwcmlvcml0eU1lZERpdiA9IGRpc3BsYXlQcmlvcml0eSgxKTtcbiAgICBjb25zdCBwcmlvcml0eUhpZ2hEaXYgPSBkaXNwbGF5UHJpb3JpdHkoMik7XG5cbiAgICAvLyBnZXQgbGlzdCBvZiB0YXNrcyBpbiBwcm9qZWN0XG4gICAgY29uc3QgcHJvamVjdFRhc2tzID0gcHJvamVjdC5nZXRUYXNrcygpO1xuXG4gICAgLy8gZm9yIGVhY2ggdGFzayBpbiBwcm9qZWN0OiBjaGVjayBwcmlvcml0eVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwcm9qZWN0VGFza3MpIHtcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGVsZW1lbnQuZ2V0UHJpb3JpdHkoKTtcbiAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA9PSAwKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IGxvdyBwcmlvcml0eSB0YXNrc1xuICAgICAgICAgICAgcHJpb3JpdHlMb3dEaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2soZWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eSA9PSAxKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IG1lZGl1bSBwcmlvcml0eSB0YXNrc1xuICAgICAgICAgICAgcHJpb3JpdHlNZWREaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2soZWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eSA9PSAyKSB7XG4gICAgICAgICAgICAvLyBkaXNwbGF5IGhpZ2ggcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5SGlnaERpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGFzayhlbGVtZW50KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhpZ2hEaXYpO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlNZWREaXYpO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlMb3dEaXYpO1xuXG4gICAgcmV0dXJuIHByb2plY3REaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcmlvcml0eShwcmlvcml0eSkge1xuICAgIGNvbnN0IHByaW9yaXR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eURpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlcIik7XG4gICAgcHJpb3JpdHlEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJpb3JpdHkpO1xuXG4gICAgaWYgKHByaW9yaXR5ID09IDApIHtcbiAgICAgICAgLy8gZGlzcGxheSBsb3cgcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyLnRleHRDb250ZW50ID0gXCJMb3cgUHJpb3JpdHlcIjtcbiAgICAgICAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXIpO1xuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT0gMSkge1xuICAgICAgICAvLyBkaXNwbGF5IG1lZGl1bSBwcmlvcml0eVxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIk1lZGl1bSBQcmlvcml0eVwiO1xuICAgICAgICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgICAgIFxuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT0gMikge1xuICAgICAgICAvLyBkaXNwbGF5IGhpZ2ggcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyLnRleHRDb250ZW50ID0gXCJIaWdoIFByaW9yaXR5XCI7XG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJpb3JpdHlEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5nZXROYW1lKCk7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XG5cbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmdldERlc2NyaXB0aW9uKCk7XG5cbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdGFza0Rpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVdlYnNpdGUocHJvamVjdCkge1xuICAgIC8vIGlmIHByb2plY3Qgbm90IGdpdmVuLCB1c2UgcHJldmlvdXMgcHJvamVjdFxuICAgIFxuXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVNpZGViYXIoKSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChkaXNwbGF5UHJvamVjdChwcm9qZWN0KSk7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVXZWJzaXRlKCkge1xuICAgIGNvbnN0IGRlZlByb2ogPSBjcmVhdGVEZWZhdWx0UHJvamVjdCgpO1xuXG4gICAgZGlzcGxheVdlYnNpdGUoZGVmUHJvaik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVXZWJzaXRlOyIsImltcG9ydCBUYXNrIGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSBcIlwiKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGdldFRhc2tzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgICB9XG5cbiAgICBzZXROYW1lKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIGRlbGV0ZVRhc2sodGFza05hbWUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy50YXNrcy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5nZXROYW1lKCk7IH0pLmluZGV4T2YodGFza05hbWUpO1xuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgcmVjb25zdHJ1Y3RUYXNrcyh0YXNrcykge1xuICAgICAgICBsZXQgbmV3VGFza3MgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIGNoYW5nZSB0YXNrIGludG8gdGFzayBvYmplY3RcbiAgICAgICAgICAgIGxldCB0YXNrT2JqID0gbmV3IFRhc2soKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGFza09iaiwgdGFza3NbaV0pO1xuICAgICAgICAgICAgbmV3VGFza3NbaV0gPSB0YXNrT2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVsZXRlIGFsbCBjdXJyZW50IHRhc2tzXG4gICAgICAgIHRhc2tzLnNwbGljZSgwLCB0YXNrcy5sZW5ndGgpO1xuXG4gICAgICAgIC8vIGFkZCBhbGwgbmV3VGFza3MgdG8gdGhpcy50YXNrc1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgbmV3VGFza3MpIHtcbiAgICAgICAgICAgIHRhc2tzLnB1c2goZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IHsgc2F2ZVByb2plY3QsIGRlbGV0ZVByb2plY3RTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PSBudWxsIHx8IG5hbWUgPT0gXCJcIikge1xuICAgICAgICBhbGVydChcIk5hbWUgZXJyb3JcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuXG4gICAgc2F2ZVByb2plY3QocHJvamVjdCk7XG5cbiAgICByZXR1cm4gcHJvamVjdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdFByb2plY3QoKSB7XG4gICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdChcImRlZmF1bHRcIik7XG5cbiAgICBjb25zdCBkZWZhdWx0VGFzayA9IG5ldyBUYXNrKFwiZGVmYXVsdFwiKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazIgPSBuZXcgVGFzayhcImRlZmF1bHQyXCIsIFwiMDEtMDEtMjAyM1wiLCBcIm5vIGRlc2NyaXB0aW9uXCIsIDEpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrMyA9IG5ldyBUYXNrKFwiZGVmYXVsdDNcIiwgXCIyNC8wNi8yM1wiLCBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIEV0aWFtIGxhY2luaWEsIG1hZ25hIG5vbiBhY2N1bXNhbiBhY2N1bXNhbiwgbnVsbGEgZHVpIGV1aXNtb2QgdHVycGlzLCB2ZWwgYWxpcXVldCBqdXN0byBtYWduYSBub24gaXBzdW0uIE51bGxhIGZhY2lsaXNpLiBQcm9pbiB2dWxwdXRhdGUgdmVsIGRpYW0gc2VkIGlhY3VsaXMuXCIsIDIpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrNCA9IG5ldyBUYXNrKFwiZGVmYXVsdDRcIik7XG5cbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrMik7XG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzazMpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2s0KTtcblxuICAgIHNhdmVQcm9qZWN0KGRlZmF1bHRQcm9qZWN0KTtcblxuICAgIHJldHVybiBkZWZhdWx0UHJvamVjdDtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGlmIChwcm9qZWN0TmFtZSA9PSBcImRlZmF1bHRcIikge1xuICAgICAgICBhbGVydChcIkNhbm5vdCBkZWxldGUgZGVmYXVsdCBwcm9qZWN0XCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbGV0ZVByb2plY3RTdG9yYWdlKHByb2plY3ROYW1lKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdCwgZGVsZXRlUHJvamVjdCwgY3JlYXRlRGVmYXVsdFByb2plY3QgfSIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vcHJvamVjdCc7XG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuXG4vLyBjaGVjayBpZiBzdG9yYWdlIGlzIGF2YWlsYWJsZVxuZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG4gICAgdmFyIHN0b3JhZ2U7XG4gICAgdHJ5IHtcbiAgICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgICAgdmFyIHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgICAgIChzdG9yYWdlICYmIHN0b3JhZ2UubGVuZ3RoICE9PSAwKTtcbiAgICB9XG59XG5cbi8vIGFkZCBuZXcgcHJvamVjdCB0byBzdG9yYWdlXG5mdW5jdGlvbiBzYXZlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHJvamVjdC5nZXROYW1lKCksIEpTT04uc3RyaW5naWZ5KHByb2plY3QpKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2F2ZWRQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKVxuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGxldCByZXRyaWV2ZWRPYmplY3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKTtcbiAgICAgICAgLy8gcmVjb25zdHJ1Y3QgcHJvamVjdCBvYmplY3QgdXNpbmcgcmV0cmlldmVkT2JqZWN0IGRhdGFcbiAgICAgICAgbGV0IHByb2ogPSBuZXcgUHJvamVjdCgpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHByb2osIEpTT04ucGFyc2UocmV0cmlldmVkT2JqZWN0KSk7XG5cbiAgICAgICAgLy8gcmVjb25zdHJ1Y3QgdGFzayBvYmplY3RzIHdpdGhpbiBwcm9qZWN0IG9iamVjdFxuICAgICAgICBsZXQgdGFza0FycmF5ID0gcHJvai5nZXRUYXNrcygpO1xuICAgICAgICBwcm9qLnJlY29uc3RydWN0VGFza3ModGFza0FycmF5KTtcblxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2opO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9qZWN0cztcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdFN0b3JhZ2UocHJvamVjdE5hbWUpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShwcm9qZWN0TmFtZSk7XG59XG5cbmV4cG9ydCB7IHNhdmVQcm9qZWN0LCBnZXRTYXZlZFByb2plY3RzLCBkZWxldGVQcm9qZWN0U3RvcmFnZSB9IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgZHVlRGF0ZSA9ICdObyBkYXRlJywgZGVzY3JpcHRpb24gPSAnJywgcHJpb3JpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIH1cblxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0RHVlRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaW9yaXR5O1xuICAgIH1cblxuICAgIHNldE5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHNldER1ZURhdGUoZHVlRGF0ZSkge1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIH1cblxuICAgIHNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICAvLyAwID0gbG93LCAxID0gbWVkaXVtLCAyID0gaGlnaFxuICAgIHNldFByaW9yaXR5KHByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdGlhbGl6ZVdlYnNpdGUgZnJvbSAnLi9VSSc7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9