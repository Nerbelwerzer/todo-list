import { App } from './app'

const Doc = (function () {
    //Tasks DOM
    const itemBoard = document.getElementById('item-board')
    const newTaskBtn = document.getElementById('new-task-btn')
    const taskModal = document.getElementById('task-modal')
    const taskForm = document.getElementById('task-form')
    const taskSubmit = document.getElementById('task-submit')
    //Projects DOM
    const projecList = document.getElementById('project-list')
    const newProjBtn = document.getElementById('new-proj-btn')
    const projModal = document.getElementById('project-modal')
    const projForm = document.getElementById('project-form')
    const projSubmit = document.getElementById('project-submit')


    newTaskBtn.addEventListener('click', () => {
        taskModal.style.display = 'block'
    })

    taskSubmit.addEventListener('click', () => {
        taskModal.style.display = 'none'
        let newTask = App.newItem(taskForm)
        appendTask(newTask)
    })

    newProjBtn.addEventListener('click', () => {
        projModal.style.display = 'block'
    })

    projSubmit.addEventListener('click', () => {
        projModal.style.display = 'none'
        let newProject = App.addNewProject(projForm.title.value);
        appendProject(newProject)
    })

    function appendProject(project) {
        let li = document.createElement('li');
        li.textContent = project.title;
        li.setAttribute('class', 'project-title')
        li.addEventListener('click', () => {
            App.setActiveProject(project)
            highlightTitle(li)
            displayTasks()
        })
        highlightTitle(li)
        projecList.appendChild(li)
    }

    function appendTask(task) {
        let taskCard = document.createElement('div')
        taskCard.setAttribute('class', 'task-card')

        taskCard.innerHTML = `
            <h3 class="task-title">${task.title}</h3>
            <span class="task-due">Due:<time>${task.dueDate}</time></span>
            <p class="task-notes">${task.notes}</p>
           `
        if (task.priority == 'high') {
            taskCard.style.border = '3px solid red'
        }
        itemBoard.appendChild(taskCard)
    }

    function displayTasks() {
        let taskList = App.getActiveProject()
        itemBoard.textContent = ''
        for (let i of taskList) { appendTask(i) }
    }

    function highlightTitle(li) {
        let projectTitles = document.querySelectorAll('.project-title')
        for (let i of projectTitles) {
            i.style.backgroundColor = 'transparent'
        }
        li.style.backgroundColor = '#a7dbf3'
    }
})();

