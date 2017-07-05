import React from "react";
import { render } from "react-dom";
import * as firebase from "firebase";
import Authentication from "./Authentication";
import Projects from "./Projects";

const config = {
  apiKey: "AIzaSyBFst0KH4hxxdiU7ADQd09NMW_7oPh9RTI",
  authDomain: "wastetracker-5daf7.firebaseapp.com",
  databaseURL: "https://wastetracker-5daf7.firebaseio.com",
  projectId: "wastetracker-5daf7",
  storageBucket: "wastetracker-5daf7.appspot.com",
  messagingSenderId: "39773773466"
};
const app = firebase.initializeApp(config);
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = () => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken;
          var user = result.user;
          this.setState({ token: token, user: user, projects: [] });
          var projectsRef = firebase.database().ref("projects");
          projectsRef.on("child_added", data => {
            this.setState(prevState => {
              return {
                projects: prevState.projects.concat([
                  { id: data.key, name: data.val().name }
                ])
              };
            });
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ token: null, user: null });
        });
    };
    this.logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setState({ token: null, user: null });
        })
        .catch(error => {
          console.log(error);
          this.setState({ token: null, user: null });
        });
    };
    this.addProject = name => {
      if (!name) {
        return;
      }
      var newProject = firebase.database().ref("projects").push();
      newProject.set({
        name: name
      });
    };
  }

  render() {
    return (
      <div>
        <Authentication
          authenticated={this.state.token}
          login={this.login}
          logout={this.logout}
        />
        {this.state.token &&
          <Projects projects={this.state.projects} add={this.addProject} />}
      </div>
    );
  }
}
