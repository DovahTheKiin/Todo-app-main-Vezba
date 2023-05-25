const checkbox = document.querySelectorAll(".todo-task-checkbox");
const taskDescription = document.querySelectorAll(".todo-task-description")
const todoTaskItem = document.querySelectorAll(".todo-task")
const lightDarkThemeBtn = document.querySelector(".light-dark-mode")
const darkThemeIcon = document.querySelector(".dark-mode-icon")
const lightThemeIcon = document.querySelector(".light-mode-icon")
const body = document.body;
const taskFilter = document.querySelector(".task-filter")
const taskFilterLi = document.querySelectorAll(".task-filter > li")
const removeTaskBtn = document.querySelectorAll(".remove-task-btn")
const completedTask = document.querySelector(".completed-tasks")

// DARK THEME

const bg = document.querySelector(".bg")
const createTask = document.querySelector(".create-task")
const todoList = document.querySelector(".todo-list")
const createToDo = document.querySelector(".create-todo")
const taskCount = document.querySelector(".task-count")
const footer = document.querySelector(".footer")
const textInput = document.querySelector(".create-todo-name")
const taskLeftP = document.querySelector(".tasks-left")
const clearBtn = document.querySelector(".clear-btn")
const footerListItems = document.querySelectorAll(".footer > ul > li")
const dragAndDrop = document.querySelector(".drag-and-drop")
const desktopTasksLeft = document.querySelector(".desktop-tasks-left")
const desktopClearBtn = document.querySelector(".desktop-clear-btn")

let taskTitle;
let taskArray = [1,2,3,4,5,6];
let activeArray = [1,2,3,4,5,6];
let completedArray = [];

document.addEventListener('click', function (event) {
	if (event.target.matches('.todo-task-checkbox')) { 
        const taskParent = event.target.parentNode.parentNode;
        const taskParentP = taskParent.querySelector(".todo-task-description");
        if(lightThemeIcon.classList.contains("hidden") && event.target.checked) {
                taskParentP.classList.add("line-through");
        } else if (lightThemeIcon.classList.contains("hidden") && !event.target.checked) {
                taskParentP.classList.remove("line-through");
        } else if(!lightThemeIcon.classList.contains("hidden") && event.target.checked) {
                taskParentP.classList.add("line-through-dark");
        } else if(!lightThemeIcon.classList.contains("hidden") && !event.target.checked) {
                taskParentP.classList.remove("line-through-dark");
        }
	}
})
document.addEventListener('mouseover', function (event) {
        if (event.target.matches('.todo-task')) {
                const todoTask = event.target.querySelector(".remove-task-btn")
                todoTask.classList.add("visible");
        } 
})
document.addEventListener('mouseout', function (event) {
        if (event.target.matches('.todo-task')) {
                const todoTask = event.target.querySelector(".remove-task-btn")
                todoTask.classList.remove("visible");
        } 
})
lightDarkThemeBtn.addEventListener('click', () => {

        const todoTaskItemLul = document.querySelectorAll(".todo-task")
        const checkboxLul = document.querySelectorAll(".todo-task-checkbox")
        const checkboxWrapper = document.querySelectorAll(".checkbox-wrapper")
        const taskDescriptionLul = document.querySelectorAll(".todo-task-description") 

        darkThemeIcon.classList.toggle("hidden");
        lightThemeIcon.classList.toggle("hidden");
        body.classList.toggle("body-dark");
        bg.classList.toggle("bg-dark");
        createTask.classList.toggle("main-dark-bg");
        todoList.classList.toggle("main-dark-bg");
        todoList.classList.toggle("box-shadow-none");
        createToDo.classList.toggle("dark-checkbox")
        for(let i=0;i<todoTaskItemLul.length;i++) {
                todoTaskItemLul[i].classList.toggle("bottom-border-dark");
                checkboxLul[i].classList.toggle("dark-checkbox");
        }
        for(let wrapper of checkboxWrapper) {
                wrapper.classList.toggle("checkbox-wrapper-dark");
        }
        taskCount.classList.toggle("main-dark-bg");
        taskCount.classList.toggle("box-shadow-none");
        footer.classList.toggle("main-dark-bg");
        textInput.classList.toggle("main-dark-bg");
        textInput.classList.toggle("input");
        textInput.classList.toggle("dark-task-text");
        taskLeftP.classList.toggle("dark-footer-text");
        clearBtn.classList.toggle("dark-footer-text");
        for(let item of footerListItems) {
                item.classList.toggle("dark-footer-text");
                item.classList.toggle("footer-dark");
        }
        for(let task of taskDescriptionLul) {
                task.classList.toggle("dark-task-text");
                if(task.classList.contains("line-through-dark") && !task.classList.contains("line-through")) {
                        task.classList.remove("line-through-dark");
                        task.classList.add("line-through");
                } else if(!task.classList.contains("line-through-dark") && task.classList.contains("line-through")){
                        task.classList.remove("line-through"); 
                        task.classList.add("line-through-dark");
                }
        }
        dragAndDrop.classList.toggle("dark-footer-text");
        desktopTasksLeft.classList.toggle("dark-footer-text");
        desktopClearBtn.classList.toggle("dark-footer-text");
        desktopClearBtn.classList.toggle("footer-dark");
})
const clickHandler = (ev) => {
        for (const btn of taskFilterLi) {
                if (btn === ev.target && !btn.classList.contains("active")) {
                        btn.classList.add("active");
                } else if (btn === ev.target && btn.classList.contains("active")) {
                        btn.classList.add("active");
                } else {
                        btn.classList.remove("active");
                }
        }
}
taskFilter.addEventListener("click", clickHandler);

