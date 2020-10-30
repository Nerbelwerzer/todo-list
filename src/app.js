class TodoItem {
    constructor(title, notes, dueDate, priority) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
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

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let activeProject = null;

    function addNewProject(title) {
        let newProject = new Project(title)
        projects.push(newProject)
        activeProject = newProject;
        return newProject
    }

    function newItem(form) {
        let task = new TodoItem(form.title.value, form.notes.value, form.dueDate.value, form.priority.value);
        activeProject.addItem(task);
        return task
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

    const getActiveProject = () => { return activeProject.items }
    const setActiveProject = (project) => { activeProject = project }
    const getProjects = () => { return projects }



 return { 
    getActiveProject,
    setActiveProject,
    getProjects, 
    addNewProject, 
    newItem 
    }
})();


export { App }

App.addNewProject('title')

console.log(App.getActiveProject())
