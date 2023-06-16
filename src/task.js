import Project from "./project"

export default class Task {
    constructor(title,dateVal) {
        
        this.cont = document.createElement('div')
        this.cont.classList.add("task-item")
        
        this.complete = document.createElement('button')
        this.complete.classList.add('complete-task')
        this.complete.textContent = "Complete"
        this.name = document.createElement('div')
        this.name.textContent = title

        this.date = document.createElement('input')
        this.date.type = 'date'
        this.date.value = dateVal

        this.cont.appendChild(this.complete)
        this.cont.appendChild(this.name)
        this.cont.appendChild(this.date)
    }

    getContainer() {
        return this.cont
    }

    getTaskName() {
        return this.name.textContent
    }

    getDateValue() {
        return this.date.value
    }

    setProjectOwner(parent,item) {
        this.project = parent
        this.task = item
        this.complete.addEventListener('click', () =>{
            console.log(this.task.getTaskName())
            this.project.removeTask(this.task)
            this.cont.remove()
        })
    }

    setParent(parent) {
        parent.appendChild(this.cont);
    }
}