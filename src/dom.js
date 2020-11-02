import { App } from './app';
import { parse, formatDistanceToNow } from 'date-fns';

const Doc = (function () {
  // Tasks DOM
  const itemBoard = document.getElementById('item-board');
  const newTaskBtn = document.getElementById('new-task-btn');
  const taskModal = document.getElementById('task-modal');
  const taskForm = document.getElementById('task-form');
  const taskSubmit = document.getElementById('task-submit');
  const mobileAddBtn = document.getElementById('mobile-add-btn')
  document.getElementById('due-time').defaultValue = '18:00';
  // Projects DOM
  const projectList = document.getElementById('project-list');
  const newProjBtn = document.getElementById('new-proj-btn');
  const projModal = document.getElementById('project-modal');
  const projForm = document.getElementById('project-form');
  const projSubmit = document.getElementById('project-submit');
  const projDel = document.getElementById('proj-del-btn');

  const closeBtn = document.querySelectorAll('.close-btn');
  const menuBtn = document.getElementById('menu-btn')
  const projMenu = document.getElementById('project-menu')

  const sortMenu = document.getElementById('sort-btn')
  const sortDue = document.getElementById('sort-due')
  const sortAdded = document.getElementById('sort-added')

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      projModal.style.display = 'none';
      taskModal.style.display = 'none';
    });
  });

  sortMenu.addEventListener('click', () => {
    document.getElementById('dropContent').classList.toggle('show');
  });

  sortDue.addEventListener('click', () => {
    App.dueDateSort()
    displayTasks()
  });

  sortAdded.addEventListener('click', () => {
    App.addedDateSort()
    displayTasks()
  });

  window.onclick = function (event) {
    let dropContent = document.getElementById('dropContent')
    if (!event.target.matches('.btn')) {
      if (dropContent.classList.contains('show')) {
        dropContent.classList.remove('show');
      }
    }
  }

  menuBtn.addEventListener('click', () => {
    projMenu.classList.toggle('show-menu');
  })

  newTaskBtn.addEventListener('click', () => {
    taskModal.style.display = 'block';
  });

  taskSubmit.addEventListener('click', () => {
    taskModal.style.display = 'none';
    const newTask = App.newItem(taskForm);
    taskForm.reset();
    appendTask(newTask);
  });

  newProjBtn.addEventListener('click', () => {
    projModal.style.display = 'block';
  });

  projSubmit.addEventListener('click', () => {
    projModal.style.display = 'none';
    const newProject = App.addNewProject(projForm.title.value);
    appendProject(newProject);
    projForm.reset();
    displayTasks();
  });

  projDel.addEventListener('click', () => {
    if (confirm("Delete project?")) {
      App.deleteProject();
      displayProjectList();
      displayTasks();
    }
  });

  mobileAddBtn.addEventListener('click', () => {
    taskModal.style.display = 'block';
  });

  function appendProject(project) {
    const li = document.createElement('li');
    li.textContent = project.title;
    li.setAttribute('class', 'project-title');
    li.addEventListener('click', () => {
      App.setActiveProject(project);
      highlightTitle(li);
      displayTasks();
    });
    if (project === App.getActiveProject()) {
      highlightTitle(li);
    }
    projectList.appendChild(li);
  }

  function appendTask(task) {
    let dueDate
    try {
      dueDate = 'Due ' + formatDistanceToNow(
        parse(task.dueDate, 'yyyy-MM-dd HH:mm', new Date()), { addSuffix: true })
        + ` (${task.dueDate})`;
    } catch {
      dueDate = 'No deadline specified'
    }
    const taskCard = document.createElement('div');
    const delBtn = document.createElement('div');
    const taskNotes = document.createElement('div')
    const doneBtn = document.createElement('div')
    taskNotes.innerHTML = `<p class="task-notes">${task.notes}</p>`
    taskNotes.setAttribute('class', 'hide')
    taskCard.setAttribute('class', 'task-card');
    delBtn.setAttribute('class', 'del-btn');
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delBtn.addEventListener('click', () => {
      App.deleteTask(task);
      displayTasks();
    });
    doneBtn.setAttribute('class', 'done-btn')
    doneBtn.innerHTML = '<i class="far fa-check-circle"></i>'
    doneBtn.addEventListener('click', () => {
      doneBtn.classList.toggle('task-done')
    })

    taskCard.innerHTML = `
        <h3 class="task-title">${task.title}</h3>
        <div class="task-content"><span class="task-due">
        <time>${dueDate}</time></span>
        `;
    if (task.priority == 'high') {
      taskCard.classList.add('urgent');
    } else if (task.priority == 'med') {
      taskCard.classList.add('medium-pri');
    } else {
      taskCard.classList.add('low-pri');
    }
    taskCard.appendChild(doneBtn)
    taskCard.appendChild(delBtn);
    taskCard.appendChild(taskNotes);

    itemBoard.appendChild(taskCard);
    taskCard.addEventListener('click', () => {
      taskNotes.classList.toggle('hide')
    });
  }

  function displayProjectList() {
    projectList.textContent = '';
    for (const i of App.getProjects()) {
      appendProject(i);
    }
  }

  function displayTasks(taskList = App.getActiveProject().items) {
    document.getElementById('project-title').textContent = 
      App.getActiveProject().title;
    itemBoard.textContent = '';
    for (const i of taskList) {
      appendTask(i);
    }
  }

  function highlightTitle(li) {
    const projectTitles = document.querySelectorAll('.project-title');
    for (const i of projectTitles) {
      i.style.backgroundColor = 'transparent';
    }
    li.style.backgroundColor = '#a7dbf3';
  }

  return {
    displayProjectList,
    displayTasks
  }
})();

export { Doc }
