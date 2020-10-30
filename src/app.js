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
        this.projectTitle = title;
        this.items = [];
    }

    addItem(item) { this.items.push(item) }


}

const app = (function () {

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let activeProject = null;

    function addNewProject(title) {
        let newProject = new Project(title)
        projects.push(newProject)
        activeProject = newProject;
    }

    function newItem(title, notes, dueDate, priority) {
        let item = new TodoItem(title, notes, dueDate, priority);
        activeProject.addItem(item);
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
    const getProjects = () => { return projects }



 return { getActiveProject,
          getProjects, 
          addNewProject, 
          newItem }
})();

app.addNewProject('title')

console.log(app.getActiveProject())

export default { TodoItem, Project, app }