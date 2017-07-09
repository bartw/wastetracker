import React from "react";
import Authentication from "./Authentication";
import Projects from "./Projects";
import AuthenticationService from "../services/AuthenticationService";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const authenticationService = new AuthenticationService();

    this.state = { isAuthenticated: authenticationService.isAuthenticated(), userName: authenticationService.getUserName() };

    this.login = () => {
      authenticationService.login().then(() =>
        this.setState({
          isAuthenticated: authenticationService.isAuthenticated(),
          userName: authenticationService.getUserName()
        })
      );
    };
    this.logout = () => {
      authenticationService.logout().then(() =>
        this.setState({
          isAuthenticated: authenticationService.isAuthenticated(),
          userName: authenticationService.getUserName()
        })
      );
    };
  }

  render() {
    return (
      <div id="container">
        <h1>Wastetracker</h1>
        <Authentication
          isAuthenticated={this.state.isAuthenticated}
          userName={this.state.userName}
          login={this.login}
          logout={this.logout}
        />
        {this.state.isAuthenticated && <Projects />}
      </div>
    );
  }
}
