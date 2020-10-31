import { parse } from 'date-fns'


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
    }

    addItem(item) { this.items.push(item) }
}

const App = (function () {
    let defaultProject = new Project('Your project');
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let activeProject = projects[0] || defaultProject;

    function addNewProject(title) {
        let newProject = new Project(title);
        projects.push(newProject);
        activeProject = newProject;
        save();
        return newProject;
    }

    function newItem(form) {
        let task = new TodoItem(form.title.value, form.notes.value, form.dueDate.value, form.dueTime.value, form.priority.value);
        activeProject.items.push(task);
        save();
        return task;
    }

    function deleteTask(task) {
        let index = activeProject.items.indexOf(task);
        activeProject.items.splice(index, 1);
        save();
    }

    function deleteProject() {
        let index = projects.indexOf(activeProject);
        projects.splice(index, 1);
        console.log(projects)
        activeProject = projects[0] || defaultProject;
        save();
    }

    function dueDateSort() {
        //code to sort by due date
    }

    function lastAddedSort() {
        //code to sort by date added
    }

    function displayHighPriority() {
        //code to return array of high priority items from current project
    }

    function save(){
        localStorage.setItem("projects", JSON.stringify(projects))
    }

    const getActiveProject = () => { return activeProject }
    const setActiveProject = (project) => { activeProject = project }
    const getProjects = () => { return projects }



 return { 
    getActiveProject,
    setActiveProject,
    getProjects, 
    addNewProject, 
    newItem,
    deleteTask,
    deleteProject
    }
})();


export { App }
