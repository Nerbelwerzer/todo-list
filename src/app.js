class TodoItem {
  constructor(title, notes, dueDate, dueTime, priority) {
    this.title = title;
    this.notes = notes;
    this.dueDate = `${dueDate} ${dueTime}`;
    this.priority = priority;
    this.log = new Date();
    this.done = false;
  }
}

class Project {
  constructor(title) {
    this.title = title;
    this.items = [];
    this.filteredItems = []
  }

  addItem(item) {
    this.items.push(item);
  }
}

const App = (function () {
  const defaultProject = new Project('Your project');
  const projects =
    JSON.parse(localStorage.getItem('projects')) || [defaultProject];
  let activeProject = projects[0] || defaultProject;

  function addNewProject(title) {
    const newProject = new Project(title);
    projects.push(newProject);
    activeProject = newProject;
    save();
    return newProject;
  }

  function newItem(form) {
    const task = new TodoItem(
      form.title.value,
      form.notes.value,
      form.dueDate.value,
      form.dueTime.value,
      form.priority.value,
    );
    activeProject.items.push(task);
    save();
    return task;
  }

  function deleteTask(task) {
    const index = activeProject.items.indexOf(task);
    activeProject.items.splice(index, 1);
    save();
  }

  function deleteProject() {
    const index = projects.indexOf(activeProject);
    projects.splice(index, 1);
    activeProject = projects[0] || defaultProject;
    save();
  }

  function dueDateSort() {
    activeProject.items.sort((a,b) => a.dueDate < b.dueDate ? -1 : 1);
    save();
  }

  function addedDateSort() {
    activeProject.items.sort((a,b) => a.log < b.log ? -1 : 1);
    save();
  }

  function save() {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  function filterDone() {
    const result = activeProject.items.filter(item => item.done === true);
    return result;
  }

  function filterUrgent() {
    const result = activeProject.items.filter(item => 
      item.priority != 'high' || item.done === true)
    return result
  }

  const toggleDone = (task) => {
    task.done = task.done == true ? false : true;
    save()
  }

  const getActiveProject = () => {
    return activeProject;
  };
  const setActiveProject = (project) => {
    activeProject = project;
  };
  const getProjects = () => {
    return projects;
  };

  return {
    getActiveProject,
    setActiveProject,
    getProjects,
    addNewProject,
    newItem,
    deleteTask,
    deleteProject,
    dueDateSort,
    addedDateSort,
    toggleDone,
    filterDone,
    filterUrgent
  };
})();

export { App };
