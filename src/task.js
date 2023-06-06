
export default class Task {
    constructor(title) {
        this.cont = document.createElement('div')
        this.cont.classList.add("task-item")
        
        this.complete = document.createElement('button')
        this.complete.textContent = "Done"
        this.complete.addEventListener('click', () =>{
            this.cont.remove()
        })

        this.name = document.createElement('div')
        this.name.textContent = title

        this.date = document.createElement('input')
        this.date.type = 'date'

        this.cont.appendChild(this.complete)
        this.cont.appendChild(this.name)
        this.cont.appendChild(this.date)
    }

    setParent(parent) {
        parent.appendChild(this.cont);
    }
}
