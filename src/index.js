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
const manager = new ProjectManager()

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

function createNewProject(name, parent, userCreated) {
    const newProject = new Project(name, taskList)

    const button = document.createElement('button')
    button.classList.add("sidebar-btn")
    button.id = "project-btn"
    button.addEventListener('click', () =>{
        contentTitle.textContent = newProject.getName()
        newProject.createTaskElements()
    })

    const title = document.createElement('div')
    title.textContent = newProject.getName()
    
    button.appendChild(title)
    parent.appendChild(button)

    if(userCreated) {
        const complete = document.createElement('button')
        complete.classList.add('complete-side')
        complete.textContent = " X "
        complete.addEventListener('click', (e) =>{
            e.stopPropagation()
            contentTitle.textContent = "Inbox"
            manager.getProject("Inbox").createTaskElements()
            newProject.deleteTaskElements(manager)
            manager.removeProject(newProject)
            button.remove()
        })
        button.appendChild(complete)
    }

    manager.addProject(newProject)
}

function createNewTask(title,parent) {
    const newTask = new Task(title, manager.getProject(contentTitle.textContent));
    
    const cont = document.createElement('div')
    cont.classList.add("task-item")
    newTask.setContainer(cont)
    const complete = document.createElement('button')
    complete.classList.add('complete-task')
    complete.textContent = "Complete"
    complete.addEventListener('click', () =>{
        //console.log(this.task.getName())
        manager.getProject(contentTitle.textContent).removeTask(newTask)
        cont.remove()
    })

    const name = document.createElement('div')
    name.textContent = title

    const date = document.createElement('input')
    date.type = 'date'

    cont.appendChild(complete)
    cont.appendChild(name)
    cont.appendChild(date)
    parent.appendChild(cont)

    //newTask.addDateCheck(newTask, manager)
    date.addEventListener("change", () =>{
        newTask.setDate(date)
        //add to Today project if date matches today
        if(compareAsc(newTask.getCurrentDate(), startOfToday()) == 0){
            manager.getProject("Today").addTask(newTask)
            complete.addEventListener('click', () =>{
                manager.getProject("Today").removeTask(newTask)
            })
            
        }
        else {
            console.log("Deleteing/Not Today Task")
            manager.getProject("Today").removeTask(newTask)
        }
        // add to This week if date matches Today's week
        if(compareAsc(newTask.getCurrentDate(), addWeeks(startOfToday(),1)) == -1 &&
        compareAsc(newTask.getCurrentDate(), startOfToday()) == 1) {
            manager.getProject("This Week").addTask(newTask)
            complete.addEventListener('click', () =>{
                manager.getProject("This Week").removeTask(newTask)
            })
        }
        else{
            console.log("Deleteing/Not This Week Task")
            manager.getProject("This Week").removeTask(newTask)
        }
        
    })


    manager.getProject(contentTitle.textContent).addTask(newTask)
    //newTask.setDeleteButton(newTask)
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
createNewProject("Today", homeList, false)
createNewProject("This Week", homeList, false)
createNewProject("Default", projectList, true)

if(manager.getProject(contentTitle.textContent)) {
    console.log("Success!")
}
else {
    console.log("Failed!")
}

const storageM = new Storage()

storageM.saveProjectList(new ProjectManager())

storageM.addProject(new Project("ayoo"))
storageM.addProject(new Project("yessir"))
storageM.deleteProject("ayoo")
storageM.addTask("yessir", new Task("Me Drink", manager.getProject("yessir")))
console.log(storageM.getProjectList())