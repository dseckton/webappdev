import { qs, qsa , bindTouch } from './utilities.js';
function saveToDo(toDo) {
    // console.log(`saved`, todo);
}

export default class ToDo {
    constructor(listId) {
        form = qs(listId);
    }
    
    listToDos(list) {

    }
    findTask(id) {

    }
    addToDo(taskText, ) {
        // let toDoText = qs('.new-task-text').value;
        // const timestamp = Date.now();
        // const newTask = {id: timestamp, text: toDoText, completed: false};

    }
    removeToDo(toDo) {

    }
    completeToDo(id) {
    
    }
    filterToDo(arg) {

    }
    buildSingleToDo(task) {
        
    }
    buildToDoList() {
        let taskList = this.taskList;
        console.log(taskList);
        for (let task of taskList) {
            this.buildSingleToDo(task);
        }
        let checkboxes = qsa(".task-item-check");
        let deletes = qsa(".task-item-delete");
        
        for (let checkbox of checkboxes) {
            bindTouch(checkbox, this.completeToDo);
        }

    }
}