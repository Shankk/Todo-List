import { addWeeks, compareAsc, getDate, getMonth, getYear, startOfToday } from "date-fns"

export default class Task {
    constructor(title,dateVal) {
        
        this.cont = document.createElement('div')
        this.cont.classList.add("task-item")
        
        this.complete = document.createElement('button')
        this.complete.classList.add('complete-task')
        this.complete.textContent = "Complete"
        this.giveDate = document.createElement('button')
        this.giveDate.classList.add('complete-task')
        this.giveDate.textContent = "Set Today"
        this.giveDate.addEventListener('click', ()=>{
            //console.log(this.getCurrentDate())
            //console.log("year: " + this.getDateValue().slice(0,4), "month: " + this.getDateValue().slice(5,7), 
            //"day: " + this.getDateValue().slice(8,10), )
            //console.log(compareAsc(this.getCurrentDate(), result))
            
        })

        this.name = document.createElement('div')
        this.name.textContent = title

        this.date = document.createElement('input')
        this.date.type = 'date'

        this.cont.appendChild(this.complete)
        this.cont.appendChild(this.giveDate)
        this.cont.appendChild(this.name)
        this.cont.appendChild(this.date)
    }

    getContainer() {
        return this.cont
    }

    getTaskName() {
        return this.name.textContent
    }

    getDateValue() {
        return this.date.value
    }

    makeDate(year,month,day) {
        const yyyy = String(year)
        const mm = (month < 10 ? "0" : "") + String(month+1) //+1 since jan is 0 
        const dd = (day < 10 ? "0" : "") + String(day)
        const dateString = yyyy + "-" + mm + "-" + dd
        return dateString
    }
    
    getCurrentDate() {
        return  new Date(this.getDateValue().slice(0,4), this.getDateValue().slice(5,7)-1, this.getDateValue().slice(8,10))
    }

    getTodaysDate() {
        const todaysDate = startOfToday()
        //console.log(getYear(newDate), getMonth(newDate), getDate(newDate))
        //console.log(this.makeDate(getYear(newDate), getMonth(newDate), getDate(newDate)))
        return this.makeDate(getYear(todaysDate), getMonth(todaysDate), getDate(todaysDate))
    }
    
    checkDate(weekly,daily,item) {
        //TODO: Find a way to set a range and auto delete from Today and This Week tabs
        this.week = weekly
        this.today = daily
        this.taskDate = item
        console.log(String(this.date.value))
        this.date.addEventListener("change", () =>{
            //add to Today project if date matches today
            if(this.date.value == this.getTodaysDate()){
                console.log(this.today.getName().textContent)
                this.today.addTask(this.taskDate)
                this.complete.addEventListener('click', () =>{
                    console.log(this.taskDate.getTaskName())
                    this.today.removeTask(this.taskDate)
                    this.cont.remove()
                })
            }
            if(compareAsc(this.getCurrentDate(), addWeeks(startOfToday(),1)) == -1) {
                console.log(this.today.getName().textContent)
                this.week.addTask(this.taskDate)
                this.complete.addEventListener('click', () =>{
                    console.log(this.taskDate.getTaskName())
                    this.week.removeTask(this.taskDate)
                    this.cont.remove()
                })
            }
        })
    }

    setProjectOwner(parent,item) {
        this.project = parent
        this.task = item
        this.complete.addEventListener('click', () =>{
            console.log(this.task.getTaskName())
            this.project.removeTask(this.task)
            this.cont.remove()
        })
    }

    setParent(parent) {
        parent.appendChild(this.cont);
    }
}