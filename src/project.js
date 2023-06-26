
class ProjectManager {
    constructor() {
        this.projectList = []

    }

    getProject(projectName) {
        return this.projectList.find((project) => project.getName() === projectName)
    }

    addProject(newProject) {
        if (this.projectList.find((project) => project.name === newProject.name)) {
            alert("Please Choose Another Name. Project Already Exists")
        }
        else{
            this.projectList.push(newProject)
            console.log("Project Added")
        }
    }

    removeProject(project) {
        const index = this.projectList.indexOf(project)
        if(index !== -1) {
            this.projectList.splice(index,1)
        }
        else {
            console.log("User Project Already Deleted or Dosent Exist.")
        }
    }
}

class Project {
    constructor(title, projMng, tasklist) {
        this.projectMng = projMng
        this.taskListEle = tasklist //task list element
        this.tasks = []
        this.name = title

        this.button = document.createElement('button')
        this.button.classList.add("sidebar-btn")
        this.button.id = "project-btn"
        this.button.addEventListener('click', () =>{
            this.createTaskElements()
        })

        this.title = document.createElement('div')
        this.title.textContent = this.name
        
        this.button.appendChild(this.title)
    }

    getName() {
        return this.name
    }

    getButton() {
        return this.button
    }

    setParent(parent) {
        parent.appendChild(this.button);
    }

    getProjectMng() {
        return this.projectMng
    }

    getTask(task) {
        const index = this.tasks.indexOf(task)
        if(index !== -1) {
            return this.tasks[index]
        }
        else {
            console.log("Task Already Deleted or Dosent Exist.")
        }
    }

    addTask(newTask) {
        if (this.tasks.find((task) => task.name === newTask.name)) {
            alert("Please Choose Another Name. Project Already Exists")
        }
        this.tasks.push(newTask)
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

    createDeleteButton(item) {
        this.item = item
        this.complete = document.createElement('button')
        this.complete.classList.add('complete-side')
        this.complete.textContent = " X "
        this.complete.addEventListener('click', (e) =>{
            e.stopPropagation()
        
            this.projectMng.getProject("Inbox").createTaskElements()
            this.deleteTaskElements()
            this.projectMng.removeProject(this.item)
            this.button.remove()
        })
        this.button.appendChild(this.complete)
    }

    createTaskElements() {
        if(this.tasks != null)
        {
            this.taskListEle.textContent = ""
            for(let task in this.tasks){
                // allow creation of tasks so we can populate when switching sidebar tabs
                this.taskListEle.appendChild(this.tasks[task].getContainer())
            }
        }
        
    }

    deleteTaskElements() {
        if(this.tasks != null) {
            for(let task in this.tasks){
                //console.log(this.tasks[task].getTaskName())
                this.projectMng.getProject("Inbox").removeTask(this.tasks[task])
                this.projectMng.getProject("This Week").removeTask(this.tasks[task])
            }
        }
    }

}

export{Project, ProjectManager}