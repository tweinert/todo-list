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
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/task.js");





function displaySidebar() {
    const sidebarDiv = document.createElement("div");
    sidebarDiv.classList.add("sidebar");

    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList.add("sidebarBtn");
    newProjectBtn.textContent = "new project +";
    // TODO add event listener for createProject()
    // maybe use an alert for project details?

    sidebarDiv.appendChild(newProjectBtn);

    return sidebarDiv;
}

function displayProject(project) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

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

function displayMain() {
    const main = document.createElement("main");
    main.classList.add("main");
    main.setAttribute("id", "main");
    return main;
}

function initializeWebsite() {
    const content = document.getElementById("content");

    content.appendChild(displaySidebar());
    content.appendChild(displayProject((0,_projectFunctions__WEBPACK_IMPORTED_MODULE_0__.createDefaultProject)()));
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
class Project {
    constructor(name) {
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



function createProject(name) {
    const project = new _project__WEBPACK_IMPORTED_MODULE_0__["default"](name);

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

    return defaultProject;
}

function deleteProject(project) {
    // need local storage
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUF3Rjs7QUFFeEQ7QUFDTjs7QUFFMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUF1Qyx1RUFBb0I7QUFDM0Q7O0FBRUEsaUVBQWUsaUJBQWlCOzs7Ozs7Ozs7Ozs7OztBQ2pIakI7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJnQztBQUNOOztBQUUxQjtBQUNBLHdCQUF3QixnREFBTzs7QUFFL0I7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixnREFBTzs7QUFFdEMsNEJBQTRCLDZDQUFJO0FBQ2hDLDZCQUE2Qiw2Q0FBSTtBQUNqQyw2QkFBNkIsNkNBQUk7QUFDakMsNkJBQTZCLDZDQUFJOztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNCZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDeENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7O0FBRXJDLCtDQUFpQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1VJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0RnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBkZWxldGVQcm9qZWN0LCBjcmVhdGVEZWZhdWx0UHJvamVjdCB9IGZyb20gJy4vcHJvamVjdEZ1bmN0aW9ucyc7XG5cbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vcHJvamVjdCc7XG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuXG5mdW5jdGlvbiBkaXNwbGF5U2lkZWJhcigpIHtcbiAgICBjb25zdCBzaWRlYmFyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaWRlYmFyRGl2LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyXCIpO1xuXG4gICAgY29uc3QgbmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwic2lkZWJhckJ0blwiKTtcbiAgICBuZXdQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gXCJuZXcgcHJvamVjdCArXCI7XG4gICAgLy8gVE9ETyBhZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGNyZWF0ZVByb2plY3QoKVxuICAgIC8vIG1heWJlIHVzZSBhbiBhbGVydCBmb3IgcHJvamVjdCBkZXRhaWxzP1xuXG4gICAgc2lkZWJhckRpdi5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnRuKTtcblxuICAgIHJldHVybiBzaWRlYmFyRGl2O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdChwcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcblxuICAgIGNvbnN0IHByaW9yaXR5TG93RGl2ID0gZGlzcGxheVByaW9yaXR5KDApO1xuICAgIGNvbnN0IHByaW9yaXR5TWVkRGl2ID0gZGlzcGxheVByaW9yaXR5KDEpO1xuICAgIGNvbnN0IHByaW9yaXR5SGlnaERpdiA9IGRpc3BsYXlQcmlvcml0eSgyKTtcblxuICAgIC8vIGdldCBsaXN0IG9mIHRhc2tzIGluIHByb2plY3RcbiAgICBjb25zdCBwcm9qZWN0VGFza3MgPSBwcm9qZWN0LmdldFRhc2tzKCk7XG5cbiAgICAvLyBmb3IgZWFjaCB0YXNrIGluIHByb2plY3Q6IGNoZWNrIHByaW9yaXR5XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHByb2plY3RUYXNrcykge1xuICAgICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZWxlbWVudC5nZXRQcmlvcml0eSgpO1xuICAgICAgICBpZiAodGFza1ByaW9yaXR5ID09IDApIHtcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgbG93IHByaW9yaXR5IHRhc2tzXG4gICAgICAgICAgICBwcmlvcml0eUxvd0Rpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGFzayhlbGVtZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5ID09IDEpIHtcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgbWVkaXVtIHByaW9yaXR5IHRhc2tzXG4gICAgICAgICAgICBwcmlvcml0eU1lZERpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGFzayhlbGVtZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFza1ByaW9yaXR5ID09IDIpIHtcbiAgICAgICAgICAgIC8vIGRpc3BsYXkgaGlnaCBwcmlvcml0eSB0YXNrc1xuICAgICAgICAgICAgcHJpb3JpdHlIaWdoRGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUYXNrKGVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGlnaERpdik7XG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcmlvcml0eU1lZERpdik7XG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcmlvcml0eUxvd0Rpdik7XG5cbiAgICByZXR1cm4gcHJvamVjdERpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByaW9yaXR5KHByaW9yaXR5KSB7XG4gICAgY29uc3QgcHJpb3JpdHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5RGl2LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcbiAgICBwcmlvcml0eURpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwcmlvcml0eSk7XG5cbiAgICBpZiAocHJpb3JpdHkgPT0gMCkge1xuICAgICAgICAvLyBkaXNwbGF5IGxvdyBwcmlvcml0eVxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIkxvdyBQcmlvcml0eVwiO1xuICAgICAgICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWRlcik7XG4gICAgfSBlbHNlIGlmIChwcmlvcml0eSA9PSAxKSB7XG4gICAgICAgIC8vIGRpc3BsYXkgbWVkaXVtIHByaW9yaXR5XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBwcmlvcml0eUhlYWRlci50ZXh0Q29udGVudCA9IFwiTWVkaXVtIFByaW9yaXR5XCI7XG4gICAgICAgIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZGVyKTtcbiAgICAgICAgXG4gICAgfSBlbHNlIGlmIChwcmlvcml0eSA9PSAyKSB7XG4gICAgICAgIC8vIGRpc3BsYXkgaGlnaCBwcmlvcml0eVxuICAgICAgICBjb25zdCBwcmlvcml0eUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICAgICAgcHJpb3JpdHlIZWFkZXIudGV4dENvbnRlbnQgPSBcIkhpZ2ggUHJpb3JpdHlcIjtcbiAgICAgICAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBwcmlvcml0eURpdjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2sodGFzaykge1xuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gICAgXG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrLmdldE5hbWUoKTtcblxuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcblxuICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZ2V0RGVzY3JpcHRpb24oKTtcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcblxuICAgIHJldHVybiB0YXNrRGl2O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5TWFpbigpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gICAgbWFpbi5jbGFzc0xpc3QuYWRkKFwibWFpblwiKTtcbiAgICBtYWluLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibWFpblwiKTtcbiAgICByZXR1cm4gbWFpbjtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVdlYnNpdGUoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVNpZGViYXIoKSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChkaXNwbGF5UHJvamVjdChjcmVhdGVEZWZhdWx0UHJvamVjdCgpKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVXZWJzaXRlOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIH1cblxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0VGFza3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICAgIH1cblxuICAgIHNldE5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gICAgfVxuXG4gICAgZGVsZXRlVGFzayh0YXNrTmFtZSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnRhc2tzLm1hcChmdW5jdGlvbihlKSB7IHJldHVybiBlLmdldE5hbWUoKTsgfSkuaW5kZXhPZih0YXNrTmFtZSk7XG4gICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG5cbiAgICByZXR1cm4gcHJvamVjdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdFByb2plY3QoKSB7XG4gICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdChcImRlZmF1bHRcIik7XG5cbiAgICBjb25zdCBkZWZhdWx0VGFzayA9IG5ldyBUYXNrKFwiZGVmYXVsdFwiKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzazIgPSBuZXcgVGFzayhcImRlZmF1bHQyXCIsIFwiMDEtMDEtMjAyM1wiLCBcIm5vIGRlc2NyaXB0aW9uXCIsIDEpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrMyA9IG5ldyBUYXNrKFwiZGVmYXVsdDNcIiwgXCIyNC8wNi8yM1wiLCBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIEV0aWFtIGxhY2luaWEsIG1hZ25hIG5vbiBhY2N1bXNhbiBhY2N1bXNhbiwgbnVsbGEgZHVpIGV1aXNtb2QgdHVycGlzLCB2ZWwgYWxpcXVldCBqdXN0byBtYWduYSBub24gaXBzdW0uIE51bGxhIGZhY2lsaXNpLiBQcm9pbiB2dWxwdXRhdGUgdmVsIGRpYW0gc2VkIGlhY3VsaXMuXCIsIDIpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrNCA9IG5ldyBUYXNrKFwiZGVmYXVsdDRcIik7XG5cbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrKTtcbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGRlZmF1bHRUYXNrMik7XG4gICAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhkZWZhdWx0VGFzazMpO1xuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2soZGVmYXVsdFRhc2s0KTtcblxuICAgIHJldHVybiBkZWZhdWx0UHJvamVjdDtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgLy8gbmVlZCBsb2NhbCBzdG9yYWdlXG59XG5cbmV4cG9ydCB7IGNyZWF0ZVByb2plY3QsIGRlbGV0ZVByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBkdWVEYXRlID0gJ05vIGRhdGUnLCBkZXNjcmlwdGlvbiA9ICcnLCBwcmlvcml0eSA9IDApIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBnZXREdWVEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICAgIH1cblxuICAgIGdldERlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBnZXRQcmlvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpb3JpdHk7XG4gICAgfVxuXG4gICAgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0RHVlRGF0ZShkdWVEYXRlKSB7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgfVxuXG4gICAgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIC8vIDAgPSBsb3csIDEgPSBtZWRpdW0sIDIgPSBoaWdoXG4gICAgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0aWFsaXplV2Vic2l0ZSBmcm9tICcuL1VJJztcblxuaW5pdGlhbGl6ZVdlYnNpdGUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=