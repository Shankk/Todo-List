import { addWeeks, compareAsc, startOfToday } from "date-fns"

export default class Task {
    constructor(taskName , projectName ) {
        this.project = projectName
        this.name = taskName
        this.date = "2000-00-01"
    }

    getProjectName() {
        return this.project
    }

    getName() {
        return this.name
    }

    setDate(date) {
        this.date = date
    }

    getDate() {
        return this.date
    }

    getCurrentDate() {
        return  new Date(this.getDate().slice(0,4), this.getDate().slice(5,7)-1, this.getDate().slice(8,10))
    }

    
}