import { Project, ProjectManager } from "./project";
import Task from "./task";

export default class Storage {

    saveProjectList(data) {
        localStorage.setItem('todolist', JSON.stringify(data))
    }

    getProjectList() {
        const projectlist = Object.assign(new ProjectManager(), JSON.parse(localStorage.getItem('todolist')))
        
        projectlist.setProjects(projectlist.getProjects().map((project) => Object.assign(new Project(), project)))
        projectlist.getProjects().forEach((project) => project.setTasks( project.getTasks().map((task) => Object.assign(new Task(), task))))

        return projectlist
    }

    addProject(project) {
        const projectList = this.getProjectList()
        projectList.addProject(project)
        this.saveProjectList(projectList)
    }

    deleteProject(projectName) {
        const projectList = this.getProjectList()
        projectList.removeProject(projectName)
        this.saveProjectList(projectList)
    }

    addTask(projectName, task) {
        const projectList = this.getProjectList()
        projectList.getProject(projectName).addTask(task)
        this.saveProjectList(projectList)
    }
    
    deleteTask(projectName, taskName) {
        const projectList = this.getProjectList()
        projectList.getProject(projectName).removeTask(taskName)
        this.saveTodoList(projectList)
    }
}