let indexOfDiv;
todoList.addEventListener('click', function (event) {
	if (event.target.matches('.todo-task-checkbox')) {
                if(event.target.checked === true) {
                        event.target.parentNode.parentNode.classList.add("completed")
                        event.target.parentNode.parentNode.classList.remove("not-completed")
                        completedArray.push(Number(event.target.parentNode.parentNode.dataset.id));
                        if(activeArray.length>1) {
                                if(activeArray.includes(Number(event.target.parentNode.parentNode.dataset.id))) {
                                        let index = activeArray.indexOf(Number(event.target.parentNode.parentNode.dataset.id));
                                        console.log(index)
                                        if(index === 0) {
                                                activeArray.shift();
                                        } else {
                                                activeArray.splice(index, index);
                                        }
                                }
                        } else {
                                activeArray.shift();
                        }
                } else {
                        event.target.parentNode.parentNode.classList.remove("completed")
                        event.target.parentNode.parentNode.classList.add("not-completed")
                        activeArray.push(Number(event.target.parentNode.parentNode.dataset.id));
                        if(completedArray.length>1) {
                                if(completedArray.includes(Number(event.target.parentNode.parentNode.dataset.id))) {
                                        let index = completedArray.indexOf(Number(event.target.parentNode.parentNode.dataset.id));
                                        completedArray.splice(index, index);
                                }
                        } else {
                                completedArray.shift();
                        }
                }
        }
        if (event.target.matches('.remove-btn-img')) {
                event.target.parentNode.parentNode.classList.add("hidden-animation");
                setTimeout(() => {
                        event.target.parentNode.parentNode.remove();
                      }, 420);
                const findLul = document.querySelectorAll(".remove-btn-img")
                let targetLul = event.target;
                let list_items = Array.from(findLul);
                indexOfDiv = list_items.indexOf(targetLul);
                findLul.forEach( e => {
                        let targetLulLul = e;
                        let list_itemsLul = Array.from(findLul);
                        let indexOfDivLulLul = list_itemsLul.indexOf(targetLulLul);
                        if(indexOfDivLulLul > indexOfDiv) {
                                targetLulLul.parentNode.parentNode.dataset.id = Number(targetLulLul.parentNode.parentNode.dataset.id) - 1;
                        }
                })
                const todoTaskItemCounter = document.querySelectorAll(".todo-task")
                indexCount = todoTaskItemCounter.length;
        }
})
taskFilter.addEventListener('click', function (event) {
        const todoTaskItemNew = document.querySelectorAll(".todo-task")
        if (event.target.matches('.all-tasks')) {
                for(let i=0;i<todoTaskItemNew.length;i++) {
                        if(todoTaskItemNew[i].classList.contains("not-completed") || todoTaskItemNew[i].classList.contains("completed")) {
                                todoTaskItemNew[i].classList.remove("hidden");
                        }
                }
        }
	if (event.target.matches('.active-tasks')) {
                for(let i=0;i<todoTaskItemNew.length;i++) {
                        if(!todoTaskItemNew[i].classList.contains("not-completed")) {
                                todoTaskItemNew[i].classList.add("hidden");
                        } else {
                                todoTaskItemNew[i].classList.remove("hidden");
                        }
                }
        }
        if (event.target.matches('.completed-tasks')) {
                for(let i=0;i<todoTaskItemNew.length;i++) {
                        if(todoTaskItemNew[i].classList.contains("not-completed")) {
                                todoTaskItemNew[i].classList.add("hidden");
                        } else {
                                todoTaskItemNew[i].classList.remove("hidden");
                        }
                }
        }
        if (event.target.matches('.completed-tasks')) {
                for(let i=0;i<todoTaskItemNew.length;i++) {
                        if(todoTaskItemNew[i].classList.contains("not-completed")) {
                                todoTaskItemNew[i].classList.add("hidden");
                        } else {
                                todoTaskItemNew[i].classList.remove("hidden");
                        }
                }
        }
})
document.addEventListener('click', function (event) {
        const todoTaskItemNew = document.querySelectorAll(".todo-task")

        if (event.target.matches('.clear-btn')) {
                for(let i=0;i<todoTaskItemNew.length;i++) {
                        if(todoTaskItemNew[i].classList.contains("completed")) {
                                todoTaskItemNew[i].classList.add("hidden-animation");
                                setTimeout(() => {
                                        todoTaskItemNew[i].remove();
                                }, 420);
                        }
                }    
        }
})
let indexCount = todoTaskItem.length + 1;
createToDo.addEventListener('click', () => {
        setTimeout(() => {
                createToDo.checked = false;
              }, 100);
        taskTitle = textInput.value;
        let appendTask;
        appendTask = document.createElement('div');
        appendTask.classList.add("todo-task");
        appendTask.classList.add("bottom-border");
        appendTask.classList.add("not-completed");
        appendTask.setAttribute("data-id", `${indexCount}`);
        appendTask.setAttribute("draggable", "true");
        if((taskTitle !== '') && (lightThemeIcon.classList.contains('hidden')) && (!completedTask.classList.contains('active'))) {
                appendTask.innerHTML += `
                        <div class="checkbox-wrapper">
                                <input type="checkbox" class="todo-task-checkbox" name="todo-task-checkbox">
                        </div>
                                <p class="todo-task-description">${taskTitle}</p>
                        <button class="remove-task-btn">
                                <img src="images/icon-cross.svg" alt="Remove Icon" class="remove-btn-img">
                        </button>
                `;
                todoList.appendChild(appendTask);
                const todoTaskItemCounter = document.querySelectorAll(".todo-task")
                indexCount = todoTaskItemCounter.length + 1;
        } else if(taskTitle !== '' && darkThemeIcon.classList.contains("hidden") && (!completedTask.classList.contains('active'))) {
                appendTask.classList.add("bottom-border-dark");
                appendTask.innerHTML += `
                        <div class="checkbox-wrapper checkbox-wrapper-dark">
                                <input type="checkbox" class="todo-task-checkbox dark-checkbox" name="todo-task-checkbox">
                        </div>
                        <p class="todo-task-description dark-task-text">${taskTitle}</p>
                        <button class="remove-task-btn">
                                <img src="images/icon-cross.svg" alt="Remove Icon" class="remove-btn-img">
                        </button>
                `;
                todoList.appendChild(appendTask);
                const todoTaskItemCounter = document.querySelectorAll(".todo-task")
                indexCount = todoTaskItemCounter.length + 1;
        }
})
document.addEventListener('keypress', (e) => {
        if(textInput === document.activeElement && e.key === "Enter") {
                taskTitle = textInput.value;
                let appendTask;
                appendTask = document.createElement('div');
                appendTask.classList.add("todo-task");
                appendTask.classList.add("bottom-border");
                appendTask.classList.add("not-completed");
                appendTask.setAttribute("data-id", `${indexCount}`);
                appendTask.setAttribute("draggable", "true");
                if((taskTitle !== '') && (lightThemeIcon.classList.contains('hidden')) && (!completedTask.classList.contains('active'))) {
                        appendTask.innerHTML += `
                                <div class="checkbox-wrapper">
                                        <input type="checkbox" class="todo-task-checkbox" name="todo-task-checkbox">
                                </div>
                                        <p class="todo-task-description">${taskTitle}</p>
                                <button class="remove-task-btn">
                                        <img src="images/icon-cross.svg" alt="Remove Icon" class="remove-btn-img">
                                </button>
                        `;
                        todoList.appendChild(appendTask);
                        const todoTaskItemCounter = document.querySelectorAll(".todo-task")
                        indexCount = todoTaskItemCounter.length + 1;
                } else if(taskTitle !== '' && darkThemeIcon.classList.contains("hidden") && (!completedTask.classList.contains('active'))) {
                        appendTask.classList.add("bottom-border-dark");
                        appendTask.innerHTML += `
                                <div class="checkbox-wrapper checkbox-wrapper-dark">
                                        <input type="checkbox" class="todo-task-checkbox dark-checkbox" name="todo-task-checkbox">
                                </div>
                                <p class="todo-task-description dark-task-text">${taskTitle}</p>
                                <button class="remove-task-btn">
                                        <img src="images/icon-cross.svg" alt="Remove Icon" class="remove-btn-img">
                                </button>
                        `;
                        todoList.appendChild(appendTask);
                        const todoTaskItemCounter = document.querySelectorAll(".todo-task")
                        indexCount = todoTaskItemCounter.length + 1;
                } 
        }
})
let itemOne;
let itemTwo;
document.addEventListener('dragstart', function (event) {
	if (event.target.matches('.todo-task')) {
                itemOne = event.target;
        }
})

