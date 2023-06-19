import { formatDistance, format, startOfToday } from 'date-fns';
import './styles.css';
import {Project, ProjectManager} from './project';
import Task from './task';

const sidebarBtn = document.querySelector('.newProject-btn')
//Project Items List
const homeList = document.querySelector('.home-list')
const projectList = document.querySelector('.projects-list')
const defaultProjects = new ProjectManager()
const userProjects = new ProjectManager()
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
    userProjects.setIndex(tab)
    userProjects.getIndex().createTaskElements(taskList)
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

function createNewProject(projectlist, title, parent, userCreated) {
    const newProject = new Project(title)
    newProject.setParent(parent)
    newProject.getButton().addEventListener('click', () => {
        changeToNewTab(newProject)
    })
    if(userCreated) {
        newProject.createDeleteButton(projectlist,newProject)
    }
    projectlist.addProject(newProject)
    changeToNewTab(newProject)
}

function createNewTask(title,parent) {
    const newTask = new Task(title);
    newTask.setParent(parent);
    newTask.checkDate(defaultProjects.getThisWeek(), defaultProjects.getToday(),newTask)
    userProjects.getIndex().addTask(newTask);
    newTask.setProjectOwner(userProjects.getIndex(),newTask)
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
        createNewProject(userProjects,projectTitle.value, projectList, true);
        toggleElements(projectContainer,sidebarBtn);
    }
})

cancelProjectBtn.addEventListener('click', () => {
    toggleElements(projectContainer,sidebarBtn);
})

//Initial Site Settings
createNewProject(defaultProjects,"Inbox", homeList, false)
createNewTask("Drink Water", taskList)
createNewTask("Eat Food", taskList)
createNewProject(defaultProjects,"Today", homeList, false)
createNewProject(defaultProjects,"This Week", homeList, false)
createNewProject(userProjects,"Default", projectList, true)

//const result = formatDistance(startOfToday(), new Date(2023, 5, 20))
//const test = formatDistanceToNow(new Date(2023, 5, 12),{addSuffix: true})
//console.log(result)