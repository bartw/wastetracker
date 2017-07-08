import * as firebase from "firebase";

export default class AuthenticationService {
  constructor() {
    const provider = new firebase.auth.GoogleAuthProvider();

    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    
    this.login = () => {
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          token = result.credential.accessToken;
          user = result.user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch(error => {
          console.log(error);
        });
    };

    this.logout = () => {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          token = null;
          user = null;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        })
        .catch(error => {
          console.log(error);
        });
    };

    this.isAuthenticated = () => token !== null;
    this.getUserName = () => user.displayName;
  }
}
