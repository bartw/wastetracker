import React from "react";
import { render } from "react-dom";

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjectName: ""
    };
    this.onChangeProjectName = e => {
      this.setState({ newProjectName: e.target.value });
    };
    this.add = () => {
      this.props.add(this.state.newProjectName);
      this.setState({ newProjectName: "" });
    };
  }

  render() {
    const projectItems = this.props.projects.map(project =>
      <li key={project.id}>{project.name}</li>
    );
    return (
      <div>
        <ul>
          {projectItems}
        </ul>
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
