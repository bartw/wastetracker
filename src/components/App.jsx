import React from "react";
import { render } from "react-dom";
import Authentication from "./Authentication";
import Projects from "./Projects";
import AuthenticationService from "../services/AuthenticationService";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const authenticationService = new AuthenticationService();

    this.state = { isAuthenticated: authenticationService.isAuthenticated() };

    this.login = () => {
      authenticationService.login().then(() =>
        this.setState({
          isAuthenticated: authenticationService.isAuthenticated()
        })
      );
    };
    this.logout = () => {
      authenticationService.logout().then(() =>
        this.setState({
          isAuthenticated: authenticationService.isAuthenticated()
        })
      );
    };
  }

  render() {
    return (
      <div>
        <Authentication
          authenticated={this.state.isAuthenticated}
          login={this.login}
          logout={this.logout}
        />
        {this.state.isAuthenticated && <Projects />}
      </div>
    );
  }
}
