import app from './app'

const doc = (function () {
    const itemBoard = document.getElementById('item-board')
    const newTaskBtn = document.getElementById('new-task-btn')
    const newProjBtn = document.getElementById('new-proj-btn')
    const taskModal = document.getElementById('task-modal')
    const projModal = document.getElementById('project-modal')
    const projForm = document.getElementById('project-form')
    const projSubmit = document.getElementById('project-submit')

    newTaskBtn.addEventListener('click', () => {
        taskModal.style.display = 'block'
    })

    newProjBtn.addEventListener('click', () => {
        projModal.style.display = 'block'
    })

    projSubmit.addEventListener('click', () => {
        app.addNewProject(projForm.title.value)
    })


    function displayTasks() {
        let taskList = app.getActiveProject()
        for (let i of taskList) {
            let taskCard = document.createElement('div')
            taskCard.setAttribute('class', 'task-card')

            taskCard.innerHTML = `
                <h3 class="task-title">${i.title}</h3>
                <span class="task-due">Due:<time>${i.dueDate}</time></span>
                <p class="task-notes">${i.notes}</p>
                `
            itemBoard.appendChild(taskCard)
        }
    }
})();