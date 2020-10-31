import { App } from './app'

const Doc = (function () {
    //Tasks DOM
    const itemBoard = document.getElementById('item-board')
    const newTaskBtn = document.getElementById('new-task-btn')
    const taskModal = document.getElementById('task-modal')
    const taskForm = document.getElementById('task-form')
    const taskSubmit = document.getElementById('task-submit')
    //Projects DOM
    const projectList = document.getElementById('project-list')
    const newProjBtn = document.getElementById('new-proj-btn')
    const projModal = document.getElementById('project-modal')
    const projForm = document.getElementById('project-form')
    const projSubmit = document.getElementById('project-submit')
    const projDel = document.getElementById('proj-del-btn')


    displayTasks()
    displayProjectList()

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
        displayTasks()
    })

    projDel.addEventListener('click', () => {
        App.deleteProject()
        displayProjectList()
        displayTasks()
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
        if (project === App.getActiveProject()) { highlightTitle(li) }
        projectList.appendChild(li)
    }

    function appendTask(task) {
        let taskCard = document.createElement('div')
        let delBtn = document.createElement('div')
        taskCard.setAttribute('class', 'task-card')
        delBtn.setAttribute('class', 'del-btn')
        delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
        delBtn.addEventListener('click', () => {
            App.deleteTask(task)
            displayTasks()
        })

        taskCard.innerHTML = `
            <h3 class="task-title">${task.title}</h3>
            <div class="task-content"><span class="task-due">Due:<time>${task.dueDate}</time></span>
            <p class="task-notes">${task.notes}</p></div>
           `
        if (task.priority == 'high') {
            taskCard.classList.add('urgent')
        } else if (task.priority == 'med') {
            taskCard.classList.add('medium-pri')
        } else {
            taskCard.classList.add('low-pri')
        }
        taskCard.appendChild(delBtn)
        itemBoard.appendChild(taskCard)
    }

    function displayProjectList() {
        projectList.textContent = ''
        for (let i of App.getProjects()) {
            appendProject(i)
        }
    }

    function displayTasks() {
        let taskList = App.getActiveProject().items
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



