
class ProjectManager {
    constructor() {
        this.projectList = []

    }

    setProjects(projects) {
        this.projectList = projects
    }
    
    getProjects() {
    return this.projectList
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
        const index = this.projectList.indexOf(this.getProject(project))
        if(index !== -1) {
            this.projectList.splice(index,1)
        }
        else {
            console.log("User Project Already Deleted or Dosent Exist.")
        }
    }
}

class Project {
    constructor(title, tasklist) {
        this.tasklist = tasklist //task list element
        this.tasks = []
        this.name = title

    }

    getName() {
        return this.name
    }

    setTasks(taskList) {
        this.tasks = taskList
    }

    getTasks() {
        return this.tasks
    }

    getTask(taskName) {
        if(this.tasks.find((task) => task.getName() === taskName)) {
            return this.tasks.find((task) => task.getName() === taskName)
        }
        else {
            console.log("Task Does Not Exist.")
        }
    }

    addTask(newTask) {
        if (this.tasks.find((task) => task.name === newTask.name)) {
            alert("Please Choose Another Name. Project Already Exists")
        }
        this.tasks.push(newTask)
    }

    removeTask(task) {
        const index = this.tasks.indexOf(this.getTask(task.getName()))
        if(index !== -1) {
            this.tasks.splice(index,1)
        }
        /* else {
            console.log("Task Already Deleted or Dosent Exist.")
        } */
    }

    createTaskElements() {
        if(this.tasks != null)
        {
            this.tasklist.textContent = ""
            for(let task in this.tasks){
                // allow creation of tasks so we can populate when switching sidebar tabs
                this.tasklist.appendChild(this.tasks[task].getContainer())
            }
        }
        
    }

    deleteTaskElements(manager) {
        if(this.tasks != null) {
            for(let task in this.tasks){
                //console.log(this.tasks[task].getTaskName())
                manager.getProject("Today").removeTask(this.tasks[task])
                manager.getProject("This Week").removeTask(this.tasks[task])
            }
        }
    }

}

export{Project, ProjectManager}