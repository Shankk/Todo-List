import { addWeeks, compareAsc, getDate, getMonth, getYear, startOfToday } from "date-fns"

export default class Task {
    constructor(title, project) {
        this.project = project
        this.name = title
        this.date = "2000-00-01"
        this.cont = ""
        /* this.cont = document.createElement('div')
        this.cont.classList.add("task-item")
        
        this.complete = document.createElement('button')
        this.complete.classList.add('complete-task')
        this.complete.textContent = "Complete"

        this.name = document.createElement('div')
        this.name.textContent = title

        this.date = document.createElement('input')
        this.date.type = 'date'

        this.cont.appendChild(this.complete)
        this.cont.appendChild(this.name)
        this.cont.appendChild(this.date) */
    }

    setContainer(item) {
        this.cont = item
    }

    getContainer() {
        return this.cont
    }

    getName() {
        return this.name
    }

    setDate(date) {
        this.date = date.value
    }

    getDate() {
        return this.date
    }

    /* setDeleteButton(item) {
        this.task = item
        this.complete.addEventListener('click', () =>{
            console.log(this.task.getName())
            this.project.removeTask(this.task)
            this.cont.remove()
        })
    } */

    /* setParent(parent) {
        parent.appendChild(this.cont);
    } */

    /* makeDate(year,month,day) {
        const yyyy = String(year)
        const mm = (month < 10 ? "0" : "") + String(month+1) //+1 since jan is 0 
        const dd = (day < 10 ? "0" : "") + String(day)
        const dateString = yyyy + "-" + mm + "-" + dd
        return dateString
    } */
    
    getCurrentDate() {
        return  new Date(this.getDate().slice(0,4), this.getDate().slice(5,7)-1, this.getDate().slice(8,10))
    }

    /* getTodaysDate() {
        const todaysDate = startOfToday()
        return this.makeDate(getYear(todaysDate), getMonth(todaysDate), getDate(todaysDate))
    } */
    
    addDateCheck(item,manager) {
        //TODO: Find a way to set a range and auto delete from Today and This Week tabs
        this.tempTask = item
        this.date.addEventListener("change", () =>{
            //add to Today project if date matches today
            if(compareAsc(this.getCurrentDate(),startOfToday()) == 0){
                manager.getProject("Today").addTask(this.tempTask)
                this.complete.addEventListener('click', () =>{
                    manager.getProject("Today").removeTask(this.tempTask)
                })
                
            }
            else {
                console.log("Deleteing/Not Today Task")
                manager.getProject("Today").removeTask(this.tempTask)
            }
            // add to This week if date matches Today's week
            if(compareAsc(this.getCurrentDate(), addWeeks(startOfToday(),1)) == -1 &&
            compareAsc(this.getCurrentDate(), startOfToday()) == 1) {
                manager.getProject("This Week").addTask(this.tempTask)
                this.complete.addEventListener('click', () =>{
                    manager.getProject("This Week").removeTask(this.tempTask)
                })
            }
            else{
                console.log("Deleteing/Not This Week Task")
                manager.getProject("This Week").removeTask(this.tempTask)
            }
            
        })
    }

    
}