import './styles.css';
import {Project, ProjectManager} from './project';
import Task from './task';

const sidebarBtn = document.querySelector('.newProject-btn')
//Project Items List
const homeList = document.querySelector('.home-list')
const projectList = document.querySelector('.projects-list')
const projects = new ProjectManager()
//Content Items
const contentTitle = document.querySelector('.content-title')
const taskList = document.querySelector('.task-list')
const contentBtn = document.querySelector('.newTask-btn')
// Project creation elements
const projectContainer = document.querySelector('.projectCreation')
const projectTitle = document.querySelector('.projectTitle')
const addProjectBtn = document.querySelector('.addProjectBtn')
const cancelProjectBtn = document.querySelector('.cancelProjectBtn')
// Task creation elements
const taskContainer = document.querySelector('.taskCreation')
const taskTitle = document.querySelector('.taskTitle')
const addTaskBtn = document.querySelector('.addTaskBtn')
const cancelTaskBtn = document.querySelector('.cancelTaskBtn')


function changeToNewTab(tab) {
    contentTitle.textContent = tab.getName().textContent
    projects.setIndex(tab)
    projects.getIndex().createTaskElements(taskList)
}

function toggleElements(open,close) {
    projectTitle.value = ''
    taskTitle.value = ''
    if(open.style.display == "none") {
        open.style.display = "flex"
        close.style.display = "none"
    }
    else {
        open.style.display = "none"
        close.style.display = "flex"
    }
}

function createNewProject(title, parent, userCreated) {
    const newProject = new Project(title)
    newProject.setParent(parent)
    newProject.getButton().addEventListener('click', () => {
        changeToNewTab(newProject)
    })
    if(userCreated) {
        newProject.createDeleteButton(projects,newProject)
    }
    projects.addProject(newProject)
    changeToNewTab(newProject)
}

function createNewTask(title,parent) {
    const newTask = new Task(title);
    newTask.setParent(parent);
    projects.getIndex().addTask(newTask);
    newTask.setProjectOwner(projects.getIndex(),newTask)
}

contentBtn.addEventListener('click', () => {
    toggleElements(taskContainer, contentBtn);
})

addTaskBtn.addEventListener('click', () => {
    if(taskTitle.value.length > 1){
        createNewTask(taskTitle.value,taskList);
        toggleElements(taskContainer, contentBtn);
    }
})

cancelTaskBtn.addEventListener('click', () => {
    toggleElements(taskContainer, contentBtn);
})

sidebarBtn.addEventListener('click', () => {
    toggleElements(projectContainer,sidebarBtn);
})

addProjectBtn.addEventListener('click', () => {
    if(projectTitle.value.length > 1) {
        createNewProject(projectTitle.value, projectList, true);
        toggleElements(projectContainer,sidebarBtn);
    }
})

cancelProjectBtn.addEventListener('click', () => {
    toggleElements(projectContainer,sidebarBtn);
})

//Initial Site Settings
createNewProject("Inbox", homeList, false)
createNewTask("Drink Water", taskList)
createNewTask("Eat Food", taskList)
createNewProject("Today", homeList, false)
createNewProject("This Week", homeList, false)
createNewProject("Default", projectList, true)