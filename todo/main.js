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

const myTodo = new ToDo();

const newText = qs(".new-task-text");
const newAddBtn = qs(".new-task-add");
const filterAll = qs(".task-filter-all");
const filterDone = qs(".task-filter-done");
const filterTodo = qs(".task-filter-todo");

myTodo.makeTaskList(getLS("Todos"));

bindTouch(newAddBtn, () => {
    myTodo.setNewStorage(myTodo.appendNewTask(myTodo.makeNewTask(newText.value)));
    newText.value = "";
    myTodo.makeTaskList(getLS("Todos"));
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
    myTodo.makeTaskList(getLS("Todos"));
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
    myTodo.makeTaskList(myTodo.showDone(getLS("Todos")));
    
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
    myTodo.makeTaskList(myTodo.showTodo(getLS("Todos")));
    
});

// makeTaskList(getLS("Todos"));

