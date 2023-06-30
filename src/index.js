import './styles.css';
import { addWeeks, compareAsc, getDate, getMonth, getYear, startOfToday } from "date-fns"
import Storage from './storage';
import {Project, ProjectManager} from './project';
import Task from './task';

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
//Project Items List
const homeList = document.querySelector('.home-list')
const projectList = document.querySelector('.projects-list')
const sidebarBtn = document.querySelector('.newProject-btn')

const storageM = new Storage()
const manager = storageM.getProjectList()

function makeDate(year,month,day) {
    const yyyy = String(year)
    const mm = (month < 10 ? "0" : "") + String(month+1) //+1 since jan is 0 
    const dd = (day < 10 ? "0" : "") + String(day)
    const dateString = yyyy + "-" + mm + "-" + dd
    return dateString
}

function getTodaysDate() {
    const todaysDate = startOfToday()
    return this.makeDate(getYear(todaysDate), getMonth(todaysDate), getDate(todaysDate))
}

function createTaskElements(project,task) {
    // allow creation of tasks so we can populate when switching sidebar tabs
    const cont = document.createElement('div')
    cont.classList.add("task-item")

    const complete = document.createElement('button')
    complete.classList.add('complete-task')
    complete.textContent = "Complete"
    complete.addEventListener('click', () =>{
        manager.getProject(task.getProjectName()).removeTask(task)
        manager.getProject("Today").removeTask(task)
        manager.getProject("This Week").removeTask(task)
        storageM.saveProjectList(manager)
        cont.remove()
    })

    const name = document.createElement('div')
    name.textContent =  task.getName()

    const date = document.createElement('input')
    date.type = 'date'
    date.value = task.getDate()
    date.addEventListener("change", () =>{
        task.setDate(date.value)
        console.log(task.getDate())
        if(compareAsc(task.getCurrentDate(), startOfToday()) == 0){
            manager.getProject("Today").addTask(task)
        }
        else {
            console.log("Deleteing/Not Today Task")
            manager.getProject("Today").removeTask(task)
        }
        // add to This week if date matches Today's week
        if(compareAsc(task.getCurrentDate(), addWeeks(startOfToday(),1)) == -1 &&
        compareAsc(task.getCurrentDate(), startOfToday()) == 1) {
            manager.getProject("This Week").addTask(task)
        }
        else{
            console.log("Deleteing/Not This Week Task")
            manager.getProject("This Week").removeTask(task)
        }

        storageM.saveProjectList(manager)
    })

    cont.appendChild(complete)
    cont.appendChild(name)
    cont.appendChild(date)
    taskList.appendChild(cont)

    if(compareAsc(task.getCurrentDate(), startOfToday()) == 0){
        manager.getProject("Today").addTask(task) 
    }
    else {
        console.log("Deleteing/Not Today Task")
        manager.getProject("Today").removeTask(task)
    }
    // add to This week if date matches Today's week
    if(compareAsc(task.getCurrentDate(), addWeeks(startOfToday(),1)) == -1 &&
    compareAsc(task.getCurrentDate(), startOfToday()) == 1) {
        manager.getProject("This Week").addTask(task)
    }
    else{
        console.log("Deleteing/Not This Week Task")
        manager.getProject("This Week").removeTask(task)
    }
}

function createTasks(project) {
    if(project.getTasks() != null) {
        taskList.textContent = ""
        for(let task in project.getTasks()){
            createTaskElements(project, project.getTasks()[task])
        }
    }
}

function createProjectElements(project, parent) {
    const button = document.createElement('button')
    button.classList.add("sidebar-btn")
    button.id = "project-btn"
    button.addEventListener('click', () =>{
        contentTitle.textContent = project.getName()
        createTasks(project)
    })

    const title = document.createElement('div')
    title.textContent = project.getName()
    
    button.appendChild(title)
    parent.appendChild(button)

    if(parent.classList == "projects-list") {
        const complete = document.createElement('button')
        complete.classList.add('complete-side')
        complete.textContent = " X "
        complete.addEventListener('click', (e) =>{
            e.stopPropagation()
            contentTitle.textContent = "Inbox"
            createTasks(manager.getProject("Inbox"))
            project.deleteTaskElements(manager)
            manager.removeProject(project)
            storageM.saveProjectList(manager)
            console.log(manager)
            button.remove()
        })
        button.appendChild(complete)
    }
}

function createTodoList() {
    if(storageM != null) {
        for(let project in manager.getProjects()) {
            if(manager.getProjects()[project].getName() === "Inbox" || 
            manager.getProjects()[project].getName() === "Today" || 
            manager.getProjects()[project].getName() === "This Week") {
                createProjectElements(manager.getProjects()[project], homeList)
            }
            else {
                createProjectElements(manager.getProjects()[project], projectList)
            }
        }
    }
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

function createNewProject(name) {
    const newProject = new Project(name)
    
    createProjectElements(newProject, projectList)
    
    manager.addProject(newProject)
    storageM.addProject(newProject)
}

function createNewTask(title) {
    const newTask = new Task(title, contentTitle.textContent);
    
    createTaskElements(manager.getProject(contentTitle.textContent), newTask)
    manager.getProject(contentTitle.textContent).addTask(newTask)
    storageM.addTask(contentTitle.textContent, newTask)
}

contentBtn.addEventListener('click', () => {
    toggleElements(taskContainer, contentBtn);
})

addTaskBtn.addEventListener('click', () => {
    if(taskTitle.value.length > 1 && !manager.getProject(contentTitle.textContent).getTask(taskTitle.value)){
        createNewTask(taskTitle.value);
        toggleElements(taskContainer, contentBtn);
    }
    else {
        alert("Please Choose Another Name. Task Already Exists")
    }
})

cancelTaskBtn.addEventListener('click', () => {
    toggleElements(taskContainer, contentBtn);
})

sidebarBtn.addEventListener('click', () => {
    toggleElements(projectContainer,sidebarBtn);
})

addProjectBtn.addEventListener('click', () => {
    if(projectTitle.value.length > 1 && !manager.getProject(projectTitle.value)) {
        createNewProject(projectTitle.value);
        toggleElements(projectContainer,sidebarBtn);
    }
    else {
        alert("Please Choose Another Name. Project Already Exists")
    }
})

cancelProjectBtn.addEventListener('click', () => {
    toggleElements(projectContainer,sidebarBtn);
})

//Initial Site Settings
createTodoList()
createTasks(manager.getProject("Inbox"))