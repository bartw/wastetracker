import React from "react";
import { render } from "react-dom";
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

    this.delete = id => {
      projectService.deleteProject(id);
    };
  }

  render() {
    const projects = this.state.projects.map(project =>
      <Project
        key={project.id}
        name={project.name}
        onDelete={() => {
          this.delete(project.id);
        }}
      />
    );
    return (
      <div>
        <table>
          <tbody>
            {projects}
          </tbody>
        </table>
        <input
          type="text"
          value={this.state.newProjectName}
          onChange={this.onChangeProjectName}
        />
        <button onClick={this.add} disabled={!this.state.newProjectName}>
          Add project
        </button>
      </div>
    );
  }
}
