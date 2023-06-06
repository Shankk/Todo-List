export default class Project {
    constructor(title) {
        this.tasks = []

        this.cont = document.createElement('button')
        this.cont.classList.add("sidebar-btn")
        
        this.name = document.createElement('div')
        this.name.textContent = title

        this.complete = document.createElement('button')
        this.complete.textContent = " X "
        this.complete.addEventListener('click', () =>{
            this.cont.remove()
        })

        this.cont.appendChild(this.name)
        this.cont.appendChild(this.complete)
        
    }

    setParent(parent) {
        parent.appendChild(this.cont);
    }

    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task)
        if(index !== -1) {
            this.tasks.splice(index,1)
        }
    }
}