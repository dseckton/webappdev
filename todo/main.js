"use strict";
import { qs, qsa, bindTouch, getLS, setLS } from './utilities.js';
import ToDo from './todo.js';

let tasklist = [];

if (getLS("Todos")) {
    tasklist = getLS("Todos");
    console.log("Continue");
} else {
    setLS("Todos", tasklist);
    console.log("First Open")
}

const newToDo = qs('#newToDo');

// const myTodo = new ToDo();


let checkbox = qsa(".task-item-check");

// bindTouch(myTodo.addTask, myTodo.addToDo);
// myTodo.buildToDoList();

function makeNewTask(text) {
    return {timestamp: Date.now(), todoText: text, completed: false};
}

function appendNewTask(task) {
    let taskStorage = getLS("Todos");
    taskStorage.push(task);
    return taskStorage;
}

function setNewStorage(tasklist) {
    setLS("Todos", tasklist);
}

function makeTaskList(tasklist) {
    taskContainer.innerHTML = "";
    for (let task of tasklist) {
        let check = "";
        let checkClass = ""
        if (task.completed) { check = "✔"; checkClass = "task-done" }
        taskContainer.innerHTML += `
            <fieldset class="task-item">
                <button type="button" class="task-item-check" data-taskid="${task.timestamp}">${check}</button>
                <label for="" class="task-item-text ${checkClass}">${task.todoText}</label>
                <button type="button" class="task-item-delete" data-taskid="${task.timestamp}">✖</button>
            </fieldset>
        `
    }
    let completeBtns = qsa(".task-item-check");
    for (let btn of completeBtns) {
        bindTouch(btn, function() {
            findTaskComp(btn.dataset.taskid);
        });
    }
    let deleteBtns = qsa(".task-item-delete");
    for (let btn of deleteBtns) {
        bindTouch(btn, function() {
            findTaskDel(btn.dataset.taskid)
        });
    }
}

function findTaskComp(taskId) {
    let taskStorage = getLS("Todos");
    for (let i = 0; i < taskStorage.length; i++) {
        if (taskStorage[i].timestamp == taskId) {
            taskStorage[i].completed === true ? taskStorage[i].completed = false : taskStorage[i].completed = true;
            setLS("Todos", taskStorage);
            makeTaskList(getLS("Todos"));
            return;
        }
    }
}

function findTaskDel(taskId) {
    let taskStorage = getLS("Todos");
    for (let i = 0; i < taskStorage.length; i++) {
        if (taskStorage[i].timestamp == taskId) {
            taskStorage.splice(i, 1);
            setLS("Todos", taskStorage);
            makeTaskList(getLS("Todos"));
            return;
        }
    }
}

function showDone(taskList) {
    let doneTasks = taskList.filter(function(task) {
        return task.completed;
    });
    console.log(doneTasks);
    return doneTasks;
}

function showTodo(taskList) {
    let todoTasks = taskList.filter(function(task) {
        return task.completed === false;
    });
    console.log(todoTasks);
    return todoTasks;
}

const newText = qs(".new-task-text");
const newAddBtn = qs(".new-task-add");
const taskContainer = qs(".task-list");
const filterAll = qs(".task-filter-all");
const filterDone = qs(".task-filter-done");
const filterTodo = qs(".task-filter-todo");


bindTouch(newAddBtn, function() {
    setNewStorage(appendNewTask(makeNewTask(newText.value)));
    newText.value = "";
    makeTaskList(getLS("Todos"));
});

bindTouch(filterAll, function() {
    if (filterAll.classList.contains("selected")) {
        return;
    } else {
        filterAll.classList.add("selected");
    }
    if (filterDone.classList.contains("selected") || filterTodo.classList.contains("selected")) {
        filterDone.classList.remove("selected");
        filterTodo.classList.remove("selected");
    }
    makeTaskList(getLS("Todos"));
});

bindTouch(filterDone, function() {
    if (filterDone.classList.contains("selected")) {
        return;
    } else {
        filterDone.classList.add("selected");
    }
    if (filterAll.classList.contains("selected") || filterTodo.classList.contains("selected")) {
        filterAll.classList.remove("selected");
        filterTodo.classList.remove("selected");
    }
    makeTaskList(showDone(getLS("Todos")));
    
});

bindTouch(filterTodo, function() {
    if (filterTodo.classList.contains("selected")) {
        return;
    } else {
        filterTodo.classList.add("selected");
    }
    if (filterDone.classList.contains("selected") || filterAll.classList.contains("selected")) {
        filterDone.classList.remove("selected");
        filterAll.classList.remove("selected");
    }
    makeTaskList(showTodo(getLS("Todos")));
    
});

makeTaskList(getLS("Todos"));

