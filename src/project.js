
class ProjectManager {
    constructor() {
        this.projectList = []
        this.addProject(new Project("Inbox"))
        this.addProject(new Project("Today"))
        this.addProject(new Project("This Week"))
        this.addProject(new Project("Default"))
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
        if (this.projectList.find((project) => project.getName() === newProject.getName())) {
            //alert("Please Choose Another Name. Project Already Exists")
        }
        else{
            this.projectList.push(newProject)
            console.log("Project Added " + newProject.getName())
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
    constructor(title) {
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
    }

    addTask(newTask) {
        if (this.tasks.find((task) => task.getName() === newTask.name)) {
            return
        }
        else {
            console.log("Added Task")
            this.tasks.push(newTask)
        }
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task)
        if(index !== -1) {
            this.tasks.splice(index,1)
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