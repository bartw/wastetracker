import React from "react";
import { render } from "react-dom";
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
    const projectItems = this.state.projects.map(project =>
      <tr key={project.id}>
        <td>
          <a>
            {project.name}
          </a>
        </td>
        <td>
          <a
            onClick={() => {
              this.delete(project.id);
            }}
          >
            delete
          </a>
        </td>
      </tr>
    );
    return (
      <div>
        <table>
          <tbody>
            {projectItems}
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
