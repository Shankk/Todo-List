import './styles.css';
import Project from './project';
import Task from './task';

const contentBtn = document.querySelector('.addtask-btn')
const sidebarBtn = document.querySelector('.addProject-btn')

const taskList = document.querySelector('.task-list')
const projectList = document.querySelector('.projects-list')

const createTaskCont = document.createElement('div')
const taskTitle = document.createElement('input')
const addTaskBtn = document.createElement('button')
const cancelTaskBtn = document.createElement('button')

const createProjectCont = document.createElement('div')
const projectTitle = document.createElement('input')
const addProjectBtn = document.createElement('button')
const cancelProjectBtn = document.createElement('button')


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

function createNewTask() {
    const newTask = new Task(taskTitle.value)
    newTask.setParent(taskList)
    closeTaskElements();
}

function createNewProject() {
    const newProject = new Project(projectTitle.value)
    newProject.setParent(projectList)
    closeProjectElememts();
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