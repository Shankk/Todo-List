import Task from "./task"
class ProjectManager {
    constructor() {
        this.list = []
        this.index = ""
    }

    getIndex() {
        return this.index
    }

    setIndex(project) {
        this.index = project
    }

    addProject(project) {
        this.list.push(project)
    }

    removeProject(project) {
        const index = this.list.indexOf(project)
        if(index !== -1) {
            this.list.splice(index,1)
        }
        else {
            console.log("Project Already Deleted or Dosent Exist.")
        }
    }
}

class Project {
    constructor(title) {
        this.tasks = []

        this.project = document.createElement('button')
        this.project.classList.add("sidebar-btn")
        this.project.id = "project-btn"
        
        this.name = document.createElement('div')
        this.name.textContent = title
        
        this.project.appendChild(this.name)
        
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

    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task)
        if(index !== -1) {
            this.tasks.splice(index,1)
        }
        else {
            console.log("Task Already Deleted or Dosent Exist.")
        }
    }

    createDeleteButton(list,item) {
        this.list = list
        this.item = item
        this.complete = document.createElement('button')
        this.complete.classList.add('complete-side')
        this.complete.textContent = " X "
        this.complete.addEventListener('click', () =>{
            this.list.removeProject(this.item)
            this.project.remove()
        })
        this.project.appendChild(this.complete)
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
}

export{Project, ProjectManager}