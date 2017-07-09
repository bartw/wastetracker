import React from "react";
import ProjectRow from "./ProjectRow";
import Project from "./Project";
import ProjectService from "../services/ProjectService";

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      newProjectName: ""
    };

    const projectService = new ProjectService(projects => {
      this.setState({ projects: projects });
    });

    this.onChangeProjectName = e => {
      this.setState({ newProjectName: e.target.value });
    };

    this.add = () => {
      projectService.addProject(this.state.newProjectName);
      this.setState({ newProjectName: "" });
    };

    this.setSelected = project => {
      this.setState({ selectedProject: project });
    };

    this.delete = id => {
      projectService.deleteProject(id);
    };
  }

  render() {
    const projectRows = this.state.projects.map(project =>
      <ProjectRow
        key={project.id}
        name={project.name}
        setSelected={() => {
          this.setSelected(project);
        }}
        onDelete={() => {
          this.delete(project.id);
        }}
      />
    );
    return (
      <div>
        <h3>Projects</h3>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {projectRows}
            </tbody>
          </table>
          <input
            type="text"
            value={this.state.newProjectName}
            onChange={this.onChangeProjectName}
            placeholder="name"
          />
          <button onClick={this.add} disabled={!this.state.newProjectName}>
            Add project
          </button>
        </div>
        {this.state.selectedProject &&
          <Project project={this.state.selectedProject} />}
        <div />
      </div>
    );
  }
}
