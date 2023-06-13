import Task from "./task"

export default class Project {
    constructor(title) {
        this.tasks = []

        this.project = document.createElement('button')
        this.project.classList.add("project-btn")
        
        this.name = document.createElement('div')
        this.name.textContent = title

        this.complete = document.createElement('button')
        this.complete.textContent = " X "
        this.complete.addEventListener('click', () =>{
            this.project.remove()
        })

        this.project.appendChild(this.name)
        this.project.appendChild(this.complete)
        
    }

    getName() {
        return this.name
    }

    getButton() {
        return this.project
    }

    setParent(parent) {
        parent.appendChild(this.project);
    }

    createTaskElements(list) {
        if(this.tasks != null)
        {
            list.textContent = ""
            for(let task in this.tasks){
                // allow creation of tasks so we can populate 
                // when switching sidebar tabs
                list.appendChild(this.tasks[task].getContainer())
            }
        }
        
    }

    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task)
        if(index !== -1) {
            this.tasks.splice(index,1)
        }
    }
}