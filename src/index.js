import './styles.css';
import Project from './project';
import Task from './task';


class Projects {
    constructor() {
        this.list = []
        this.index = new Project()
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
    }
}

const content = document.querySelector('.content')
const sidebarBtn = document.querySelector('.addProject-btn')
//Project Items List
const projectList = document.querySelector('.projects-list')
const projects = new Projects()
//Task Content Template
const contentTitle = document.createElement('h2')
const taskList = document.createElement('div')
taskList.classList.add('task-list')
const contentBtn = document.createElement('button')
contentBtn.classList.add('addtask-btn')
// Project creation elements
const createProjectCont = document.createElement('div')
const projectTitle = document.createElement('input')
const addProjectBtn = document.createElement('button')
const cancelProjectBtn = document.createElement('button')
// Task creation elements
const createTaskCont = document.createElement('div')
const taskTitle = document.createElement('input')
const addTaskBtn = document.createElement('button')
const cancelTaskBtn = document.createElement('button')

function changeToNewTab(tab) {
    content.textContent = " "
    contentTitle.textContent = tab.getName().textContent
    contentBtn.textContent = "Add Task"
    projects.setIndex(tab)
    projects.getIndex().createTaskElements(taskList)

    content.appendChild(contentTitle)
    content.appendChild(taskList)
    content.appendChild(contentBtn)
    
}

function createProjectElements() {
    sidebarBtn.style.display = "none"
    createProjectCont.style.display = "flex"

    projectTitle.type = 'text'
    projectTitle.value = ''
    addProjectBtn.textContent = 'Add'
    cancelProjectBtn.textContent = 'Cancel'

    createProjectCont.appendChild(projectTitle)
    createProjectCont.appendChild(addProjectBtn)
    createProjectCont.appendChild(cancelProjectBtn)

    projectList.appendChild(createProjectCont)
}

function closeProjectElememts() {
    sidebarBtn.style.display = "flex"
    createProjectCont.style.display = "none"
}

function createTaskElements() {
    contentBtn.style.display = "none"
    createTaskCont.style.display = "flex"

    taskTitle.type = 'text'
    taskTitle.value = ''
    addTaskBtn.textContent = 'Add'
    cancelTaskBtn.textContent = 'Cancel'
    
    createTaskCont.appendChild(taskTitle)
    createTaskCont.appendChild(addTaskBtn)
    createTaskCont.appendChild(cancelTaskBtn)

    taskList.appendChild(createTaskCont)
}

function closeTaskElements() {
    contentBtn.style.display = "flex"
    createTaskCont.style.display = "none"
}


function createNewProject() {
    const newProject = new Project(projectTitle.value)
    newProject.setParent(projectList)
    newProject.getButton().addEventListener('click', () => {
        changeToNewTab(newProject)
    })
    projects.addProject(newProject)
    closeProjectElememts();
}

function createNewTask() {
    const newTask = new Task(taskTitle.value);
    newTask.setParent(taskList);
    projects.getIndex().addTask(newTask);
    newTask.setProjectOwner(projects.getIndex(),newTask)
    closeTaskElements();
}


addTaskBtn.addEventListener('click', () => {
    createNewTask();
})

cancelTaskBtn.addEventListener('click', () => {
    closeTaskElements();
})


addProjectBtn.addEventListener('click', () => {
    createNewProject();
})

cancelProjectBtn.addEventListener('click', () => {
    closeProjectElememts();
})


sidebarBtn.addEventListener('click', () => {
    createProjectElements();
})

contentBtn.addEventListener('click', () => {
    createTaskElements();
})