import * as firebase from "firebase";

export default class ProjectService {
  constructor(onChanged) {
    let projects = [];
    const dbContext = firebase.database().ref("projects");

    dbContext.on("child_added", data => {
      projects = projects.concat([{ id: data.key, name: data.val().name }]);
      onChanged(projects);
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
  }
}
