import { qs, qsa , bindTouch } from './utilities.js';
function saveToDo(toDo) {
    // console.log(`saved`, todo);
}

export default class ToDo {
    constructor() {
        bindTouch('#newToDoButton', this.addToDo.bind(this));
    }
    listToDos(list) {

    }
    addToDo() {
        const toDoText = qs('#newToDo');
        saveToDo(toDoText.value);
        this.listToDos();
    }
    removeToDo(toDo) {

    }
    completeToDo(toDo) {

    }
    filterToDo(arg) {

    }
}