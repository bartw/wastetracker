import * as firebase from "firebase";

export default class ProjectService {
  constructor(onChanged) {
    let projects = [];
    const dbContext = firebase.database().ref("projects");

    const callOnChanged = () => {
      onChanged(
        projects.map(project => {
          return { id: project.id, name: project.name };
        })
      );
    };

    dbContext.on("child_added", data => {
      projects = projects.concat([
        { id: data.key, name: data.val().name, ref: data.ref }
      ]);
      callOnChanged();
    });

    dbContext.on("child_removed", data => {
      projects = projects.filter(project => project.id !== data.key);
      callOnChanged();
    });

    this.addProject = name => {
      if (!name) {
        return;
      }
      const newProject = dbContext.push();
      newProject.set({
        name: name
      });
    };

    this.deleteProject = id => {
      const projectToDelete = projects.find(project => project.id === id);
      if (projectToDelete) {
        projectToDelete.ref.remove();
      }
    };
  }
}
