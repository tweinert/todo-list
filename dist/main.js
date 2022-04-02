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
        if (prioritySelect.options[i].index == task.getPriority()) {
            prioritySelect.selectedIndex = i;
        }
    }

    // event onchange to change priority of task
    prioritySelect.addEventListener("change", (e) => {
        (0,_taskFunctions__WEBPACK_IMPORTED_MODULE_0__.changePriority)(task, prioritySelect.selectedIndex);
        displayWebsite(project);
    });
    
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
/* harmony export */   "changePriority": () => (/* binding */ changePriority),
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

function changePriority(task, priority) {
    task.setPriority(priority);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUU7QUFDZTtBQUMzQztBQUNuQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsMERBQWdCO0FBQzFDO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxZQUFZLGdFQUFhO0FBQ3pCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsZ0VBQWE7QUFDckI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSwwREFBVTtBQUN0QjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLDBEQUFVO0FBQ3RCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksMERBQVU7QUFDdEI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLDhEQUFjO0FBQ3RCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLDBEQUFVO0FBQ2xCO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsdUVBQW9COztBQUV4QztBQUNBOztBQUVBLGlFQUFlLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7O0FDclFOOztBQUVYO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQSw4QkFBOEIsNkNBQUk7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0NnQztBQUNOO0FBQ29DOztBQUU5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQU87O0FBRS9CLElBQUkscURBQVc7O0FBRWY7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixnREFBTzs7QUFFdEMsNEJBQTRCLDZDQUFJO0FBQ2hDLDZCQUE2Qiw2Q0FBSTtBQUNqQyw2QkFBNkIsNkNBQUk7QUFDakMsNkJBQTZCLDZDQUFJOztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHFEQUFXOztBQUVmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw4REFBb0I7QUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNnQztBQUNOOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0RBQU87QUFDOUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QzBCO0FBQ007QUFDOEI7O0FBRTlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3Qiw2Q0FBSTs7QUFFNUI7O0FBRUEsSUFBSSxxREFBVztBQUNmOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxxREFBVztBQUNmOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUN4QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQzs7QUFFckMsK0NBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVRhc2ssIGRlbGV0ZVRhc2ssIGNoYW5nZVByaW9yaXR5IH0gZnJvbSAnLi90YXNrRnVuY3Rpb25zJztcbmltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0RnVuY3Rpb25zJztcbmltcG9ydCB7IGdldFNhdmVkUHJvamVjdHMgfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcblxuZnVuY3Rpb24gZGlzcGxheVNpZGViYXIoKSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lkZWJhclwiKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGViYXJcIikucmVtb3ZlKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHNpZGViYXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgc2lkZWJhckRpdi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhclwiKTtcbiAgICBzaWRlYmFyRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2lkZWJhclwiKTtcblxuICAgIC8vIGRpc3BsYXkgcHJvamVjdHNcbiAgICBjb25zdCBzYXZlZFByb2plY3RzID0gZ2V0U2F2ZWRQcm9qZWN0cygpO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2F2ZWRQcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBjcmVhdGUgZGl2IGZvciBwcm9qZWN0QnRuIGFuZCBkZWxldGVCdG5cbiAgICAgICAgY29uc3QgYnRuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBidG5EaXYuY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5EaXZcIik7XG5cbiAgICAgICAgLy8gY3JlYXRlIHByb2plY3RCdG5cbiAgICAgICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICAgICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckJ0blwiKTtcbiAgICAgICAgcHJvamVjdEJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzYXZlZFByb2plY3RzW2ldLmdldE5hbWUoKSk7XG5cbiAgICAgICAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHNhdmVkUHJvamVjdHNbaV0uZ2V0TmFtZSgpO1xuXG4gICAgICAgIHByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShzYXZlZFByb2plY3RzW2ldKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jcmVhdGUgZGVsZXRlQnRuXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyRGVsZXRlQnRuXCIpO1xuICAgICAgICBkZWxldGVCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCkpO1xuXG4gICAgICAgIGRlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiWFwiO1xuXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3Qoc2F2ZWRQcm9qZWN0c1tpXS5nZXROYW1lKCkpO1xuICAgICAgICAgICAgZGlzcGxheVdlYnNpdGUoc2F2ZWRQcm9qZWN0c1swXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJ0bkRpdi5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gICAgICAgIHNpZGViYXJEaXYuYXBwZW5kQ2hpbGQoYnRuRGl2KTtcblxuICAgIH1cblxuICAgIC8vIG5ldyBwcm9qZWN0IGJ1dHRvblxuICAgIGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcInNpZGViYXJCdG5cIik7XG4gICAgbmV3UHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IFwibmV3IHByb2plY3QgK1wiO1xuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgdG8gY3JlYXRlIGEgbmV3IHByb2plY3Qgb24gY2xpY2tcbiAgICBuZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdChwcm9tcHQoXCJFbnRlciBwcm9qZWN0IG5hbWU6XCIpKTtcbiAgICAgICAgLy8gVE9ETyBkaXNwbGF5IG5ld2x5IGNyZWF0ZWQgcHJvamVjdFxuICAgICAgICBkaXNwbGF5V2Vic2l0ZShzYXZlZFByb2plY3RzWzBdKTtcbiAgICB9KTsgXG5cbiAgICBzaWRlYmFyRGl2LmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdG4pO1xuXG4gICAgcmV0dXJuIHNpZGViYXJEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHByb2plY3QpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0XCIpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFwiKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgIHByb2plY3REaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0XCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHlMb3dEaXYgPSBkaXNwbGF5UHJpb3JpdHkoMCwgcHJvamVjdCk7XG4gICAgY29uc3QgcHJpb3JpdHlNZWREaXYgPSBkaXNwbGF5UHJpb3JpdHkoMSwgcHJvamVjdCk7XG4gICAgY29uc3QgcHJpb3JpdHlIaWdoRGl2ID0gZGlzcGxheVByaW9yaXR5KDIsIHByb2plY3QpO1xuXG4gICAgLy8gZ2V0IGxpc3Qgb2YgdGFza3MgaW4gcHJvamVjdFxuICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKTtcblxuICAgIC8vIGZvciBlYWNoIHRhc2sgaW4gcHJvamVjdDogY2hlY2sgcHJpb3JpdHlcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcHJvamVjdFRhc2tzKSB7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBlbGVtZW50LmdldFByaW9yaXR5KCk7XG4gICAgICAgIGlmICh0YXNrUHJpb3JpdHkgPT0gMCkge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBsb3cgcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5TG93RGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUYXNrKHByb2plY3QsIGVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT0gMSkge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBtZWRpdW0gcHJpb3JpdHkgdGFza3NcbiAgICAgICAgICAgIHByaW9yaXR5TWVkRGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUYXNrKHByb2plY3QsIGVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT0gMikge1xuICAgICAgICAgICAgLy8gZGlzcGxheSBoaWdoIHByaW9yaXR5IHRhc2tzXG4gICAgICAgICAgICBwcmlvcml0eUhpZ2hEaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRhc2socHJvamVjdCwgZWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIaWdoRGl2KTtcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5TWVkRGl2KTtcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5TG93RGl2KTtcblxuICAgIHJldHVybiBwcm9qZWN0RGl2O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UHJpb3JpdHkocHJpb3JpdHksIHByb2plY3QpIHtcbiAgICBjb25zdCBwcmlvcml0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5XCIpO1xuICAgIHByaW9yaXR5RGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIHByaW9yaXR5KTtcblxuICAgIGlmIChwcmlvcml0eSA9PSAwKSB7XG4gICAgICAgIC8vIGRpc3BsYXkgbG93IHByaW9yaXR5XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5SGVhZGVyRGl2XCIpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlci50ZXh0Q29udGVudCA9IFwiTG93IFByaW9yaXR5XCI7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNyZWF0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrICtcIjtcblxuICAgICAgICAvLyBuZXcgdGFzayBldmVudCBsaXN0ZW5lclxuICAgICAgICBjcmVhdGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlVGFzayhwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShwcm9qZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnRuKTtcblxuICAgICAgICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlckRpdik7XG4gICAgfSBlbHNlIGlmIChwcmlvcml0eSA9PSAxKSB7XG4gICAgICAgIC8vIGRpc3BsYXkgbWVkaXVtIHByaW9yaXR5XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5SGVhZGVyRGl2XCIpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlci50ZXh0Q29udGVudCA9IFwiTWVkaXVtIFByaW9yaXR5XCI7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNyZWF0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrICtcIjtcblxuICAgICAgICAvLyBuZXcgdGFzayBldmVudCBsaXN0ZW5lclxuICAgICAgICBjcmVhdGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlVGFzayhwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgICAgICAgICBkaXNwbGF5V2Vic2l0ZShwcm9qZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJpb3JpdHlIZWFkZXJEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChjcmVhdGVUYXNrQnRuKTtcblxuICAgICAgICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlckRpdik7XG4gICAgICAgIFxuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT0gMikge1xuICAgICAgICAvLyBkaXNwbGF5IGhpZ2ggcHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHlIZWFkZXJEaXZcIik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIkhpZ2ggUHJpb3JpdHlcIjtcblxuICAgICAgICBjb25zdCBjcmVhdGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY3JlYXRlVGFza0J0bi50ZXh0Q29udGVudCA9IFwiTmV3IFRhc2sgK1wiO1xuXG4gICAgICAgIC8vIG5ldyB0YXNrIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVUYXNrKHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgICAgIGRpc3BsYXlXZWJzaXRlKHByb2plY3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcmlvcml0eUhlYWRlckRpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgICAgIHByaW9yaXR5SGVhZGVyRGl2LmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tCdG4pO1xuXG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyRGl2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJpb3JpdHlEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrKHByb2plY3QsIHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5nZXROYW1lKCk7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XG5cbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmdldERlc2NyaXB0aW9uKCk7XG5cbiAgICAvLyBkcm9wIGRvd24gdG8gY2hhbmdlIHByaW9yaXR5XG4gICAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHlTZWxlY3RIaWdoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBwcmlvcml0eVNlbGVjdEhpZ2gudGV4dENvbnRlbnQgPSBcIkhpZ2hcIjtcbiAgICBwcmlvcml0eVNlbGVjdEhpZ2guc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJoaWdoXCIpO1xuXG4gICAgY29uc3QgcHJpb3JpdHlTZWxlY3RNZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHByaW9yaXR5U2VsZWN0TWVkLnRleHRDb250ZW50ID0gXCJNZWRpdW1cIjtcbiAgICBwcmlvcml0eVNlbGVjdE1lZC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIm1lZGl1bVwiKTtcblxuICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0TG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBwcmlvcml0eVNlbGVjdExvdy50ZXh0Q29udGVudCA9IFwiTG93XCI7XG4gICAgcHJpb3JpdHlTZWxlY3RMb3cuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJsb3dcIik7XG5cbiAgICBwcmlvcml0eVNlbGVjdC5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdExvdyk7XG4gICAgcHJpb3JpdHlTZWxlY3QuYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3RNZWQpO1xuICAgIHByaW9yaXR5U2VsZWN0LmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0SGlnaCk7XG5cbiAgICAvLyBzZXQgZGVmYXVsdCBwcmlvcml0eSBkcm9wZG93biBvcHRpb24gdG8gY29ycmVjdCBwcmlvcml0eVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpb3JpdHlTZWxlY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByaW9yaXR5U2VsZWN0Lm9wdGlvbnNbaV0uaW5kZXggPT0gdGFzay5nZXRQcmlvcml0eSgpKSB7XG4gICAgICAgICAgICBwcmlvcml0eVNlbGVjdC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV2ZW50IG9uY2hhbmdlIHRvIGNoYW5nZSBwcmlvcml0eSBvZiB0YXNrXG4gICAgcHJpb3JpdHlTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICBjaGFuZ2VQcmlvcml0eSh0YXNrLCBwcmlvcml0eVNlbGVjdC5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgZGlzcGxheVdlYnNpdGUocHJvamVjdCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gZGVsZXRlIHRhc2sgYnV0dG9uXG4gICAgY29uc3QgdGFza0RlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGFza0RlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiRGVsZXRlIFRhc2tcIjtcblxuICAgIC8vIGRlbGV0ZSB0YXNrIGZ1bmN0aW9uIGNhbGxcbiAgICB0YXNrRGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBkZWxldGVUYXNrKHByb2plY3QsIHRhc2spO1xuICAgICAgICBkaXNwbGF5V2Vic2l0ZShwcm9qZWN0KTtcbiAgICB9KTtcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0KTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEZWxldGVCdG4pO1xuXG4gICAgcmV0dXJuIHRhc2tEaXY7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlXZWJzaXRlKHByb2plY3QpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChkaXNwbGF5U2lkZWJhcigpKTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGRpc3BsYXlQcm9qZWN0KHByb2plY3QpKTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVdlYnNpdGUoKSB7XG4gICAgY29uc3QgZGVmUHJvaiA9IGNyZWF0ZURlZmF1bHRQcm9qZWN0KCk7XG5cbiAgICBkaXNwbGF5V2Vic2l0ZShkZWZQcm9qKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhbGl6ZVdlYnNpdGU7IiwiaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSA9IFwiXCIpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIH1cblxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0VGFza3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICAgIH1cblxuICAgIHNldE5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gICAgfVxuXG4gICAgZGVsZXRlVGFzayh0YXNrTmFtZSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnRhc2tzLm1hcChmdW5jdGlvbihlKSB7IHJldHVybiBlLmdldE5hbWUoKTsgfSkuaW5kZXhPZih0YXNrTmFtZSk7XG4gICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICByZWNvbnN0cnVjdFRhc2tzKHRhc2tzKSB7XG4gICAgICAgIGxldCBuZXdUYXNrcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gY2hhbmdlIHRhc2sgaW50byB0YXNrIG9iamVjdFxuICAgICAgICAgICAgbGV0IHRhc2tPYmogPSBuZXcgVGFzaygpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0YXNrT2JqLCB0YXNrc1tpXSk7XG4gICAgICAgICAgICBuZXdUYXNrc1tpXSA9IHRhc2tPYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWxldGUgYWxsIGN1cnJlbnQgdGFza3NcbiAgICAgICAgdGFza3Muc3BsaWNlKDAsIHRhc2tzLmxlbmd0aCk7XG5cbiAgICAgICAgLy8gYWRkIGFsbCBuZXdUYXNrcyB0byB0aGlzLnRhc2tzXG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBuZXdUYXNrcykge1xuICAgICAgICAgICAgdGFza3MucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgeyBzYXZlUHJvamVjdCwgZGVsZXRlUHJvamVjdFN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuICAgIGlmIChuYW1lID09IG51bGwgfHwgbmFtZSA9PSBcIlwiKSB7XG4gICAgICAgIGFsZXJ0KFwiTmFtZSBlcnJvclwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG5cbiAgICBzYXZlUHJvamVjdChwcm9qZWN0KTtcblxuICAgIHJldHVybiBwcm9qZWN0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEZWZhdWx0UHJvamVjdCgpIHtcbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KFwiZGVmYXVsdFwiKTtcblxuICAgIGNvbnN0IGRlZmF1bHRUYXNrID0gbmV3IFRhc2soXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrMiA9IG5ldyBUYXNrKFwiZGVmYXVsdDJcIiwgXCIwMS0wMS0yMDIzXCIsIFwibm8gZGVzY3JpcHRpb25cIiwgMSk7XG4gICAgY29uc3QgZGVmYXVsdFRhc2szID0gbmV3IFRhc2soXCJkZWZhdWx0M1wiLCBcIjI0LzA2LzIzXCIsIFwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gRXRpYW0gbGFjaW5pYSwgbWFnbmEgbm9uIGFjY3Vtc2FuIGFjY3Vtc2FuLCBudWxsYSBkdWkgZXVpc21vZCB0dXJwaXMsIHZlbCBhbGlxdWV0IGp1c3RvIG1hZ25hIG5vbiBpcHN1bS4gTnVsbGEgZmFjaWxpc2kuIFByb2luIHZ1bHB1dGF0ZSB2ZWwgZGlhbSBzZWQgaWFjdWxpcy5cIiwgMik7XG4gICAgY29uc3QgZGVmYXVsdFRhc2s0ID0gbmV3IFRhc2soXCJkZWZhdWx0NFwiKTtcblxuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2spO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2syKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrMyk7XG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzazQpO1xuXG4gICAgc2F2ZVByb2plY3QoZGVmYXVsdFByb2plY3QpO1xuXG4gICAgcmV0dXJuIGRlZmF1bHRQcm9qZWN0O1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgaWYgKHByb2plY3ROYW1lID09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgIGFsZXJ0KFwiQ2Fubm90IGRlbGV0ZSBkZWZhdWx0IHByb2plY3RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgZGVsZXRlUHJvamVjdFN0b3JhZ2UocHJvamVjdE5hbWUpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVQcm9qZWN0LCBkZWxldGVQcm9qZWN0LCBjcmVhdGVEZWZhdWx0UHJvamVjdCB9IiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9wcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFzayc7XG5cbi8vIGNoZWNrIGlmIHN0b3JhZ2UgaXMgYXZhaWxhYmxlXG5mdW5jdGlvbiBzdG9yYWdlQXZhaWxhYmxlKHR5cGUpIHtcbiAgICB2YXIgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgICB2YXIgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgIGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICAgICAgKHN0b3JhZ2UgJiYgc3RvcmFnZS5sZW5ndGggIT09IDApO1xuICAgIH1cbn1cblxuLy8gYWRkIG5ldyBwcm9qZWN0IHRvIHN0b3JhZ2VcbmZ1bmN0aW9uIHNhdmVQcm9qZWN0KHByb2plY3QpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcm9qZWN0LmdldE5hbWUoKSwgSlNPTi5zdHJpbmdpZnkocHJvamVjdCkpO1xufVxuXG5mdW5jdGlvbiBnZXRTYXZlZFByb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzID0gW107XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpXG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbGV0IHJldHJpZXZlZE9iamVjdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZS5rZXkoaSkpO1xuICAgICAgICAvLyByZWNvbnN0cnVjdCBwcm9qZWN0IG9iamVjdCB1c2luZyByZXRyaWV2ZWRPYmplY3QgZGF0YVxuICAgICAgICBsZXQgcHJvaiA9IG5ldyBQcm9qZWN0KCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ocHJvaiwgSlNPTi5wYXJzZShyZXRyaWV2ZWRPYmplY3QpKTtcblxuICAgICAgICAvLyByZWNvbnN0cnVjdCB0YXNrIG9iamVjdHMgd2l0aGluIHByb2plY3Qgb2JqZWN0XG4gICAgICAgIGxldCB0YXNrQXJyYXkgPSBwcm9qLmdldFRhc2tzKCk7XG4gICAgICAgIHByb2oucmVjb25zdHJ1Y3RUYXNrcyh0YXNrQXJyYXkpO1xuXG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2plY3RzO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0U3RvcmFnZShwcm9qZWN0TmFtZSkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHByb2plY3ROYW1lKTtcbn1cblxuZXhwb3J0IHsgc2F2ZVByb2plY3QsIGdldFNhdmVkUHJvamVjdHMsIGRlbGV0ZVByb2plY3RTdG9yYWdlIH0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBkdWVEYXRlID0gJ05vIGRhdGUnLCBkZXNjcmlwdGlvbiA9ICcnLCBwcmlvcml0eSA9IDApIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBnZXREdWVEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICAgIH1cblxuICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBnZXRQcmlvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpb3JpdHk7XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0RHVlRGF0ZShkdWVEYXRlKSB7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgfVxuXG4gICAgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIC8vIDAgPSBsb3csIDEgPSBtZWRpdW0sIDIgPSBoaWdoXG4gICAgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIH1cbn0iLCJpbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgeyBzYXZlUHJvamVjdCwgZGVsZXRlUHJvamVjdFN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2socHJpb3JpdHksIHByb2plY3QpIHtcbiAgICBsZXQgbmFtZSA9IHByb21wdChcIkVudGVyIHRhc2sgbmFtZVwiKTtcbiAgICBsZXQgZHVlRGF0ZSA9IHByb21wdChcIkVudGVyIGR1ZSBkYXRlXCIpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IHByb21wdChcIkVudGVyIGRlc2NyaXB0aW9uXCIpO1xuXG4gICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKG5hbWUsIGR1ZURhdGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSk7XG5cbiAgICBwcm9qZWN0LmFkZFRhc2sobmV3VGFzayk7XG5cbiAgICBzYXZlUHJvamVjdChwcm9qZWN0KTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlVGFzayhwcm9qZWN0LCB0YXNrKSB7XG4gICAgcHJvamVjdC5kZWxldGVUYXNrKHRhc2spO1xuXG4gICAgc2F2ZVByb2plY3QocHJvamVjdCk7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5KHRhc2ssIHByaW9yaXR5KSB7XG4gICAgdGFzay5zZXRQcmlvcml0eShwcmlvcml0eSk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVRhc2ssIGRlbGV0ZVRhc2ssIGNoYW5nZVByaW9yaXR5IH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0aWFsaXplV2Vic2l0ZSBmcm9tICcuL1VJJztcblxuaW5pdGlhbGl6ZVdlYnNpdGUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=