import { qs, qsa , bindTouch, getLS, setLS } from './utilities.js';


export default class ToDo {
    constructor() {

    }
    makeNewTask(text) {
        return {timestamp: Date.now(), todoText: text, completed: false};
    }
    appendNewTask(task) {
        let taskStorage = getLS("Todos");
        taskStorage.push(task);
        return taskStorage;
    }
    setNewStorage(tasklist) {
        setLS("Todos", tasklist);
    }
    makeTaskList(tasklist) {
        const taskContainer = qs(".task-list");
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
            bindTouch(btn, () => {
                this.findTaskComp(btn.dataset.taskid);
            });
        }
        let deleteBtns = qsa(".task-item-delete");
        for (let btn of deleteBtns) {
            bindTouch(btn, () => {
                this.findTaskDel(btn.dataset.taskid);
            });
        }
    }
    findTaskComp(taskId) {
        let taskStorage = getLS("Todos");
        for (let i = 0; i < taskStorage.length; i++) {
            if (taskStorage[i].timestamp == taskId) {
                taskStorage[i].completed === true ? taskStorage[i].completed = false : taskStorage[i].completed = true;
                setLS("Todos", taskStorage);
                this.makeTaskList(getLS("Todos"));
                return;
            }
        }
    }
    findTaskDel(taskId) {
        let taskStorage = getLS("Todos");
        for (let i = 0; i < taskStorage.length; i++) {
            if (taskStorage[i].timestamp == taskId) {
                taskStorage.splice(i, 1);
                setLS("Todos", taskStorage);
                this.makeTaskList(getLS("Todos"));
                return;
            }
        }
    }
    showDone(taskList) {
        let doneTasks = taskList.filter(function(task) {
            return task.completed;
        });
        return doneTasks;
    }
    showTodo(taskList) {
        let todoTasks = taskList.filter(function(task) {
            return task.completed === false;
        });
        return todoTasks;
    }

}