document.addEventListener('dragenter', function (event) {
	if (event.target.matches('.todo-task')) {
                if(lightThemeIcon.classList.contains('hidden')) {
                        event.target.classList.add("over");
                }
                if(darkThemeIcon.classList.contains("hidden")) {
                        event.target.classList.add("over-dark");
                }
        }
})

document.addEventListener('dragleave', function (event) {
	if (event.target.matches('.todo-task')) {
                event.target.classList.remove("over");
                event.target.classList.remove("over-dark");
        }
})

document.addEventListener('dragover', function (event) {
	if (event.target.matches('.todo-task')) {
                event.preventDefault();
        }
})

document.addEventListener('drop', function (event) {
	if (event.target.matches('.todo-task')) {
                itemTwo = event.target;
                insertAfter();

                event.target.classList.remove("over");
                event.target.classList.remove("over-dark");
                
        }
})

function insertAfter() {
        let itemOneId;
        let itemTwoId;
        console.log(itemOne, itemTwo);
        // if(Number(itemOne.getAttribute("data-id")) > Number(itemTwo.getAttribute("data-id"))) {
                // itemOneId = itemTwo.dataset.id;
                // itemTwoId = itemOne.dataset.id;
                // console.log(itemOneId, itemTwoId)
                // itemOne.dataset.id = itemTwoId;
                // itemTwo.setAttribute("data-id", `${itemOneId}`)
                // itemTwo.dataset.id = itemOneId;
                // itemOne.dataset.id = itemTwoId;
                itemTwo.after(itemOne);
        // } 
        // else if (Number(itemOne.getAttribute("data-id")) < Number(itemTwo.getAttribute("data-id"))) {
        //         itemOneId = Number(itemOne.getAttribute("data-id"));
        //         itemTwoId = Number(itemTwo.getAttribute("data-id"));
        //         itemOne.setAttribute("data-id", `${itemTwoId}`)
        //         itemTwo.setAttribute("data-id", `${itemOneId}`)
        //         itemOne.after(itemTwo);
        // }
}